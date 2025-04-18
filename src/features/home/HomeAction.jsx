import { createAsyncThunk } from "@reduxjs/toolkit";
import HomeService from "./HomeService";
import { handleApiError } from "../../utils/Helper";

export const fetchRandomSites = createAsyncThunk(
    "home/fetchRandomSites",
    async (_, { rejectWithValue }) => {
        try {
            const response = await HomeService.getRandomPlaces();
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);