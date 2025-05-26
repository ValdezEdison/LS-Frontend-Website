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