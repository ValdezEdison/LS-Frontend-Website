import { createSlice } from "@reduxjs/toolkit";
import { fetchMyFutureTrips, fetchMyPastTrips, fetchTripDetails } from "./MyTripsAction";

const initialState = {
    futureTrips: [],
    pastTrips: [],
    loading: false,
    error: null,
    tripDetails: null
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
            });


    },
});
export const { listUpdater } = myTripsSlice.actions;
export default myTripsSlice.reducer;