// src/services/LocationService.js
import { store } from '../app/store';
import {  updateLocation } from '../features/location/LocationAction.jsx';
import { setTrackingId, clearLocation } from '../features/location/LocationSlice.jsx';
const LocationService = {
  startLocationTracking: (intervalMinutes = 15) => {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported');
    }

    const intervalId = setInterval(async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        store.dispatch(updateLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          geolocation_enabled: true,
          city_id: null
        }));
      } catch (error) {
        console.error('Location tracking error:', error);
        if (error.code === 1) { // PERMISSION_DENIED
          this.stopLocationTracking(intervalId);
        }
      }
    }, intervalMinutes * 60 * 1000);

    store.dispatch(setTrackingId(intervalId));
    return intervalId;
  },

  stopLocationTracking: (intervalId) => {
    if (intervalId) {
      clearInterval(intervalId);
      // store.dispatch(clearLocation());
    }
  }
};

export default LocationService;
