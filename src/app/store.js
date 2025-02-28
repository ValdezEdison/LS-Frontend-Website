import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/AuthSlice.jsx"
import placeReducer from "../features/places/PlaceSlice.jsx"
import eventReducer from "../features/events/EventSlice.jsx"
import languageReducer from "../features/common/languages/LanguageSlice.jsx"
import imageReducer from "../features/common/defaultImages/ImageSlice.jsx"
import countryReducer from "../features/common/countries/CountrySlice.jsx"
import citiesReducer from "../features/common/cities/CitySlice.jsx"

const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
    places: placeReducer,
    events: eventReducer,
    languages: languageReducer,
    images: imageReducer,
    countries: countryReducer,
    cities: citiesReducer,
  },
});

// Export the store as a named export
export { store };