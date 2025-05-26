// src/app/store.js
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
import continentReducer from "../features/common/continents/ContinentSlice.jsx"
import exploreReducer from "../features/explore/ExploreSlice.jsx"
import favoriteReducer from "../features/favorites/FavoritesSlice.jsx"
import myTripsReducer from "../features/myTrips/MyTripsSlice.jsx"
import suggestionReducer from "../features/suggestions/SuggestionSlice.jsx"
import tagsReducer from "../features/places/placesInfo/tags/TagsSlice.jsx"

// cms reducer
import blockReducer from "../features/cms/Blocks/BlocksSlice.jsx"
import pagesReducer from "../features/cms/Pages/PagesSlice.jsx"
import wordPressReducer from "../features/cms/wordpress/WordPressSlice";


import locationReducer from "../features/location/LocationSlice.jsx"
 
const initialState = {
  auth: {
    isAuthenticated: false,
    loading: false,
    error: null
  },
  cms: {
    pages: {
      heroContent: null,
      loading: false,
      error: null,
      ourPartners: [],
      ourPartnersLoading: false,
      ourPartnersError: null
    }
  },
  languages: {
    languages: [],
    loading: false,
    error: null
  }
};
 
// Configuration for redux-persist
const persistConfig = {
  key: "destination", // Key for the persisted state
  storage, // Storage engine (localStorage by default)
  whitelist: ["destination", "location"], // Only persist the destinationReducer
};

// Wrap the destinationReducer with persistReducer
const persistedDestinationReducer = persistReducer(persistConfig, destinationReducer);

const persistedLocationReducer = persistReducer(
  {
    key: "location",
    storage,
    whitelist: ["settings", "currentLocation", "trackingEnabled"]
  }, 
  locationReducer
);

const cmsReducer = combineReducers({
  blocks: blockReducer,
  pages: pagesReducer,
  wordpress: wordPressReducer
});
 
const store = configureStore({
  reducer: {
    // cms reducers
    cms: cmsReducer, 
    location: persistedLocationReducer,
    
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
    itineraries: itineraryReducer,
    continents: continentReducer,
    explore: exploreReducer,
    favorites: favoriteReducer,
    myTrips: myTripsReducer,
    locationSettings: persistedLocationReducer,
    suggestions: suggestionReducer,
    tags: tagsReducer
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
});


// Create a persisted version of the store
const persistor = persistStore(store);

// Export the store and persistor
export { store, persistor }; 