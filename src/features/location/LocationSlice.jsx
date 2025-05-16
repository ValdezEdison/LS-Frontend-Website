import { createSlice } from "@reduxjs/toolkit";
import { fetchLocationSettings, updateLocation, updateLocationSettings } from "./LocationAction";

const initialState = {
    trackingEnabled: false,
    currentLocation: null,
    settings: null,
    loading: false,
    error: null,
    trackingId: null,
};


const locationSlice = createSlice({
    name: "locationSettings",
    initialState,
    reducers: {
        setTrackingId: (state, action) => {
            state.trackingId = action.payload;
        },
        clearLocation: (state) => {
            console.log("clearLocation called");
            state.currentLocation = null;
            state.trackingEnabled = false;
            state.trackingId = null;
        },
        enableTracking: (state) => {
            console.log("enableTracking");
            state.trackingEnabled = true;
        },
        disableTracking: (state) => {
            state.trackingEnabled = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocationSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLocationSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.currentLocation = action.payload;
            })
            .addCase(fetchLocationSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLocation.fulfilled, (state, action) => {
                console.log(action.payload, "action.payload");
                state.loading = false;
                state.error = null;
                state.currentLocation = action.payload;
            })
            .addCase(updateLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateLocationSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLocationSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.settings = action.payload;
            })
            .addCase(updateLocationSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
           
    },
});

export const { setTrackingId, clearLocation, enableTracking, disableTracking } = locationSlice.actions;
export default locationSlice.reducer;