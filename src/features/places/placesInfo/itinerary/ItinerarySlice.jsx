
import { createSlice } from '@reduxjs/toolkit';
import { fetchItineriesInCity, fetchItineraryDetails } from './ItineraryAction';
import { toggleFavorite } from '../../PlaceAction';

const initialState = {
  itineries: [],
  loading: false,
  error: null,
  next: null,
  count: 0,
  itineraryDetails: null,
  isFavoriteToggling: false,
  favTogglingId: null
};

const itineriesInCitySlice = createSlice({
  name: 'itineriesInCity',
  initialState,
  reducers: {
    setFavTogglingId: (state, action) => {
      state.favTogglingId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all places
      .addCase(fetchItineriesInCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItineriesInCity.fulfilled, (state, action) => {
        state.loading = false;
        state.itineries = action.payload?.results || [];
        state.next = action.payload?.next;
        state.count = action.payload?.count;
      })
      .addCase(fetchItineriesInCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchItineraryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItineraryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.itineraryDetails = action.payload;
      })
      .addCase(fetchItineraryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(toggleFavorite.pending, (state) => {
        state.isFavoriteToggling = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.isFavoriteToggling = false;
        state.favTogglingId = null;
        
        const updatedPlaces = state.itineries.map(place => {
          if (place.id === action.payload.id) {
            return {
              ...place,
              is_fav: action.payload.response.detail === "Marked as favorite"
            };
          }
          return place;
        });
        
        state.itineries = updatedPlaces;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.isFavoriteToggling = false;
        state.error = action.payload;
      })

  },
});

export const { setFavTogglingId } = itineriesInCitySlice.actions;
export default itineriesInCitySlice.reducer;
