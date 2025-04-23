import { createAsyncThunk } from '@reduxjs/toolkit';
import WordPressService from './WordPressService';
import { handleApiError } from '../../../utils/Helper';

export const fetchPosts = createAsyncThunk(
  'wordpress/fetchPosts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await WordPressService.getPosts(params);
      return {
        posts: response.data,
        pagination: {
          total: parseInt(response.headers['x-wp-total']) || 0,
          totalPages: parseInt(response.headers['x-wp-totalpages']) || 0,
          currentPage: params.page || 1
        }
      };
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