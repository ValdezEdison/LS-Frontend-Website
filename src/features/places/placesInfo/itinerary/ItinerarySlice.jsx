
import { createSlice } from '@reduxjs/toolkit';
import { fetchItineriesInCity, fetchItineraryDetails, fetchTravelLiteList, fetchTravelTime, addTrip } from './ItineraryAction';
import { toggleFavorite } from '../../PlaceAction';

const initialState = {
  itineries: [],
  loading: false,
  error: null,
  next: null,
  count: 0,
  itineraryDetails: null,
  isFavoriteToggling: false,
  favTogglingId: null,
  travelLiteList: [],
  travelTime: null
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

         // Also update the single place if it's the one being toggled
         if (state.itineraryDetails && state.itineraryDetails.id === action.payload.id) {
          state.itineraryDetails = {
              ...state.itineraryDetails,
              is_fav: action.payload.response.detail === "Marked as favorite"
          };
      }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.isFavoriteToggling = false;
        state.error = action.payload;
      })

      .addCase(fetchTravelLiteList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelLiteList.fulfilled, (state, action) => {
        state.loading = false;
        state.travelLiteList = action.payload;
      })
      .addCase(fetchTravelLiteList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTravelTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelTime.fulfilled, (state, action) => {
        state.loading = false;
        state.travelTime = action.payload;
      })
      .addCase(fetchTravelTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { setFavTogglingId } = itineriesInCitySlice.actions;
export default itineriesInCitySlice.reducer;
