import { createAsyncThunk } from "@reduxjs/toolkit";
import FavoriteService from "./FavoritesService";
import { handleApiError } from "../../utils/Helper";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async ({page, keyword, ...filters}, { rejectWithValue }) => {
      try {
          const response = await FavoriteService.getFavorites(page, keyword, filters);
          return response;
      } catch (error) {
          return rejectWithValue(handleApiError(error));
      }
  }
);


export const toggleFavorite = createAsyncThunk(
    'favorites/toggleFavorite',
    async (placeId, { rejectWithValue }) => {
      try {
        const response = await FavoriteService.toggleFavorite(placeId);
        return { id: placeId, response: response };
        return response;
      } catch (error) {
        return rejectWithValue(handleApiError(error));
      }
    }
  )