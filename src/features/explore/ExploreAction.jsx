import { createAsyncThunk } from "@reduxjs/toolkit";
import ExploreService from "./ExploreService";
import { handleApiError } from "../../utils/Helper";

export const fetchCitiesInContinent = createAsyncThunk(
    "explore/fetchCitiesInContinent",
    async (continentId, { rejectWithValue }) => {
        try {
            const response = await ExploreService.getCitiesInContinent(continentId);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);