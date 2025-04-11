import { createAsyncThunk } from "@reduxjs/toolkit";
import HomeService from "./HomeService";
import { handleApiError } from "../../utils/Helper";

export const fetchHomeRandomSites = createAsyncThunk(
    "home/fetchHomeRandomSites",
    async (_, { rejectWithValue }) => {
        try {
            const response = await HomeService.getRandomPlaces();
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);