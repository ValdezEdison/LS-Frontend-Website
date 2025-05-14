
import React, { useState, useEffect } from 'react';
import styles from './LocationSettings.module.css';

const LocationSettings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [geoLocationError, setGeoLocationError] = useState(null);
  const [cities, setCities] = useState([]);
  const [settings, setSettings] = useState({
    geolocation_enabled: false,
    last_known_latitude: null,
    last_known_longitude: null,
    default_latitude: null,
    default_longitude: null,
    default_radius: 5000
  });
  
  const [locationPreferences, setLocationPreferences] = useState(null);
  const [manualCity, setManualCity] = useState(null);
  const [searchingCities, setSearchingCities] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState('');

  // Auth token helpers
  const getAuthToken = () => {
    return sessionStorage.getItem('access_token');
  };

  const getRefreshToken = () => {
    return sessionStorage.getItem('refresh_token');
  };

  const getTokenExpiry = () => {
    const expiresAt = sessionStorage.getItem('tokenExpiresAt');
    return expiresAt ? parseInt(expiresAt, 10) : null;
  };

  const isTokenExpired = () => {
    const expiryTime = getTokenExpiry();
    const now = Date.now();
    return expiryTime && expiryTime < now;
  };

  // Fix: Get proper auth headers for requests
  const getAuthHeaders = async () => {
    let token = getAuthToken();
    
    // If token is expired, attempt to refresh it
    if (isTokenExpired()) {
      try {
        token = await refreshToken();
      } catch (err) {
        console.error('Failed to refresh token:', err);
        throw new Error('Authentication failed, please log in again');
      }
    }
    
    if (!token) {
      throw new Error('No authentication token available');
    }
    
    // Fixed: Properly format the Authorization header with the Bearer prefix
    return {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    };
  };

  // Debug auth info
  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    console.log('Token value:', token);
    
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    };
    console.log('Final Authorization header:', headers.Authorization);
  }, []);

  // Refresh the token if it's expired
  const refreshToken = async () => {
    const refresh_token = getRefreshToken();

    if (!refresh_token) {
      throw new Error('Refresh token not available.');
    }

    try {
      console.log('Attempting to refresh token with:', refresh_token);
      
      const response = await fetch('https://localsecrets-staging.rudo.es/token/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refresh_token }) 
      });

      console.log('Refresh token response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Successfully refreshed token');
        sessionStorage.setItem('access_token', data.access);
        sessionStorage.setItem('tokenExpiresAt', Date.now() + 3600 * 1000);
        return data.access;
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Token refresh failed:', errorData);
        throw new Error(`Failed to refresh token: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      console.error('Error in token refresh process:', err);
      throw err;
    }
  };

  // Fetch user's location settings
  const fetchSettings = async () => {
    try {
      setLoading(true);
      
      // Get proper auth headers
      const headers = await getAuthHeaders();
      console.log('Request headers for fetchSettings:', headers);
      
      const response = await fetch('https://localsecrets-staging.rudo.es/users/location_settings', {
        method: 'GET',
        headers: headers
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched settings:', data);
        
        setSettings({
          geolocation_enabled: data.geolocation_enabled || false,
          last_known_latitude: data.last_known_latitude || null,
          last_known_longitude: data.last_known_longitude || null,
          default_latitude: data.default_latitude || null,
          default_longitude: data.default_longitude || null,
          default_radius: data.default_radius || 5000
        });
        
        // Set location preference
        if (data.geolocation_enabled) {
          setLocationPreferences('geolocation');
        } else if (data.default_latitude && data.default_longitude) {
          setLocationPreferences('manual');
        } else {
          setLocationPreferences(null);
        }
        
        setError(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        setError(`Failed to fetch settings: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(`Error fetching settings: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update user location preferences
  const saveLocation = async () => {
    try {
      setLoading(true);
      
      let payload;
      
      if (locationPreferences === 'geolocation') {
        if (!settings.last_known_latitude || !settings.last_known_longitude) {
          setError('Geolocation data is missing. Please allow location access or try again.');
          setLoading(false);
          return;
        }
        
        payload = {
          geolocation_enabled: true,
          latitude: settings.last_known_latitude,
          longitude: settings.last_known_longitude,
          city_id: null
        };
      } else if (locationPreferences === 'manual') {
        if (manualCity) {
          payload = {
            geolocation_enabled: false,
            city_id: manualCity.id
          };
        } else if (settings.default_latitude && settings.default_longitude) {
          payload = {
            geolocation_enabled: false,
            latitude: settings.default_latitude,
            longitude: settings.default_longitude,
            city_id: null
          };
        } else {
          setError('Please select a location.');
          setLoading(false);
          return;
        }
      } else {
        setError('Please select a location preference.');
        setLoading(false);
        return;
      }
      
      console.log('update_location payload:', payload);
      
      // Get proper auth headers
      const headers = await getAuthHeaders();
      console.log('Request headers for saveLocation:', headers);
      
      const response = await fetch('https://localsecrets-staging.rudo.es/users/update_location', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        console.log('Location updated successfully');
        fetchSettings(); // Refresh settings after update
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        const errorText = await response.text().catch(() => 'Unknown error');
        setError(`Failed to update location: ${response.status} ${response.statusText} - ${errorText}`);
      }
    } catch (err) {
      console.error('Error saving location:', err);
      setError(`Error saving location: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Save search radius
  const saveSettings = async () => {
    try {
      setLoading(true);
      
      const payload = {
        default_radius: parseInt(settings.default_radius, 10) || 5000
      };
      
      if (locationPreferences === 'manual' && !manualCity) {
        if (settings.default_latitude && settings.default_longitude) {
          payload.default_latitude = settings.default_latitude;
          payload.default_longitude = settings.default_longitude;
        }
      }
      
      console.log('Settings payload:', payload);
      
      // Get proper auth headers
      const headers = await getAuthHeaders();
      
      const response = await fetch('https://localsecrets-staging.rudo.es/users/update_settings', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        console.log('Settings saved successfully');
        fetchSettings(); // Refresh settings after update
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        setError(`Failed to save settings: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(`Error saving settings: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Search cities by name
  const searchCities = async (term) => {
    if (!term || term.trim().length < 2) {
      setCities([]);
      return;
    }
    
    try {
      setSearchingCities(true);
      
      // Get proper auth headers
      const headers = await getAuthHeaders();
      
      const response = await fetch(`https://localsecrets-staging.rudo.es/cities/search/?query=${encodeURIComponent(term)}`, {
        method: 'GET',
        headers: headers
      });
      
      if (response.ok) {
        const data = await response.json();
        setCities(data.results || []);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error searching cities:', errorData);
        setCities([]);
      }
    } catch (err) {
      console.error('Error searching cities:', err);
      setCities([]);
    } finally {
      setSearchingCities(false);
    }
  };

  // Get current user location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoLocationError('Geolocation is not supported by your browser');
      return;
    }
    
    setGeoLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSettings(prev => ({
          ...prev,
          last_known_latitude: position.coords.latitude,
          last_known_longitude: position.coords.longitude
        }));
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
            break;
        }
        setGeoLocationError(errorMessage);
      }
    );
  };

  // Set radius preset
  const setRadiusPreset = (value) => {
    setSettings(prev => ({
      ...prev,
      default_radius: value
    }));
  };

  // Handle city search input change
  const handleCitySearchChange = (e) => {
    const term = e.target.value;
    setCitySearchTerm(term);
    searchCities(term);
  };

  // Handle city selection
  const selectCity = (city) => {
    setManualCity(city);
    setCitySearchTerm(city.name);
    setCities([]);
  };

  // Handle location preference change
  const handleLocationPreferenceChange = (preference) => {
    setLocationPreferences(preference);
    if (preference === 'geolocation') {
      getCurrentLocation();
    }
  };

  // Fetch settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);

  // Update city search when the term changes
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (citySearchTerm) {
        searchCities(citySearchTerm);
      }
    }, 500);
    
    return () => clearTimeout(delaySearch);
  }, [citySearchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.headers}>
        <h1 className={styles.title}>Location Settings</h1>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {loading && !error ? (
          <div className={styles.loadingMessage}>
            <div className={styles.loadingSpinner}></div>
          </div>
        ) : (
          <div className={styles.spaceY}>
            {/* Location Preference Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Location Preference</h2>

              {/* Radio Buttons for Preferences */}
              <div className={styles.spaceY}>
                <div>
                  <label className={styles.radioContainer}>
                    <input
                      type="radio"
                      name="locationPreference"
                      checked={locationPreferences === "geolocation"}
                      onChange={() =>
                        handleLocationPreferenceChange("geolocation")
                      }
                      className={styles.radioInput}
                    />
                    <span className={styles.radioLabel}>
                      Use my current location
                    </span>
                  </label>

                  {locationPreferences === "geolocation" && (
                    <div className={styles.locationDetails}>
                      {geoLocationError ? (
                        <div className={styles.errorText}>
                          {geoLocationError}
                        </div>
                      ) : settings.last_known_latitude &&
                        settings.last_known_longitude ? (
                        <div className={styles.coordinateText}>
                          Latitude:{" "}
                          {settings.last_known_latitude.toFixed(6)}, Longitude:{" "}
                          {settings.last_known_longitude.toFixed(6)}
                        </div>
                      ) : (
                        <button
                          onClick={getCurrentLocation}
                          className={styles.primaryButton}
                        >
                          Get Current Location
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className={styles.radioContainer}>
                    <input
                      type="radio"
                      name="locationPreference"
                      checked={locationPreferences === "manual"}
                      onChange={() =>
                        handleLocationPreferenceChange("manual")
                      }
                      className={styles.radioInput}
                    />
                    <span className={styles.radioLabel}>
                      Set a specific location
                    </span>
                  </label>

                  {locationPreferences === "manual" && (
                    <div className={styles.locationDetails}>
                      <div className={styles.relative}>
                        <input
                          type="text"
                          value={citySearchTerm}
                          onChange={handleCitySearchChange}
                          placeholder="Search for a city..."
                          className={styles.input}
                        />

                        {searchingCities && (
                          <div className={styles.spinnerWrapper}>
                            <div className={styles.loadingSpinner}></div>
                          </div>
                        )}

                        {cities.length > 0 && (
                          <div className={styles.cityResults}>
                            <ul>
                              {cities.map((city) => (
                                <li
                                  key={city.id}
                                  onClick={() => selectCity(city)}
                                  className={styles.cityItem}
                                >
                                  {city.name}, {city.country_name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.btnWrapper}>
                <button
                  onClick={saveLocation}
                  disabled={loading || !locationPreferences}
                  className={`${styles.saveButton} ${
                    loading || !locationPreferences ? styles.disabled : null
                  }`}
                >
                  {loading ? "Saving..." : "Save Location"}
                </button>
              </div>
            </div>

            

            {/* Search Radius Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Search Radius</h2>

              <div className={styles.spaceY}>
                <div>
                  <label className={styles.smallText}>Default search radius</label>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={settings.default_radius}
                    onChange={(e) =>
                      setRadiusPreset(parseInt(e.target.value, 10))
                    }
                    className={styles.rangeSlider}
                  />
                  <div className={styles.rangeMarkers}>
                    <span>1 km</span>
                    <span>{(settings.default_radius / 1000).toFixed(0)} km</span>
                    <span>50 km</span>
                  </div>
                </div>

                <div className={styles.presetContainer}>
                  {[5000, 10000, 15000, 25000, 50000].map((radius) => (
                    <button
                      key={radius}
                      onClick={() => setRadiusPreset(radius)}
                      className={`${styles.presetButton} ${
                        settings.default_radius === radius
                          ? styles.presetButtonActive
                          : styles.presetButtonInactive
                      }`}
                    >
                      {radius / 1000} km
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.divider} />
              <div className={styles.btnWrapper}>
                <button
                  onClick={saveSettings}
                  disabled={loading}
                  className={`${styles.saveButton} ${
                    loading ? styles.disabled : null
                  }`}
                >
                  {loading
                    ? "Saving..."
                    : "Save All"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSettings;
