import { createAsyncThunk } from "@reduxjs/toolkit";
import destinationService from "./DestinationService";

export const fetchDestinationInfo = createAsyncThunk(
    "destination/fetchDestination",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await destinationService.getDestinationInfo(id);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);