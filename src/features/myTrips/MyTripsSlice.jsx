import { createSlice } from "@reduxjs/toolkit";
import { fetchMyFutureTrips, fetchMyPastTrips, fetchTripDetails, fetchSimilarStops, fetchTravelTime, updateTrip, updateStops, deleteTrip, updateCities, downloadTrip } from "./MyTripsAction";

const initialState = {
    futureTrips: [],
    futureTripsLoading: false,
    pastTrips: [],
    loading: false,
    pastTripsLoading: false,
    error: null,
    tripDetails: null,
    similarStops: [],
    similarStopsLoading: false,
    travelTime: null,
    travelTimeLoading: false,
    updateCitiesLoading: false,
    downloadTripLoading: false,
    downloadedTrip: null,
};

const myTripsSlice = createSlice({
    name: "myTrips",
    initialState,
    reducers: {
        listUpdater: (state, action) => {
            state.futureTrips = [...state.futureTrips, ...action.payload?.results];
            state.next = action.payload.next;
        },
        resetTripDetails: (state) => {
            state.tripDetails = null;
        },
        resetDownloadedTrip: (state) => {
            state.downloadedTrip = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyFutureTrips.pending, (state) => {
                state.futureTripsLoading = true;
                state.error = null;
            })
            .addCase(fetchMyFutureTrips.fulfilled, (state, action) => {
                state.futureTripsLoading = false;
                state.error = null;
                state.futureTrips = action.payload?.results;
            })
            .addCase(fetchMyFutureTrips.rejected, (state, action) => {
                state.futureTripsLoading = false;  
                state.error = action.payload;               
            })

            .addCase(fetchMyPastTrips.pending, (state) => {
                state.pastTripsLoading = true;
                state.error = null;
            })
            .addCase(fetchMyPastTrips.fulfilled, (state, action) => {
                state.pastTripsLoading = false;
                state.error = null;
                state.pastTrips = action.payload?.results;
            })
            .addCase(fetchMyPastTrips.rejected, (state, action) => {
                state.pastTripsLoading = false;  
                state.error = action.payload;               
            })

            .addCase(fetchTripDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTripDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.tripDetails = action.payload;
            })
            .addCase(fetchTripDetails.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload;               
            })

            .addCase(fetchSimilarStops.pending, (state) => {
                state.similarStopsLoading = true;
                state.error = null;
            })
            .addCase(fetchSimilarStops.fulfilled, (state, action) => {
                state.similarStopsLoading = false;
                state.error = null;
                state.similarStops = action.payload?.results;
            })
            .addCase(fetchSimilarStops.rejected, (state, action) => {
                state.similarStopsLoading = false;  
                state.error = action.payload;               
            })

            .addCase(fetchTravelTime.pending, (state) => {
                state.travelTimeLoading = true;
                state.error = null;
            })
            .addCase(fetchTravelTime.fulfilled, (state, action) => {
                state.travelTimeLoading = false;
                state.error = null;
                state.travelTime = action.payload;
            })
            .addCase(fetchTravelTime.rejected, (state, action) => {
                state.travelTimeLoading = false;  
                state.error = action.payload;               
            })

            .addCase(updateTrip.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTrip.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateTrip.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload;               
            })

            .addCase(updateStops.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStops.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateStops.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload;               
            })

            .addCase(deleteTrip.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTrip.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteTrip.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload;               
            })

            .addCase(updateCities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCities.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateCities.rejected, (state, action) => {
                state.loading = false;  
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

    },
});
export const { listUpdater, resetTripDetails, resetDownloadedTrip } = myTripsSlice.actions;
export default myTripsSlice.reducer;