import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/authentication/AuthSlice.jsx"
import placeReducer from "../features/places/PlaceSlice.jsx"
import eventReducer from "../features/events/EventSlice.jsx"
import languageReducer from "../features/common/languages/LanguageSlice.jsx"
import imageReducer from "../features/common/defaultImages/ImageSlice.jsx"
import countryReducer from "../features/common/countries/CountrySlice.jsx"
import citiesReducer from "../features/common/cities/CitySlice.jsx"
import popupReducer from "../features/popup/PopupSlice.jsx"
import destinationReducer from "../features/places/placesInfo/destination/DestinationSlice.jsx"
import eventByCityReducer from "../features/places/placesInfo/events/EventSlice.jsx"
import placesInCityReducer from "../features/places/placesInfo/places/PlacesSlice.jsx"
import itineriesInCityReducer from "../features/places/placesInfo/itinerary/ItinerarySlice.jsx"
import socialAuthReducer from "../features/authentication/socialLogin/SocialAuthSlice.jsx"
import homeReducer from "../features/home/HomeSlice.jsx"
import itineraryReducer from "../features/itineraries/ItinerarySlice.jsx"


// cms reducer
import blockReducer from "../features/cms/Blocks/BlocksSlice.jsx"
import pagesReducer from "../features/cms/Pages/PagesSlice.jsx"

// Configuration for redux-persist
const persistConfig = {
  key: "destination", // Key for the persisted state
  storage, // Storage engine (localStorage by default)
  whitelist: ["destination"], // Only persist the destinationReducer
};

// Wrap the destinationReducer with persistReducer
const persistedDestinationReducer = persistReducer(persistConfig, destinationReducer);

const cmsReducer = combineReducers({
  blocks: blockReducer,
  pages: pagesReducer,
});

const store = configureStore({
  reducer: {

    // cms reducers
    cms: cmsReducer,
    
    // main api reducers
    auth: authReducer,
    socialAuth: socialAuthReducer,
    places: placeReducer,
    events: eventReducer,
    languages: languageReducer,
    images: imageReducer,
    countries: countryReducer,
    cities: citiesReducer,
    popup: popupReducer,
    destination: persistedDestinationReducer,
    eventsByCity: eventByCityReducer,
    placesInCity: placesInCityReducer,
    itineriesInCity: itineriesInCityReducer,
    home: homeReducer,
    itineraries: itineraryReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
});

// Create a persisted version of the store
const persistor = persistStore(store);

// Export the store and persistor
export { store, persistor };