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