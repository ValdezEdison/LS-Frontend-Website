import tagsService from "./TagsService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError } from "../../../../utils/Helper";

export const fetchTags = createAsyncThunk(
    "tags/fetchTags",
    async ({ tagId, cityId, page }, { rejectWithValue }) => {
        try {
            const response = await tagsService.getTags(tagId, cityId, page);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchEventsOrPlacesByTag = createAsyncThunk(
    "tags/fetchEventsOrPlacesByTag",
    async ({type, tagId, cityId, page }, { rejectWithValue }) => {
        try {
            const response = await tagsService.getEventsOrPlacesByTag(type, tagId, cityId, page);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchItinerariesByTag = createAsyncThunk(
    "tags/fetchItinerariesByTag",
    async ({ tagId, cityId, page }, { rejectWithValue }) => {
        try {
            const response = await tagsService.getItinerariesByTag(tagId, cityId, page);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);