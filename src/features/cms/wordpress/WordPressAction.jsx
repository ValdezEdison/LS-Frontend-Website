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
  async (_, { rejectWithValue }) => {
    try {
      return await WordPressService.getCategories();
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);