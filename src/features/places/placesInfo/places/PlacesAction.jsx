import { createAsyncThunk } from "@reduxjs/toolkit";
import placesService from "./PlacesService";
import { handleApiError } from "../../../../utils/Helper";

// Fetch all places In city id
export const fetchPlacesInCity = createAsyncThunk(
  'places/fetchPlaces',
  async ({ cityId, page, type, levels, categories, subcategories, points, preview }, { rejectWithValue }) => {
      try {
          const response = await placesService.getPlacesInCity(cityId, page, type, levels, categories, subcategories, points, preview);
          return response;
      } catch (error) {
          return rejectWithValue(handleApiError(error));
      }
  }
);