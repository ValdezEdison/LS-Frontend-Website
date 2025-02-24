import { createAsyncThunk } from "@reduxjs/toolkit";
import ImageService from "./ImageService";
import { handleApiError } from "../../../utils/Helper";

export const fetchImages = createAsyncThunk(
    "images/fetchImages",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ImageService.getImages();
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);