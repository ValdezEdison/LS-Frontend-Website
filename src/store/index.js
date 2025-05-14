// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/AuthSlice.jsx';
import locationReducer from '../features/location/LocationSlice';
import placesReducer from '../features/places/PlaceSlice';
import eventsReducer from '../features/events/EventSlice';
import homeReducer from '../features/home/HomeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
    places: placesReducer,
    events: eventsReducer,
    home: homeReducer
  },
});

export default store;
