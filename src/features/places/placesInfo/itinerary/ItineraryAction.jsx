import { createAsyncThunk } from "@reduxjs/toolkit";
import itineraryService from "./ItineraryService";
import { handleApiError } from "../../../../utils/Helper";

// Fetch all places In city id
export const fetchItineriesInCity = createAsyncThunk(
    'places/fetchItineries',
    async (cityId, { rejectWithValue }) => {
      try {
        const response = await itineraryService.getItineriesInCityId(cityId);
        return response;
      } catch (error) {
        return rejectWithValue(handleApiError(error));
      }
    }
  );

  export const fetchItineraryDetails = createAsyncThunk(
    'places/fetchItineraryDetails',
    async (routeId, { rejectWithValue }) => {
      try {
        const response = await itineraryService.getItineraryDetails(routeId);
        return response;
      } catch (error) {
        return rejectWithValue(handleApiError(error));
      }
    }
  );