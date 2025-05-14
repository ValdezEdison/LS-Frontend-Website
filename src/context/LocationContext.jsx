// src/context/LocationContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LocationService from '../services/LocationService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from '../services/ApiService';

// Create location actions
export const updateLocation = createAsyncThunk(
  'location/updateLocation',
  async (locationData, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/users/update_location', locationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update location');
    }
  }
);

export const getLocationSettings = createAsyncThunk(
  'location/getSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/users/location_settings');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch location settings');
    }
  }
);

// Create location slice
const locationSlice = createSlice({
  name: 'location',
  initialState: {
    trackingEnabled: false,
    currentLocation: null,
    settings: null,
    loading: false,
    error: null,
    trackingId: null
  },
  reducers: {
    setTrackingId: (state, action) => {
      state.trackingId = action.payload;
    },
    clearLocation: (state) => {
      state.currentLocation = null;
      state.trackingEnabled = false;
      state.trackingId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLocation = action.payload;
        state.error = null;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLocationSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
        state.loading = false;
      });
  }
});

export const { setTrackingId, clearLocation } = locationSlice.actions;
export const locationReducer = locationSlice.reducer;

// Create Location Context
const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { trackingId } = useSelector(state => state.location);

  useEffect(() => {
    let locationTrackingId = null;

    const startTracking = async () => {
      if (isAuthenticated && user) {
        try {
          // First get location settings
          await dispatch(getLocationSettings()).unwrap();
          
          // Start location tracking
          locationTrackingId = await LocationService.startLocationTracking(15);
          dispatch(setTrackingId(locationTrackingId));
        } catch (error) {
          console.error('Failed to start location tracking:', error);
        }
      }
    };

    startTracking();

    return () => {
      if (locationTrackingId) {
        LocationService.stopLocationTracking(locationTrackingId);
        dispatch(clearLocation());
      }
    };
  }, [isAuthenticated, user, dispatch]);

  // Update LocationService to use Redux
  const locationService = {
    startLocationTracking: async (intervalMinutes = 15) => {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
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

          await dispatch(updateLocation({
            last_known_latitude: position.coords.latitude,
            last_known_longitude: position.coords.longitude,
            geolocation_enabled: true
          })).unwrap();
        } catch (error) {
          console.error('Error in location tracking:', error);
          if (error.code === 1) { // PERMISSION_DENIED
            clearInterval(intervalId);
            await dispatch(updateLocation({
              geolocation_enabled: false
            })).unwrap();
            throw new Error('Location permission denied');
          }
        }
      }, intervalMinutes * 60 * 1000);

      return intervalId;
    },

    stopLocationTracking: (intervalId) => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  };

  return (
    <LocationContext.Provider value={{ locationService }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook for using location context
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
