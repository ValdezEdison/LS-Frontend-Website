import { createAsyncThunk } from '@reduxjs/toolkit';
import BlockService from './BlockService';
import { handleApiError } from '../../../utils/Helper';

export const fetchHeaderBlocks = createAsyncThunk(
    'blocks/fetchHeaderBlocks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await BlockService.getHeaderBlocks();
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);