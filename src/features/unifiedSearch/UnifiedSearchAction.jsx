import { createAsyncThunk } from "@reduxjs/toolkit";
import UnifiedSearchService from "./UnifiedSearchService";
import { handleApiError } from "../../utils/Helper";

export const fetchUnifiedSearchResults = createAsyncThunk(
    "unifiedSearch/fetchUnifiedSearchResults",
    async (keyword, { rejectWithValue }) => {
        try {
            const response = await UnifiedSearchService.getUnifiedSearchResults(keyword);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);