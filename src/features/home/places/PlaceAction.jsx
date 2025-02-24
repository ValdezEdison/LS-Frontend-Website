// src/features/places/PlaceAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import placeService from './PlaceService';
import { handleApiError } from '../../../utils/Helper';

// Fetch all places
export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async (_, { rejectWithValue }) => {
    try {
      const response = await placeService.getPlaces();

      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Fetch a single place by ID
export const fetchPlaceById = createAsyncThunk(
  'places/fetchPlaceById',
  async (placeId, { rejectWithValue }) => {
    try {
      const response = await placeService.getPlace(placeId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Create a new place
export const createPlace = createAsyncThunk(
  'places/createPlace',
  async (placeData, { rejectWithValue }) => {
    try {
      const response = await placeService.createPlace(placeData);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Update an existing place
export const updatePlace = createAsyncThunk(
  'places/updatePlace',
  async ({ placeId, placeData }, { rejectWithValue }) => {
    try {
      const response = await placeService.updatePlace(placeId, placeData);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Delete a place
export const deletePlace = createAsyncThunk(
  'places/deletePlace',
  async (placeId, { rejectWithValue }) => {
    try {
      await placeService.deletePlace(placeId);
      return placeId;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
