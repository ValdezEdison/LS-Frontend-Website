import { createSlice } from "@reduxjs/toolkit";
import { fetchTags } from "./TagsAction";
import { toggleFavorite } from "../../../favorites/FavoritesAction";

const initialState = {
    tags: [],
    loading: false,
    error: null,
    next: null,
    count: 0,
};

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        listUpdater: (state, action) => {
            state.tags = [...state.tags, ...action.payload?.results];
            state.next = action.payload.next;
        }
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
            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                state.isFavoriteToggling = false;
                state.error = action.payload;
            });
    },
});
export const { listUpdater } = tagsSlice.actions;
export default tagsSlice.reducer;