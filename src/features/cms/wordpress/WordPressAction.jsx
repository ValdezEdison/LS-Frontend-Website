import { createAsyncThunk } from '@reduxjs/toolkit';
import WordPressService from './WordPressService';
import { handleApiError } from '../../../utils/Helper';

export const fetchPosts = createAsyncThunk(
  'wordpress/fetchPosts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await WordPressService.getPosts(params);
      
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


export const fetchMedia = createAsyncThunk(
  'wordpress/fetchMedia',
  async (params, { rejectWithValue }) => {
    try {
      return await WordPressService.getMedia(params);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);



export const fetchCategoryWithPosts = createAsyncThunk(
  'wordpress/fetchCategoryWithPosts',
  async ({ categoryId, ...params }, { rejectWithValue }) => {
    try {
      return await WordPressService.getCategoryWithPosts(categoryId, params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoriesWithPosts = createAsyncThunk(
  'wordpress/fetchCategoriesWithPosts',
  async ({ categoryIds, ...params }, { rejectWithValue }) => {
    try {
      return await WordPressService.getCategoriesWithPosts(categoryIds, params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchPostsByTag = createAsyncThunk(
  'wordpress/fetchPostsByTag',
  async ({ tagId, ...params }, { rejectWithValue }) => {
    try {
      return await WordPressService.getPostsByTag(tagId, params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPostsForCategories = createAsyncThunk(
  'wordpress/fetchPostsForCategories',
  async (categoryIds, { rejectWithValue }) => {
    try {
      return await WordPressService.getPostsForCategories(categoryIds, {
        per_page: 20 // Fetch more posts initially
      });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);