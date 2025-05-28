// src/features/places/PlaceAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import placeService from './PlaceService';
import { handleApiError } from '../../utils/Helper';

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

export const fetchPlacesByCityId = createAsyncThunk(
  'places/fetchPlacesByCityId',
  async ({ cityId, page = 1, preview = 1, country = null, avg_rating = "", categories = "", levels = "", subcategories, points, sort_by }, { rejectWithValue }) => {
    try {
      const response = await placeService.getPlacesByCityId(cityId, page, preview, country, avg_rating, categories, levels,subcategories, points, sort_by);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


export const fetchGeoLocations = createAsyncThunk(
  'places/fetchGeoLocations',
  async ({ cityId, type, country, page, preview, avg_rating, categories, levels,subcategories, points, latitude, longitude }, { rejectWithValue }) => {
    try {
      const response = await placeService.getGeoLocations(cityId, type, country, page, preview, avg_rating, categories, levels, subcategories, points, latitude, longitude);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchPlaceComments = createAsyncThunk(
  'places/fetchPlaceComments',
  async (placeId, { rejectWithValue }) => {
    try {
      const response = await placeService.getPlaceComments(placeId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);

export const fetchNearbyPlaces = createAsyncThunk(
  'places/fetchNearbyPlaces',
  async ({ placeId, page, latitude, longitude }, { rejectWithValue }) => {
    try {
      const response = await placeService.getNearbyPlaces(placeId, page, latitude, longitude);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchPlacesFilterCategories = createAsyncThunk(
  'places/fetchPlacesFilterCategories',
  async ({ page = 1, type = "place", cityId = "" }, { rejectWithValue }) => {
    try {
      const response = await placeService.getPlacesFilterCategories(page, type, cityId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'places/toggleFavorite',
  async (placeId, { rejectWithValue }) => {
    try {
      const response = await placeService.toggleFavorite(placeId);
      return { id: placeId, response: response };
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const addComment = createAsyncThunk(
  'places/addComment',
  async ({ placeId, commentData }, { rejectWithValue }) => {
    try {
      const response = await placeService.addComment(placeId, commentData);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const editComment = createAsyncThunk(
  'places/editComment',
  async ({ commentId, commentData }, { rejectWithValue }) => {
    try {
      const response = await placeService.editComment( commentId, commentData);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const deleteComment = createAsyncThunk(
  'places/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await placeService.deleteComment(commentId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

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

export const generateLink = createAsyncThunk(
  'places/generateLink',
  async (placeId, { rejectWithValue }) => {
    try {
      const response = await placeService.generateLink(placeId);            
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


export const fetchNearMePlaces = createAsyncThunk(
  'places/fetchNearMePlaces',
  async ({ page, latitude, longitude, type,  avg_rating, 
    categories, 
    levels, 
    subcategories, 
    sort_by,
    radius  }, { rejectWithValue }) => {
    try {
      const response = await placeService.getNearMePlaces(page, latitude, longitude, type,  avg_rating,
        categories,
        levels,
        subcategories,
        sort_by,
        radius);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchRandomPlaces = createAsyncThunk(
  'places/fetchRandomPlaces',
  async ({ page, type }, { rejectWithValue }) => {
    try {
      const response = await placeService.getRandomPlaces(page, type);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


export const fetchPlacesSearchResults = createAsyncThunk(
  'places/fetchPlacesSearchResults',
  async ({ page, type, keyword }, { rejectWithValue }) => {
    try {
      const response = await placeService.getPlacesSearchResults(page, type, keyword);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
