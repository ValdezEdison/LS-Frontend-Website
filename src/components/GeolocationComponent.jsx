// src/components/common/GeolocationComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Navigation, Settings, AlertCircle } from 'lucide-react';
import LocationService from '../services/LocationService';

const GeolocationComponent = () => {
  const [locationPreferences, setLocationPreferences] = useState({
    geolocation_enabled: false,
    default_latitude: null,
    default_longitude: null,
    default_radius: 5000,
    last_known_latitude: null,
    last_known_longitude: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchLocationSettings();
  }, []);

  const fetchLocationSettings = async () => {
    try {
      const settings = await LocationService.getCurrentSettings();
      setLocationPreferences(settings.preferences);
    } catch (err) {
      setError('Failed to fetch location settings');
    }
  };
  
  const handleLocationToggle = async () => {
    setLoading(true);
    setError(null);
    setSuccess('');

    try {
      if (!locationPreferences.geolocation_enabled) {
        // Enable location and get current position
        const locationData = await LocationService.updateCurrentLocation();
        setLocationPreferences(locationData.preferences);
        setSuccess('Location services enabled and location updated');
      } else {
        // Disable location services
        const response = await LocationService.updateLocationSettings({
          ...locationPreferences,
          geolocation_enabled: false
        });
        setLocationPreferences(response.preferences);
        setSuccess('Location services disabled');
      }
    } catch (err) {
      setError(err.message || 'Failed to update location settings');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateDefaultLocation = async () => {
    setLoading(true);
    setError(null);
    setSuccess('');

    try {
      if (locationPreferences.last_known_latitude && locationPreferences.last_known_longitude) {
        const response = await LocationService.updateLocationSettings({
          ...locationPreferences,
          default_latitude: locationPreferences.last_known_latitude,
          default_longitude: locationPreferences.last_known_longitude
        });
        setLocationPreferences(response.preferences);
        setSuccess('Default location updated to current location');
      }
    } catch (err) {
      setError('Failed to update default location');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Location Settings
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          <AlertCircle className="inline w-4 h-4 mr-2" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-200">Location Services</span>
          </div>
          <button
            onClick={handleLocationToggle}
            disabled={loading}
            className={`px-4 py-2 rounded-lg transition-colors ${
              loading ? 'bg-gray-300 cursor-not-allowed' :
              locationPreferences.geolocation_enabled
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {loading ? 'Updating...' : locationPreferences.geolocation_enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {locationPreferences.last_known_latitude && locationPreferences.last_known_longitude && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-200">Current Location</span>
              </div>
              <button
                onClick={updateDefaultLocation}
                disabled={loading}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Set as Default
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>Latitude: {locationPreferences.last_known_latitude.toFixed(6)}</p>
              <p>Longitude: {locationPreferences.last_known_longitude.toFixed(6)}</p>
              <p className="mt-2 text-xs text-gray-500">
                Last updated: {new Date(locationPreferences.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {locationPreferences.default_latitude && locationPreferences.default_longitude && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-200">Default Location</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>Latitude: {locationPreferences.default_latitude.toFixed(6)}</p>
              <p>Longitude: {locationPreferences.default_longitude.toFixed(6)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeolocationComponent;
