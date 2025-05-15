// src/context/LocationContext.jsx
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LocationService from '../services/LocationService';
import { fetchLocationSettings } from '../features/location/LocationAction';
import { setTrackingId, clearLocation } from '../features/location/LocationSlice';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { trackingId, currentLocation } = useSelector(state => state.locationSettings);
  const trackingEnabled = currentLocation?.preferences?.geolocation_enabled;
  console.log('trackingEnabled', trackingEnabled);
  const trackingIdRef = useRef(trackingId);

  useEffect(() => {
    trackingIdRef.current = trackingId;
  }, [trackingId]);

  useEffect(() => {
    let locationTrackingId = null;

    const startTracking = async () => {
      if (isAuthenticated && user && trackingEnabled) {
        console.log('startTracking called');
        try {
          // First get location settings
          await dispatch(fetchLocationSettings()).unwrap();
          
     
          locationTrackingId = LocationService.startLocationTracking(15);
          dispatch(setTrackingId(locationTrackingId));
        } catch (error) {
          console.error('Failed to start location tracking:', error);
        }
      } else if (trackingIdRef.current) {
        // Stop tracking if user logs out or tracking gets disabled
        LocationService.stopLocationTracking(trackingIdRef.current);
        dispatch(clearLocation());
      }
    };

    startTracking();

    return () => {
      if (trackingIdRef.current) {
        LocationService.stopLocationTracking(trackingIdRef.current);
        dispatch(clearLocation());
      }
    };
  }, [isAuthenticated, user, trackingEnabled, dispatch]);

  return (
    <LocationContext.Provider value={{ LocationService }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};