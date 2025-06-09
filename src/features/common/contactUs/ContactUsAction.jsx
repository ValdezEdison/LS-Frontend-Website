import { createAsyncThunk } from "@reduxjs/toolkit";

import ContactUsService from "./ContactUsService";
import { handleApiError } from "../../../utils/Helper";

export const submitContactForm = createAsyncThunk(
    "contactUs/sendContactUs",
    async (data, { rejectWithValue }) => {
        try {
            const response = await ContactUsService.submitContactForm(data);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);