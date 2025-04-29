import { createSlice } from "@reduxjs/toolkit";
import { fetchMyFutureTrips, fetchMyPastTrips, fetchTripDetails, fetchSimilarStops, fetchTravelTime } from "./MyTripsAction";

const initialState = {
    futureTrips: [],
    pastTrips: [],
    loading: false,
    error: null,
    tripDetails: null,
    similarStops: [],
    similarStopsLoading: false,
    travelTime: null,
    travelTimeLoading: false
};

const myTripsSlice = createSlice({
    name: "myTrips",
    initialState,
    reducers: {
        listUpdater: (state, action) => {
            state.futureTrips = [...state.futureTrips, ...action.payload?.results];
            state.next = action.payload.next;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyFutureTrips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyFutureTrips.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.futureTrips = action.payload?.results;
            })
            .addCase(fetchMyFutureTrips.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload;               
            })

            .addCase(fetchMyPastTrips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyPastTrips.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.pastTrips = action.payload?.results;
            })
            .addCase(fetchMyPastTrips.rejected, (state, action) => {
                state.loading = false;  
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


    },
});
export const { listUpdater } = myTripsSlice.actions;
export default myTripsSlice.reducer;