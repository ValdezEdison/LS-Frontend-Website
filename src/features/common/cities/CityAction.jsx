import { createAsyncThunk } from "@reduxjs/toolkit";
import CityService from "./CityService";
import { handleApiError } from "../../../utils/Helper";

export const fetchCities = createAsyncThunk(
    "cities/fetchCities",
    async ({ countryId, searchQuery = "" }, { rejectWithValue }) => {
        try {
            const response = await CityService.getCities(countryId, searchQuery);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);