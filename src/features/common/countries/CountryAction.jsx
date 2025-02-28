import { createAsyncThunk } from "@reduxjs/toolkit";
import CountryService from "./CountryService";
import { handleApiError } from "../../../utils/Helper";

export const fetchCountries = createAsyncThunk(
    "countries/fetchCountries",
    async (searchQuery = "", { rejectWithValue }) => {
        try {
            const response = await CountryService.getCountries(searchQuery);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);