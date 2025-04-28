
import { createSlice } from '@reduxjs/toolkit';
import { fetchItineriesInCity, fetchItineraryDetails, fetchTravelLiteList, fetchTravelTime, addTrip, generateLink, downloadTrip, fetchStops, addSite, addToExistingTrip } from './ItineraryAction';
import { toggleFavorite } from '../../../favorites/FavoritesAction';
import { set } from 'lodash';

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
  travelTime: null,
  tripModeLoading: false,
  generatedLink: null,
  generateLinkLoading: false,
  downloadTripLoading: false,
  downloadedTrip: null,
  tripType: JSON.parse(localStorage.getItem('tripType')) || {
    id: null,
    type: null
  },
  stops: [],
  stopsLoading: false,
  addTripLoading: false,
  addToExistingTripLoading: false
};

const itineriesInCitySlice = createSlice({
  name: 'itineriesInCity',
  initialState,
  reducers: {
    setFavTogglingId: (state, action) => {
      state.favTogglingId = action.payload;
    },
    resetShareableLink: (state) => {
      state.generateLinkLoading = null
    },
    resetDownloadedTrip: (state) => {
      state.downloadedTrip = null
    },
    setTripType: (state, action) => {
      state.tripType = action.payload
      localStorage.setItem('tripType', JSON.stringify(action.payload))

    },
    resetTripType: (state) => {
      state.tripType = {
        id: null,
        name: null
      }
      localStorage.removeItem('tripType')
    },
    listUpdater: (state, action) => {
      state.itineries = [...state.itineries, ...action.payload?.results];
      state.next = action.payload.next;
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

        const updatedStops = state.stops.map(stop => {
          if (stop.id === action.payload.id) {
            return {
              ...stop,
              is_fav: action.payload.response.detail === "Marked as favorite"
            };
          }
          return stop;
        });
        
        state.stops = updatedStops;

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
        state.tripModeLoading = true;
        state.error = null;
      })
      .addCase(fetchTravelTime.fulfilled, (state, action) => {
        state.tripModeLoading = false;
        state.travelTime = action.payload;
      })
      .addCase(fetchTravelTime.rejected, (state, action) => {
        state.tripModeLoading = false;
        state.error = action.payload;
      })

      .addCase(addTrip.pending, (state) => {
        state.addTripLoading = true;
        state.error = null;
      })
      .addCase(addTrip.fulfilled, (state, action) => {
        state.addTripLoading = false;
        state.error = null;
      })
      .addCase(addTrip.rejected, (state, action) => {
        state.addTripLoading = false;
        state.error = action.payload;
      })

      .addCase(generateLink.pending, (state) => {
        state.generateLinkLoading = true;
        state.error = null;
      })
      .addCase(generateLink.fulfilled, (state, action) => { 
        state.generateLinkLoading = false;
        state.generatedLink = action.payload;
      })
      .addCase(generateLink.rejected, (state, action) => {
        state.generateLinkLoading = false;
        state.error = action.payload;
      })

      .addCase(downloadTrip.pending, (state) => {
        state.downloadTripLoading = true;
        state.error = null;
      })
      .addCase(downloadTrip.fulfilled, (state, action) => {
        state.downloadTripLoading = false;
        state.downloadedTrip = action.payload;
      })
      .addCase(downloadTrip.rejected, (state, action) => {
        state.downloadTripLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchStops.pending, (state) => {
        state.stopsLoading = true;
        state.error = null;
      })
      .addCase(fetchStops.fulfilled, (state, action) => {
        state.stopsLoading = false;
        state.stops = action.payload?.results || [];
      })
      .addCase(fetchStops.rejected, (state, action) => {
        state.stopsLoading = false;
        state.error = action.payload;
      })

      .addCase(addSite.pending, (state) => {
        state.addSiteLoading = true;
        state.error = null;
      })
      .addCase(addSite.fulfilled, (state, action) => {
        state.addSiteLoading = false;
        state.error = null;
      })
      .addCase(addSite.rejected, (state, action) => {
        state.addSiteLoading = false;
        state.error = action.payload;
      })

      .addCase(addToExistingTrip.pending, (state) => {
        state.addToExistingTripLoading = true;
        state.error = null;
      })
      .addCase(addToExistingTrip.fulfilled, (state, action) => {
        state.addToExistingTripLoading = false;
        state.error = null;
      })
      .addCase(addToExistingTrip.rejected, (state, action) => {
        state.addToExistingTripLoading = false;
        state.error = action.payload;
      })

  },
});

export const { setFavTogglingId, resetShareableLink, resetDownloadedTrip, setTripType, resetTripType, listUpdater } = itineriesInCitySlice.actions;
export default itineriesInCitySlice.reducer;
