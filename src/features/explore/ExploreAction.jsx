import { createAsyncThunk } from "@reduxjs/toolkit";
import ExploreService from "./ExploreService";
import { handleApiError } from "../../utils/Helper";

export const fetchCitiesInContinent = createAsyncThunk(
    "explore/fetchCitiesInContinent",
    async ({continentId, page}, { rejectWithValue }) => {
        try {
            const response = await ExploreService.getCitiesInContinent(continentId, page);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);