import { createAsyncThunk } from '@reduxjs/toolkit';
import BlocksService from './BlocksService';
import { handleApiError } from '../../../utils/Helper';

export const fetchHeaderBlocks = createAsyncThunk(
    'blocks/fetchHeaderBlocks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await BlocksService.getHeaderBlocks();
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchNewsLetterBlocks = createAsyncThunk(
    'blocks/fetchNewsLetterBlocks',
    async (language, { rejectWithValue }) => {
        try {
            const response = await BlocksService.getNewsLetterBlocks(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchBannerBlocks = createAsyncThunk(
    'blocks/fetchBannerBlocks',
    async (language, { rejectWithValue }) => {
        try {
            const response = await BlocksService.getBannerBlocks(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchFooterBlocks = createAsyncThunk(
    'blocks/fetchFooterBlocks',
    async (language, { rejectWithValue }) => {
        try {
            const response = await BlocksService.getFooterBlocks(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);


export const fetchMarketingCampaigns = createAsyncThunk(
    'blocks/fetchMarketingCampaigns',
    async ({language, name}, { rejectWithValue }) => {
        try {
            const response = await BlocksService.getMarketingCampaigns(language, name);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchSEOSettingsList = createAsyncThunk(
    'blocks/fetchSeoSettingsList',
    async (language, { rejectWithValue }) => {
        try {
            const response = await BlocksService.getSEOSettingsList(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const fetchAnalyticsSettingsList = createAsyncThunk(
    'blocks/fetchAnalyticsSettingsList',
    async (language, { rejectWithValue }) => {
        try {
            const response = await BlocksService.getAnalyticsSettingsList(language);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);