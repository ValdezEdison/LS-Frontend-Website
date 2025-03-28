import { configureStore } from "@reduxjs/toolkit";
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


// cms reducer
import blockReducer from "../features/cms/Blocks/BlockSlice.jsx"

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Storage engine (localStorage by default)
  whitelist: ["destination"], // Only persist the destinationReducer
};

// Wrap the destinationReducer with persistReducer
const persistedDestinationReducer = persistReducer(persistConfig, destinationReducer);

const store = configureStore({
  reducer: {
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
    // cms api reducers
    cms: {
      blocks: blockReducer
    }
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