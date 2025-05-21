import { createAsyncThunk } from "@reduxjs/toolkit";
import pagesService from "./PagesService";
import { handleApiError } from "../../../utils/Helper";

export const fetchHeroContent = createAsyncThunk(
    "pages/fetchHeroContent",
    async (language, { rejectWithValue }) => {
        try {
            const response = await pagesService.getHeroContent(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchOurPartners = createAsyncThunk(
    "pages/fetchOurPartners",
    async (language, { rejectWithValue }) => {
        try {
            const response = await pagesService.getOurPartners(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchWhoWeAre = createAsyncThunk(
    "pages/fetchWhoWeAre",
    async (language, { rejectWithValue }) => {
        try {
            const response = await pagesService.getWhoWeAre(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchContactUs = createAsyncThunk(
    "pages/fetchContactUs",
    async (language, { rejectWithValue }) => {
        try {
            const response = await pagesService.getContactUs(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchFreePages = createAsyncThunk(
    "pages/fetchFreePages",
    async (language, { rejectWithValue }) => {
        try {
            const response = await pagesService.getFreePages(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchWorkWithUs = createAsyncThunk(
    "pages/fetchWorkWithUs",
    async (language, { rejectWithValue }) => {
        try {
            const response = await pagesService.getWorkWithUs(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchFaqBlocks = createAsyncThunk(
    "pages/fetchFaqBlocks",
    async (language, { rejectWithValue }) => {
        try {
            const response = await pagesService.getFaqBlocks(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);