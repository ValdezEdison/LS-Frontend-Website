import { createSlice } from "@reduxjs/toolkit";
import { fetchTags, fetchEventsOrPlacesByTag, fetchItinerariesByTag } from "./TagsAction";
import { toggleFavorite } from "../../../favorites/FavoritesAction";

const initialState = {
    tags: [],
    loading: false,
    error: null,
    next: null,
    count: 0,
    data: [],

};

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        listUpdater: (state, action) => {
            if(action.payload?.listName === 'tags') {
                state.tags = [...state.tags, ...action.payload?.results];
                state.next = action.payload.next;
            }else if(action.payload?.listName === 'events' || action.payload?.listName === 'places' || action.payload?.listName === 'itineraries') {
                state.data = [...state.data, ...action.payload?.results];
                state.next = action.payload.next;
            }
        },
        resetState: (state) => {
            state.tags = [];
            state.loading = false;
            state.error = null;
            state.next = null;
            state.count = 0;
            state.data = [];
        },
    },
        /**
         * Extra reducers for this slice, used to handle the result of asynchronous actions.
         * @param {ReduxToolkit.ActionBuilder<ReduxToolkit.AnyAction, string, {}>} builder
         * @returns {void}
         */
    extraReducers: (builder) => {
        builder
            // Fetch all tags
            .addCase(fetchTags.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.loading = false;
                state.tags = action.payload?.results || [];
                state.next = action.payload?.next;
                state.count = action.payload?.count;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.loading = false;
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
                
                const updatedPlaces = state.tags.map(place => {
                if (place.id === action.payload.id) {
                    return {
                    ...place,
                    is_fav: action.payload.response.detail === "Marked as favorite"
                    };
                }
                return place;
                });
                
                state.tags = updatedPlaces;

                const updatedEventsOnPlaces = state.data.map(eventOrPlace => {
                if (eventOrPlace.id === action.payload.id) {
                    return {
                    ...eventOrPlace,
                    is_fav: action.payload.response.detail === "Marked as favorite"
                    };
                }
                return eventOrPlace;
                });
                
                state.data = updatedEventsOnPlaces;
            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                state.isFavoriteToggling = false;
                state.error = action.payload;
            })
            // Fetch events or places by tag
            .addCase(fetchEventsOrPlacesByTag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventsOrPlacesByTag.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload?.results || [];
                state.next = action.payload?.next;
            })
            .addCase(fetchEventsOrPlacesByTag.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch itineraries by tag
            .addCase(fetchItinerariesByTag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItinerariesByTag.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload?.results || [];
                state.next = action.payload?.next;
            })
            .addCase(fetchItinerariesByTag.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { listUpdater, resetState } = tagsSlice.actions;
export default tagsSlice.reducer;