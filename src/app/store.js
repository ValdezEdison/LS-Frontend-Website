import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/AuthSlice.jsx"
import placeReducer from "../features/places/PlaceSlice.jsx"
import eventReducer from "../features/events/EventSlice.jsx"
import languageReducer from "../features/common/languages/LanguageSlice.jsx"
import imageReducer from "../features/common/defaultImages/ImageSlice.jsx"
import countryReducer from "../features/common/countries/CountrySlice.jsx"
import citiesReducer from "../features/common/cities/CitySlice.jsx"
import popupReducer from "../features/popup/PopupSlice.jsx"
import destinationReducer from "../features/places/placesInfo/destination/DestinationSlice.jsx"


// cms reducer
import blockReducer from "../features/cms/Blocks/BlockSlice.jsx"

const store = configureStore({
  reducer: {
    // main api reducers
    auth: authReducer,
    places: placeReducer,
    events: eventReducer,
    languages: languageReducer,
    images: imageReducer,
    countries: countryReducer,
    cities: citiesReducer,
    popup: popupReducer,
    destination: destinationReducer,
    // cms api reducers
    cms: {
      blocks: blockReducer
    }
  },
});

// Export the store as a named export
export { store };