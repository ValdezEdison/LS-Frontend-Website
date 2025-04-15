import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites, toggleFavorite } from "./FavoritesAction";

const initialState = {
    favorites: [],
    loading: false,
    error: null,
    isFavoriteToggling: false,
    favTogglingId: null

};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavTogglingId: (state, action) => {
            state.favTogglingId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.favorites = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
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
export const { setFavTogglingId } = favoritesSlice.actions;
