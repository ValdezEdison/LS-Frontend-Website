import { createAsyncThunk } from "@reduxjs/toolkit";

import NewsLetterService from "./NewsLetterService";
import { handleApiError } from "../../../utils/Helper";

export const subscribe = createAsyncThunk(
    "newsletter/subscribe",
    async (email, { rejectWithValue }) => {
        try {
            const response = await NewsLetterService.subscribe(email);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

