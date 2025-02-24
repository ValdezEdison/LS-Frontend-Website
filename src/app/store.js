import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/AuthSlice.jsx"
import placeReducer from "../features/home/places/PlaceSlice.jsx"
import eventReducer from "../features/home/events/EventSlice.jsx"
import languageReducer from "../features/common/languages/LanguageSlice.jsx"
import imageReducer from "../features/common/defaultImages/ImageSlice.jsx"

const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
    places: placeReducer,
    events: eventReducer,
    languages: languageReducer,
    images: imageReducer
  },
});

// Export the store as a named export
export { store };