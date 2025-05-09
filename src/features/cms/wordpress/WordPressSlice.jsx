import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostBySlug, fetchCategories, fetchPostsByCategory, fetchTags, fetchPostDetails } from './WordPressAction';

const initialState = {
  posts: [],
  currentPost: null,
  categories: [],
  categoriesLoading: false,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    totalPages: 0,
    currentPage: 1
  },
  postsByCategory: [],
  postsByCategoryLoading: false,
  tags: [],
  LoadingTags: false
};

const wordPressSlice = createSlice({
  name: 'wordpress',
  initialState,
  reducers: {
    resetCurrentPost: (state) => {
      state.currentPost = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log(action.payload, 'payload');
        state.loading = false;
        state.posts = action.payload.posts;
        state.pagination = {
          ...state.pagination,
          total: action.payload.pagination.total,
          totalPages: action.payload.pagination.totalPages,
          currentPage: action.payload.pagination.currentPage
        };
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Post By Slug
      .addCase(fetchPostBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.error = action.payload;
      })

      // Fetch Posts By Category
      .addCase(fetchPostsByCategory.pending, (state) => {
        state.postsByCategoryLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsByCategory.fulfilled, (state, action) => {
        state.postsByCategoryLoading = false;
        state.postsByCategory = {
          ...state.postsByCategory,
          [action.payload.categoryId]: action.payload.posts
        };
        state.pagination = {
          ...state.pagination,
          total: action.payload.pagination.total,
          totalPages: action.payload.pagination.totalPages,
          currentPage: action.payload.pagination.currentPage
        };
      })
      .addCase(fetchPostsByCategory.rejected, (state, action) => {
        state.postsByCategoryLoading = false;
        state.error = action.payload;
      })

      // Fetch Tags
      .addCase(fetchTags.pending, (state) => {
        state.LoadingTags = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.LoadingTags = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.LoadingTags = false;
        state.error = action.payload;
      })

      // Fetch Post Details
      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  }
});

export const { resetCurrentPost, setCurrentPage } = wordPressSlice.actions;
export default wordPressSlice.reducer;