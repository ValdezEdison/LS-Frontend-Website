
// src/features/places/placesinfo/destination/DestinationSlice.jsx
import { createSlice } from '@reduxjs/toolkit';
import { fetchDestinationInfo, fetchDestinationBySlug } from './DestinationAction';

const initialState = {
    destination: null,
    loading: false,
    error: null,
};

const destinationSlice = createSlice({
    name: 'destination',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDestinationInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDestinationInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.destination = action.payload;
            })
            .addCase(fetchDestinationInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchDestinationBySlug.pending, (state) => {
            state.loading = true;
            state.destination = null; // Clear previous data
            state.error = null;
            })
            .addCase(fetchDestinationBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                
                // Add debugging
                console.log("Reducer received payload:", action.payload);
                
                // Store the data in state
                state.destination = action.payload;
                })
            .addCase(fetchDestinationBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default destinationSlice.reducer;