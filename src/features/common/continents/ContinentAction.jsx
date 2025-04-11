import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError } from "../../../utils/Helper";
import ContinentService from "./ContinentService";


export const fetchContinents = createAsyncThunk(
    "continents/fetchContinents",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ContinentService.getContinents();
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);