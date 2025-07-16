// src/features/places/placesInfo/destination/DestinationAction.jsx
import { createAsyncThunk } from "@reduxjs/toolkit";
import destinationService from "./DestinationService"; 
import apiService from "../../../../services/ApiService";

export const fetchDestinationInfo = createAsyncThunk(
    "destination/fetchDestination",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await destinationService.getDestinationInfo(id);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);
 
export const fetchDestinationBySlug = createAsyncThunk(
  'destination/fetchBySlug',
  async (slugs, { rejectWithValue }) => {
    try {
      const { country_slug, city_slug } = slugs;
      console.log(`Fetching from: /cities/${country_slug}/${city_slug}/`);
      const response = await apiService.get(`/cities/${country_slug}/${city_slug}/`);
      console.log("API Response:", response);
      
      // Add debugging to examine the structure
      console.log("Response structure check:", {
        hasDataProperty: 'data' in response,
        topLevelProperties: Object.keys(response)
      });
      
      // If the API returns { data: {...} }
      if (response && typeof response === 'object' && 'data' in response) {
        return response.data;
      }
      
      // If the API returns the data directly
      return response;
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch destination');
    }
  }
);