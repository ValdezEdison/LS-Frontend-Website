import LocationService from "./LocationService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError } from "../../utils/Helper";

export const fetchLocationSettings = createAsyncThunk(
    "locations/fetchLocationSettings",
    async (_, { rejectWithValue }) => {
        try {
            const response = await LocationService.getLocationSettings();
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const updateLocation = createAsyncThunk(
    "locations/updateLocation",
    async (data, { rejectWithValue }) => {
        try {
            const response = await LocationService.updateLocation(data);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const updateLocationSettings = createAsyncThunk(
    "locations/updateLocationSettings",
    async (data, { rejectWithValue }) => {
        try {
            const response = await LocationService.updateLocationSettings(data);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

