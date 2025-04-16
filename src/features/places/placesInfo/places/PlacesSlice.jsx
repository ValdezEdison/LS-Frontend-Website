
import { createSlice } from '@reduxjs/toolkit';
import { fetchPlacesInCity } from './PlacesAction';
import { toggleFavorite } from '../../../favorites/FavoritesAction';

const initialState = {
  placesList: [],
  loading: false,
  error: null,
  next: null,
  count: 0,
  isFavoriteToggling: false,
  favTogglingId: null
};

const placesInCitySlice = createSlice({
  name: 'placesInCity',
  initialState,
  reducers: {
    setFavTogglingId: (state, action) => {
      state.favTogglingId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all places
      .addCase(fetchPlacesInCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlacesInCity.fulfilled, (state, action) => {
        state.loading = false;
        state.placesList = action.payload?.results || [];
        state.next = action.payload?.next;
        state.count = action.payload?.count;
      })
      .addCase(fetchPlacesInCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle favorite
      .addCase(toggleFavorite.pending, (state) => {
        state.isFavoriteToggling = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.isFavoriteToggling = false;
        state.favTogglingId = null;
        
        const updatedPlaces = state.placesList.map(place => {
          if (place.id === action.payload.id) {
            return {
              ...place,
              is_fav: action.payload.response.detail === "Marked as favorite"
            };
          }
          return place;
        });
        
        state.placesList = updatedPlaces;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.isFavoriteToggling = false;
        state.error = action.payload;
      })

  },
});
export const { setFavTogglingId } = placesInCitySlice.actions;
export default placesInCitySlice.reducer;
