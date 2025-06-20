import React, { useState, useEffect, useRef } from 'react';
import styles from './LocationSettings.module.css';
import { fetchLocationSettings, updateLocation, updateLocationSettings, toggleUserLocation } from '../../features/location/LocationAction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../../features/common/cities/CityAction';
import SearchInput from '../common/SearchInput';
import { useTranslation } from 'react-i18next';
import { set } from 'lodash';
import { enableTracking } from '../../features/location/LocationSlice';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';

const LocationSettings = ({ state, setState}) => {
  const [error, setError] = useState(null);
  const [geoLocationError, setGeoLocationError] = useState(null);
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
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const suggestionRef = useRef(null);
  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const isInitialRender = useRef(true);

  const dispatch = useDispatch();

  const { t } = useTranslation('ProfileSection');
  const { t: tCommon } = useTranslation('Common');

  const { 
    locationSettings, 
    loading: settingsLoading, 
    error: settingsError, 
    userLocationStatus,
    toggleUserLocationLoading

  } = useSelector((state) => state.locationSettings);

  const { cities, loading: citiesLoading, error: citiesError } = useSelector((state) => state.cities);


  // Fetch user's location settings
  const fetchSettings = async () => {
    try {
      const resultAction = await dispatch(fetchLocationSettings());
      
      if (fetchLocationSettings.fulfilled.match(resultAction)) {
        const data = resultAction.payload;
     
        setSettings({
          geolocation_enabled: data.preferences?.geolocation_enabled || false,
          last_known_latitude: data.preferences?.last_known_latitude || null,
          last_known_longitude: data.preferences?.last_known_longitude || null,
          default_latitude: data.preferences?.last_known_latitude || null,
          default_longitude: data.preferences?.last_known_longitude || null,
          default_radius: data.preferences?.default_radius || 5000
        });
        
        // Set location preference
        if (data.preferences?.geolocation_enabled) {
          setIsLocationEnabled(true);
        }
        
        if (data.preferences?.location_mode === 'manual') {
          setLocationPreferences('manual');
        
          const selectedCity = cities.find(
            (city) =>
              city.latitude === data.preferences?.last_known_latitude &&
              city.longitude === data.preferences?.last_known_longitude
          );
        
          updateState("selectedDestinationId", selectedCity?.id || null);
        
        } else if (data.preferences?.location_mode === 'current') {
          setLocationPreferences('geolocation');
        
        } else {
          setLocationPreferences(null);
        }
        
        setError(null);
      } else {
        setError(`Failed to fetch settings: ${resultAction.error?.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(`Error fetching settings: ${err.message}`);
    }
  };

  // Update user location preferences
  const saveLocation = async () => {
    try {
      let payload;
      
      if (locationPreferences === 'geolocation') {
        if (!settings.default_latitude || !settings.default_longitude) {
          setError('Geolocation data is missing. Please allow location access or try again.');
          return;
        }
        
        payload = {
          // geolocation_enabled: true,
          latitude: settings.default_latitude,
          longitude: settings.default_longitude,
          city_id: null,
          location_mode: "current"
        };
      } else if (locationPreferences === 'manual') {
        if (state.selectedDestinationId) {
          payload = {
            // geolocation_enabled: false,
            city_id: state.selectedDestinationId,
            latitude: state.default_latitude,
            longitude: state.default_longitude,
            location_mode: "manual"
          };
        } else if (state.default_latitude && state.default_longitude) {
          payload = {
            // geolocation_enabled: false,
            latitude: state.default_latitude,
            longitude: state.default_longitude,
            city_id: null,
            location_mode: "manual"
          };
        } else {
          setError('Please select a location.');
          return;
        }
      } else {
        setError('Please select a location preference.');
        return;
      }
      
      const resultAction = await dispatch(updateLocation(payload));
      updateState('destinationSearchQuery', '');
      updateState('selectedDestinationId', null);
      if (updateLocation.fulfilled.match(resultAction)) {
       
        if(resultAction.type === 'locations/updateLocation/fulfilled') {

          toast.success(t('locationSettings.success.locationUpdated'));
          if(resultAction.payload?.preferences?.geolocation_enabled === true) {
            dispatch(enableTracking());
          }
        }
        fetchSettings(); // Refresh settings after update
      } else {
        setError(`Failed to update location: ${resultAction.error?.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error saving location:', err);
      setError(`Error saving location: ${err.message}`);
    }
  };

  // Save search radius
  const saveSettings = async () => {
    try {
      const payload = {
        default_radius: parseInt(settings.default_radius, 10) || 5000
      };
      
      if (locationPreferences === 'manual') {
        if (state.default_latitude && state.default_longitude) {
          payload.default_latitude = state.default_latitude;
          payload.default_longitude = state.default_longitude;
          payload.location_mode = "manual";
        }
      }else{
        payload.location_mode = "current";
        payload.default_latitude = settings.default_latitude;
        payload.default_longitude = settings.default_longitude;
      }
      
      const resultAction = await dispatch(updateLocationSettings(payload));
      updateState('destinationSearchQuery', '');
      updateState('selectedDestinationId', null);
      if (updateLocationSettings.fulfilled.match(resultAction)) {
        if (resultAction.type === 'locations/updateLocationSettings/fulfilled') {
          toast.success(t('locationSettings.success.settingsUpdated'));
          if (resultAction.payload?.preferences?.geolocation_enabled === true) {
            dispatch(enableTracking());
          }
        }
        fetchSettings(); // Refresh settings after update
      } else {
        setError(`Failed to save settings: ${resultAction.error?.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(`Error saving settings: ${err.message}`);
    }
  };

  // Search cities by name


  // Get current user location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoLocationError(t('locationSettings.errors.geolocationUnsupported'));
      return;
    }
    
    setGeoLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSettings(prev => ({
          ...prev,
          default_latitude: position.coords.latitude,
          default_longitude: position.coords.longitude
        }));
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = t('locationSettings.errors.permissionDenied');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = t('locationSettings.errors.positionUnavailable');
            break;
          case error.TIMEOUT:
            errorMessage = t('locationSettings.errors.timeout');
            break;
          default:
            errorMessage = t('locationSettings.errors.unknownError');
            break;
        }
        setSettings(prev => ({
          ...prev,
          default_latitude: null,
          default_longitude: null
        }))
        setGeoLocationError(errorMessage);
        setTimeout(() => {
          getCurrentLocation();
        }, 5000);
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



  const handleSearchClick = () => {
    if(!showSuggestionDropDown && state.destinationSearchQuery.length === 0){
      // Toggle the dropdown visibility
      setShowSuggestionDropDown(!showSuggestionDropDown);
    }else if(state.destinationSearchQuery.length > 0){
      setShowSuggestionDropDown(!showSuggestionDropDown);
    }
    
  };


  const handleSearch = (value) => {
    if(value.length > 0){
      setShowSuggestionDropDown(true);
    }else{
      setShowSuggestionDropDown(!showSuggestionDropDown);
    }

    updateState("destinationSearchQuery", value);
  };



  const handleSearchClose = () => {
  
    setShowSuggestionDropDown(false); // Close the dropdown
    updateState("destinationSearchQuery", "");
    updateState("selectedDestinationId", null);
  };


  const updateState = (key, value) => {
    if(key === "selectedDestinationId" && value){
     const city = cities.find((city) => city.id === value);
     if(city) {
      setState((prev) => ({
        ...prev,
        "default_latitude": city.latitude,
        "default_longitude": city.longitude,
        [key]: value
        
      }));
      setSettings((prev) => ({
        ...prev,
        "default_latitude": city.latitude,
        "default_longitude": city.longitude
      }))
     }
     setShowSuggestionDropDown(false);
    }else{
      setState((prev) => ({ ...prev, [key]: value }));
    }

 
  };



  const handleToggleLocation = () => {
    setIsLocationEnabled(!isLocationEnabled);
    dispatch(toggleUserLocation({geolocation_enabled: !isLocationEnabled})).then((response) => {
      if (toggleUserLocation.fulfilled.match(response)) {
        if (response.type === 'locations/toggleUserLocation/fulfilled') {
         fetchSettings();
        }
      }
    })
  }



    const handleClickOutside = (event) => {
  
      // Check if the click is outside both the SearchInput and the dropdown
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
  
      ) {
        setShowSuggestionDropDown(false); // Close the dropdown
      }
    };
  
    useEffect(() => {
      // Add event listener when the dropdown is shown
      if (showSuggestionDropDown) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      // Cleanup the event listener on component unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showSuggestionDropDown]);


  if (settingsLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
    
    <div className={styles.container}>
      <div className={styles.headers}>
        <h1 className={styles.title}>{t('locationSettings.title')}</h1>

        {isLocationEnabled && (
         <>
            <h2 className={styles.sectionTitle}>{t('locationSettings.currentLocation')}</h2>
            {settings.default_latitude && settings.default_longitude && (
              <p className={styles.selectedLocation}>
                {t('locationSettings.sections.preference.options.geolocation.coordinates', {
                  lat: settings.default_latitude.toFixed(6),
                  lng: settings.default_longitude.toFixed(6)
                })}
              </p>
            )}
          </>
        )}  
    <div className={styles.locationSwitchMainWrapper}>
      <div className={styles.locationEnableWrapper}>
        <p>{t("locationSettings.locationToggle.enableLabel")}</p>
        <div className={styles.locationSwitch}>
          <label className={styles.switch}>
            <input type="checkbox"   checked={isLocationEnabled}
            onChange={() => handleToggleLocation()}/>
            <span className={styles.slider}></span>
          </label>
          <span className={`${styles.toggleAction} ${isLocationEnabled ? styles.checkedd : ''}`}>
      {isLocationEnabled ? t("locationSettings.locationToggle.activeState") : t("locationSettings.locationToggle.inactiveState")}
    </span>
      </div>
      </div>
      {isLocationEnabled && (
      <div className={`${styles.locationBottomWrapper} ${styles.active}`}>
{settingsLoading && <Loader />}
        {error && <div className={styles.errorMessage}>{error}</div>}
        {settingsError && <div className={styles.errorMessage}>{settingsError}</div>}
     
  
        {settingsLoading && !error ? (
          <></>
          // <div className={styles.loadingMessage}>
          //   <div className={styles.loadingSpinner}></div>
          // </div>
        ) : (
          <div className={styles.spaceY}>
            {/* Location Preference Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('locationSettings.sections.preference.title')}</h2>
  
              {/* Radio Buttons for Preferences */}
              <div className={styles.spaceY}>
                <div>
                  <div className={styles.radioWrapper}>
                    <label className="radioContainer">
                      <input
                        type="radio"
                        name="locationPreference"
                        checked={locationPreferences === "geolocation"}
                        onChange={() =>
                          handleLocationPreferenceChange("geolocation")
                        }
                        className={styles.radioInput}
                        disabled={settingsLoading}
                      />
                      <span className='checkmark'></span>
                   
                    </label>
                    <span className={styles.radioLabel}>
                      {t('locationSettings.sections.preference.options.geolocation.label')}
                    </span>
                  </div>
                 
  
                  {locationPreferences === "geolocation" && (
                    <div className={styles.locationDetails}>
                      {geoLocationError ? (
                        <div className={styles.errorText}>
                          {geoLocationError}
                        </div>
                      ) : settings.default_latitude &&
                        settings.default_longitude ? (
                        <div className={styles.coordinateText}>
                          {t('locationSettings.sections.preference.options.geolocation.coordinates', {
                            lat: settings.default_latitude.toFixed(6),
                            lng: settings.default_longitude.toFixed(6)
                          })}
                        </div>
                      ) : (
                        <button
                        onClick={getCurrentLocation}
                        className={styles.primaryButton}
                        disabled={settingsLoading}
                      >
                        {t('locationSettings.sections.preference.options.geolocation.getLocation')}
                      </button>
                      )}
                            
                    </div>
                  )}
                </div>
  
                <div>
                   <div className={styles.radioWrapper}>
                  <label className="radioContainer">
                    <input
                      type="radio"
                      name="locationPreference"
                      checked={locationPreferences === "manual"}
                      onChange={() =>
                        handleLocationPreferenceChange("manual")
                      }
                      className={styles.radioInput}
                      disabled={settingsLoading}
                    />
                     <span className='checkmark'></span>
                   
                  </label>
                  <span className={styles.radioLabel}>
                    {t('locationSettings.sections.preference.options.manual.label')}
                    </span>
                  </div>
                   
  
                  {locationPreferences === "manual" && (
                    <div className={styles.locationDetails}>
                      <div className={styles.searchContainer}>
                          <SearchInput
                          handleSearchClick={() => handleSearchClick()}
                          suggestionRef={suggestionRef}
                          handleSearch={handleSearch}
                          showSuggestionDropDown={showSuggestionDropDown}
                          handleSearchClose={handleSearchClose}
                          searchValue={state.destinationSearchQuery}
                          suggestionsList={cities}
                          placeholder={t("locationSettings.placeholder.search")}
                          onSelect={(value) => updateState("selectedDestinationId", value)}
                          customClassName="placesSearchInputContainer"
                          selectedValue={state.selectedDestinationId}
                        />
                      </div>
                      
                    </div>
                  )}
                </div>
              </div>
  
              <div className={styles.btnWrapper}>
                <button
                  onClick={saveLocation}
                  disabled={settingsLoading || !locationPreferences}
                  className={`${styles.saveButton} ${
                    settingsLoading || !locationPreferences ? styles.disabled : null
                  }`}
                >
                   {settingsLoading ? t('locationSettings.buttons.saving') : t('locationSettings.buttons.saveLocation')}
                </button>
              </div>
            </div>
  
            {/* Search Radius Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('locationSettings.sections.radius.title')}</h2>
  
              <div className={styles.spaceY}>
                <div>
                  <label className={styles.smallText}> {t('locationSettings.sections.radius.defaultLabel')}</label>
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
                    disabled={settingsLoading}
                  />
                  <div className={styles.rangeMarkers}>
                    <span>{t('locationSettings.sections.radius.rangeMarkers.min')}</span>
                    <span>{t('locationSettings.sections.radius.rangeMarkers.current', {
                      value: (settings.default_radius / 1000).toFixed(0)
                    })}</span>
                    <span>{t('locationSettings.sections.radius.rangeMarkers.max')}</span>
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
                      disabled={settingsLoading}
                    >
                      {radius / 1000} km
                    </button>
                  ))}
                </div>
              </div>
  
              {/* <div className={styles.divider} /> */}
              <div className={styles.btnWrapper}>
                <button
                  onClick={saveSettings}
                  disabled={settingsLoading}
                  className={`${styles.saveButton} ${
                    settingsLoading ? styles.disabled : null
                  }`}
                >
                  {settingsLoading ? t('locationSettings.buttons.saving') : t('locationSettings.buttons.saveAll')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
    )}
      </div>
      
      </div>
    </div>
    </>
  );
};

export default LocationSettings;