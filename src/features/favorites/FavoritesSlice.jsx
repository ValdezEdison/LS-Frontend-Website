import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites, toggleFavorite } from "./FavoritesAction";

const initialState = {
    favorites: [],
    favLoading: false,
    error: null,
    isFavoriteToggling: false,
    favTogglingId: null,
    next: null,
    count: null

};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavTogglingId: (state, action) => {
            state.favTogglingId = action.payload;
        },
        listUpdater: (state, action) => {
            state.favorites = [...state.favorites, ...action.payload?.results];
            state.next = action.payload.next;
          },
        removeFavorite: (state, action) => {
            const idToRemove = action.payload;
            state.favorites = state.favorites.filter(item => item.id !== idToRemove);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.favLoading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.favLoading = false;
                state.error = null;
                state.favorites = action.payload?.results;
                state.next = action.payload?.next;
                state.count = action.payload?.count;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.favLoading = false;
                state.error = action.error.message;
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
                const updatedPlaces = state.favorites.map(place => {
                    if (place.id === action.payload.id) {
                        return {
                            ...place,
                            is_fav: action.payload.response.detail === "Marked as favorite"
                        };
                    }
                    return place;
                });
                state.favorites = updatedPlaces;

                // Also update the single place if it's the one being toggled
              
            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                state.isFavoriteToggling = false;
                state.error = action.payload;
            });
    },
});

export default favoritesSlice.reducer;
export const { setFavTogglingId, listUpdater, removeFavorite } = favoritesSlice.actions;
