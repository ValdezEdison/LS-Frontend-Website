import { createAsyncThunk } from "@reduxjs/toolkit";
import SuggestionService from "./SuggestionService";
import { handleApiError } from "../../utils/Helper";

export const fetchSuggestedPlaces = createAsyncThunk(
    "suggested/fetchSuggestedPlaces",
    async ({page, latitude, longitude, type}, { rejectWithValue }) => {
        try {
            const response = await SuggestionService.getSuggestedPlaces(page, latitude, longitude, type);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);