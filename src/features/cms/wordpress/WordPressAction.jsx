import { createAsyncThunk } from '@reduxjs/toolkit';
import WordPressService from './WordPressService';
import { handleApiError } from '../../../utils/Helper';

export const fetchPosts = createAsyncThunk(
  'wordpress/fetchPosts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await WordPressService.getPosts(params);
      console.log(response, 'response');
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchPostBySlug = createAsyncThunk(
  'wordpress/fetchPostBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const post = await WordPressService.getPostBySlug(slug);
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'wordpress/fetchCategories',
  async (params, { rejectWithValue }) => {
    try {
      return await WordPressService.getCategories(params);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchPostsByCategory = createAsyncThunk(
  'wordpress/fetchPostsByCategory',
  async (params, { rejectWithValue }) => {
    try {
      return await WordPressService.getPostsByCategory(params);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


export const fetchTags = createAsyncThunk(
  'wordpress/fetchTags',
  async (params, { rejectWithValue }) => {
    try {
      return await WordPressService.getTags(params);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


export const fetchPostDetails = createAsyncThunk(
  'wordpress/fetchPostDetails',
  async (postId, { rejectWithValue }) => {
    try {
      return await WordPressService.getPostDetails(postId);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);