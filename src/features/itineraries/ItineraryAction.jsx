import { createAsyncThunk } from "@reduxjs/toolkit";

import itineraryService from "./ItineraryService";
import { handleApiError } from "../../utils/Helper"

export const fetchItineraries = createAsyncThunk(
    "itineraries/fetchItineraries",
    async (page, { rejectWithValue }) => {
        try {
            const response = await itineraryService.getItineraries(page);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchItinerariesInCity = createAsyncThunk(
    'itineraries/fetchItinerariesInCity',
    async ({ cityId, page }, { rejectWithValue }) => {
      try {
        const response = await itineraryService.getItinerariesInCity(cityId, page);
        return response;
      } catch (error) {
        return rejectWithValue(handleApiError(error));
      }
    }
  );