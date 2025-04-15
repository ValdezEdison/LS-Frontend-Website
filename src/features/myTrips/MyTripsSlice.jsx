import { createSlice } from "@reduxjs/toolkit";
import { fetchMyFutureTrips, fetchMyPastTrips } from "./MyTripsAction";

const initialState = {
    futureTrips: [],
    pastTrips: [],
    loading: false,
    error: null,
};

const myTripsSlice = createSlice({
    name: "myTrips",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
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
            });
    },
});

export default myTripsSlice.reducer;