// PlaceSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
    fetchPlaces,
    fetchPlaceById,
    fetchPlacesByCityId,
    createPlace,
    updatePlace,
    deletePlace,
    fetchGeoLocations,
    fetchPlaceComments, 
    fetchNearbyPlaces,
    fetchPlacesFilterCategories,
    toggleFavorite, 
    addComment,
    editComment,
    deleteComment,
    generateLink
} from './PlaceAction';
import { Favorite } from '../../components/common/Images';

const initialState = {
    places: [],
    place: null,
    loading: false,
    error: null,
    next: null,
    count: null,
    geoLocations: [],
    comments: [],
    NearbyPlaces: [],
    categories: [],
    filterLoading: false,
    isFavoriteToggling: false,
    favTogglingId : null,
    generateLinkLoading: false,
    shareableLink: null
};

const placeSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
        setFavTogglingId: (state, action) => {
            state.favTogglingId = action.payload
        }
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

            // Fetch place comments
            .addCase(fetchPlaceComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlaceComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchPlaceComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch nearby places
            .addCase(fetchNearbyPlaces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNearbyPlaces.fulfilled, (state, action) => {
                state.loading = false;
                state.NearbyPlaces = action.payload?.results;
            })
            .addCase(fetchNearbyPlaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch place categories
            .addCase(fetchPlacesFilterCategories.pending, (state) => {
                state.filterLoading = true;
                state.error = null;
            })
            .addCase(fetchPlacesFilterCategories.fulfilled, (state, action) => {
                state.filterLoading = false;
                state.categories = action.payload?.results;
            })
            .addCase(fetchPlacesFilterCategories.rejected, (state, action) => {
                state.filterLoading = false;
                state.error = action.payload;
            })

            // Toggle favorite
            .addCase(toggleFavorite.pending, (state) => {
                state.isFavoriteToggling = true;
                state.error = null;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                state.isFavoriteToggling = false;
                state.favTogglingId = null;
                
                // Update places list if we're not on the details page
                const updatedPlaces = state.places.map(place => {
                    if (place.id === action.payload.id) {
                        return {
                            ...place,
                            is_fav: action.payload.response.detail === "Marked as favorite"
                        };
                    }
                    return place;
                });
                state.places = updatedPlaces;
            
                // Also update the single place if it's the one being toggled
                if (state.place && state.place.id === action.payload.id) {
                    state.place = {
                        ...state.place,
                        is_fav: action.payload.response.detail === "Marked as favorite"
                    };
                }
            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                state.isFavoriteToggling = false;
                state.error = action.payload;
            })

            // add comment
            .addCase(addComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // edit comment
            .addCase(editComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editComment.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.comments.findIndex(comment => comment.id === action.payload.id);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
            })
            .addCase(editComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // delete comment
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = state.comments.filter(comment => comment.id !== action.payload.id);
            })
            .addCase(deleteComment.rejected, (state, action) => {
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
            })
            .addCase(generateLink.pending, (state) => {
                state.generateLinkLoading = true;
                state.error = null;
            })
            .addCase(generateLink.fulfilled, (state, action) => {
                state.generateLinkLoading = false;
                state.shareableLink = action.payload?.detail;
            })
            .addCase(generateLink.rejected, (state, action) => {
                state.generateLinkLoading = false;
                state.error = action.payload;
            })
            ;
    },
});

export const { setFavTogglingId } = placeSlice.actions;
export default placeSlice.reducer;