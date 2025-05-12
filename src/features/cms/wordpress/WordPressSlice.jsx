import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostBySlug, fetchCategories, fetchPostsByCategory, fetchTags, fetchPostDetails, fetchMedia, fetchCategoriesWithPosts, fetchCategoryWithPosts } from './WordPressAction';

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
  LoadingTags: false,
  mediaByPostsLoading: false,
  categoriesWithPosts: {},
  categoriesWithPostsLoading: false
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


      .addCase(fetchCategoryWithPosts.pending, (state) => {
        state.categoriesWithPostsLoading = true;
      })
      .addCase(fetchCategoryWithPosts.fulfilled, (state, action) => {
        state.categoriesWithPostsLoading = false;
        state.categoriesWithPosts[action.payload.id] = action.payload;
      })
      .addCase(fetchCategoryWithPosts.rejected, (state, action) => {
        state.categoriesWithPostsLoading = false;
        state.error = action.payload;
      })
      
      // Multiple categories with posts
      .addCase(fetchCategoriesWithPosts.pending, (state) => {
        state.categoriesWithPostsLoading = true;
      })
      .addCase(fetchCategoriesWithPosts.fulfilled, (state, action) => {
        state.categoriesWithPostsLoading = false;
        action.payload.forEach(category => {
          state.categoriesWithPosts[category.id] = category;
        });
      })
      .addCase(fetchCategoriesWithPosts.rejected, (state, action) => {
        state.categoriesWithPostsLoading = false;
        state.error = action.payload;
      })

      // Fetch Media By Posts
      // .addCase(fetchMedia.pending, (state) => {
      //   state.mediaByPostsLoading = true;
      //   state.error = null;
      // })
      // .addCase(fetchMedia.fulfilled, (state, action) => {
      //   state.mediaByPostsLoading = false;
      //   // Update posts in postsByCategory
      //   Object.keys(state.postsByCategory).forEach(categoryId => {
      //     state.postsByCategory[categoryId] = state.postsByCategory[categoryId].map(post => {
      //       if (post.featured_media === action.meta.arg) {
      //         return {
      //           ...post,
      //           image: action.payload?.guid?.rendered // Add the image data to the post
      //         };
      //       }
      //       return post;
      //     });
      //   });
        
      //   // Also update regular posts array if needed
      //   state.posts = state.posts.map(post => {
      //     if (post.featured_media === action.meta.arg) {
      //       return {
      //         ...post,
      //         image: action.payload?.guid?.rendered
      //       };
      //     }
      //     return post;
      //   });
      // })
      // .addCase(fetchMedia.rejected, (state, action) => {
      //   state.mediaByPostsLoading = false;
      //   state.error = action.payload;
      // })
      ;
  }
});

export const { resetCurrentPost, setCurrentPage } = wordPressSlice.actions;
export default wordPressSlice.reducer;