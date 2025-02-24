import { createAsyncThunk } from "@reduxjs/toolkit";
import LanguageService from "./LanguageService";
import { handleApiError } from "../../../utils/Helper";

export const fetchLanguages = createAsyncThunk(
    "languages/fetchLanguages",
    async (_, { rejectWithValue }) => {
        try {
            const response = await LanguageService.getLanguages();
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);