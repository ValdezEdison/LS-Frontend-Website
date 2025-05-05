import { createAsyncThunk } from "@reduxjs/toolkit";
import MyTripsService from "./MyTripsService";
import { handleApiError } from "../../utils/Helper";

export const fetchMyFutureTrips = createAsyncThunk(
    "myTrips/fetchMyFutureTrips",
    async (page, { rejectWithValue }) => {
        try {
            const response = await MyTripsService.getMyFutureTrips(page);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchMyPastTrips = createAsyncThunk(
    "myTrips/fetchMyPastTrips",
    async (page, { rejectWithValue }) => {
        try {
            const response = await MyTripsService.getMyPastTrips(page);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchTripDetails = createAsyncThunk(
    "myTrips/fetchTripDetails",
    async (tripId, { rejectWithValue }) => {
        try {
            const response = await MyTripsService.getTripDetails(tripId);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchSimilarStops = createAsyncThunk(
    "myTrips/fetchSimilarStops",
    async ({page = 1, tripId}, { rejectWithValue }) => {
        try {
            const response = await MyTripsService.getSimilarStops(page, tripId);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);


export const fetchTravelTime = createAsyncThunk(
  'myTrips/fetchTravelTime',
  async (tripId, { rejectWithValue }) => {
    try {
      const response = await MyTripsService.getTravelTime(tripId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateTrip = createAsyncThunk(
    "myTrips/updateTrip",
    async ({tripId, tripData}, { rejectWithValue }) => {
        try {
            const response = await MyTripsService.updateTrip(tripId, tripData);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const updateStops = createAsyncThunk(
    "myTrips/updateStops",
    async ({tripId, sites}, { rejectWithValue }) => {
        try {
            const response = await MyTripsService.updateStops(tripId, sites);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const deleteTrip = createAsyncThunk(
    "myTrips/deleteTrip",
    async (tripId, { rejectWithValue }) => {
        try {
            const response = await MyTripsService.deleteTrip(tripId);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);