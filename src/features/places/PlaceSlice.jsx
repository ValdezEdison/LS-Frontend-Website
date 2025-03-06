// PlaceSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
    fetchPlaces,
    fetchPlaceById,
    fetchPlacesByCityId,
    createPlace,
    updatePlace,
    deletePlace,
    fetchGeoLocations
} from './PlaceAction';

const initialState = {
    places: [],
    place: null,
    loading: false,
    error: null,
    next: null,
    count: null,
    geoLocations: []
};

const placeSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            // Fetch all places
            .addCase(fetchPlaces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.loading = false;
                state.places = action.payload?.results;
                state.next = action.payload?.next;
                state.count = action.payload?.count;
            })
            .addCase(fetchPlaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch places by city ID
            .addCase(fetchPlacesByCityId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlacesByCityId.fulfilled, (state, action) => {
                state.loading = false;
                state.places = action.payload?.results;
                state.next = action.payload?.next;
                state.count = action.payload?.count;
            })
            .addCase(fetchPlacesByCityId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch GeoLocations
            .addCase(fetchGeoLocations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGeoLocations.fulfilled, (state, action) => {
                state.loading = false;
                state.geoLocations = action.payload;
            })
            .addCase(fetchGeoLocations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch a single place by ID
            .addCase(fetchPlaceById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlaceById.fulfilled, (state, action) => {
                state.loading = false;
                state.place = action.payload;
            })
            .addCase(fetchPlaceById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create a new place
            .addCase(createPlace.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPlace.fulfilled, (state, action) => {
                state.loading = false;
                state.places.push(action.payload);
            })
            .addCase(createPlace.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update an existing place
            .addCase(updatePlace.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePlace.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.places.findIndex(place => place.id === action.payload.id);
                if (index !== -1) {
                    state.places[index] = action.payload;
                }
            })
            .addCase(updatePlace.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete a place
            .addCase(deletePlace.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePlace.fulfilled, (state, action) => {
                state.loading = false;
                state.places = state.places.filter(place => place.id !== action.payload);
            })
            .addCase(deletePlace.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default placeSlice.reducer;