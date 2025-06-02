import { WordPressInstance } from "../../../services/AxiosConfig";

const WordPressService = {
  /**
   * Get posts from WordPress
   * @param {Object} params - Query parameters
   * @returns {Promise} - Response with posts and headers
   */
  getPosts: async (params = {}) => {
 
  
    try {
      const response = await WordPressInstance.get('/wp-json/wp/v2/posts', {
        params: {
          ...params,
          // Ensure _embed is always true unless explicitly disabled
           _embed: true,
          // _fields: 'id,title,excerpt,featured_media,date,_links,_embedded'
        },
    
      });
  
   
      return {
        posts: response.data,
        pagination: {
          total: parseInt(response.headers['x-wp-total']) || 0,
          totalPages: parseInt(response.headers['x-wp-totalpages']) || 0,
          currentPage: params.page || 1
        }
      };
    } catch (error) {
      
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch posts from WordPress'
      );
    }
  },

  /**
   * Get single post by slug
   * @param {string} slug - Post slug
   * @returns {Promise} - Single post
   */
  getPostBySlug: async (slug) => {
    const response = await WordPressInstance.get('/posts', {
      params: {
        slug,
        _embed: true
      }
    });
    return response.data[0] || null;
  },

  /**
   * Get all categories
   * @returns {Promise} - Array of categories
   */
  getCategories: async (params) => {
    const response = await WordPressInstance.get('/wp-json/wp/v2/categories', {
      params: {
        ...params,
        _embed: true,
        fields: '_embedded'
      }
   
    });
    return response.data;
  },

  /**
   * Get media by ID
   * @param {number} id - Media ID
   * @returns {Promise} - Media object
   */
  getMedia: async (id) => {
    const response = await WordPressInstance.get(`/wp-json/wp/v2/media/${id}`);
    return response.data;
  },
  getPostsByCategory: async (params) => {
    const { categoryId, page = 1, perPage = 10 } = params;
    const response = await WordPressInstance.get('/wp-json/wp/v2/posts', {
      params: {
        categories: categoryId,
        page,
        per_page: perPage,
        _embed: true
      }
    });
    
    return {
      categoryId,
      posts: response.data,
      pagination: {
        total: parseInt(response.headers['x-wp-total'], 10) || 0,
        totalPages: parseInt(response.headers['x-wp-totalpages'], 10) || 0,
        currentPage: page
      }
    };
  },
  getTags: async (params) => {
    const response = await WordPressInstance.get('/wp-json/wp/v2/tags', {
      params
    });
    return response.data;
  },
  getPostDetails: async (postId) => {
    const response = await WordPressInstance.get(`/wp-json/wp/v2/posts/${postId}`, {
      params: {
        _embed: true,
        fields: '_embedded'
      }
    });
    return response.data;
  },

  getCategoryWithPosts: async (categoryId, params = {}) => {
    try {
      // Fetch category and posts in parallel
      const [categoryResponse, postsResponse] = await Promise.all([
        WordPressInstance.get(`/wp-json/wp/v2/categories/${categoryId}`, {
          params: {
            _fields: 'id,name,slug,description,count,link'
          }
        }),
        WordPressInstance.get('/wp-json/wp/v2/posts', {
          params: {
            ...params,
            categories: categoryId,
            _embed: true,
            _fields: 'id,title,excerpt,featured_media,date,slug,categories,_embedded'
          }
        })
      ]);

      return {
        ...categoryResponse.data,
        posts: postsResponse.data.map(post => ({
          ...post,
          // Extract featured image from _embedded if available
          featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
        })),
        pagination: {
          total: parseInt(postsResponse.headers['x-wp-total'], 10) || 0,
          totalPages: parseInt(postsResponse.headers['x-wp-totalpages'], 10) || 0,
          currentPage: params.page || 1
        }
      };
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        `Failed to fetch category ${categoryId} with posts`
      );
    }
  },

  /**
   * Get multiple categories with their posts
   * @param {Array} categoryIds - Array of category IDs
   * @param {Object} params - Additional query parameters
   * @returns {Promise} - Array of categories with posts
   */
  getCategoriesWithPosts: async (categoryIds, params = {}) => {
    try {
      // Process in batches to avoid URL length limits
      const batchSize = 5;
      const batches = [];
      
      for (let i = 0; i < categoryIds.length; i += batchSize) {
        const batchIds = categoryIds.slice(i, i + batchSize);
        batches.push(
          Promise.all(
            batchIds.map(id => WordPressService.getCategoryWithPosts(id, params))
          )
        );
      }

      const results = await Promise.all(batches);
      return results.flat();
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch categories with posts'
      );
    }
  },
  getPostsByTag: async (tagId, params = {}) => {
    const response = await WordPressInstance.get(`/wp-json/wp/v2/posts?tags=${tagId}`, {
      params: {
        _embed: true,
        fields: '_embedded',
        ...params
      }
    });
    return response.data;
  },

  getPostsForCategories: async (categoryIds, params = {}) => {
    const idsArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
    const response = await WordPressInstance.get('/wp-json/wp/v2/posts', {
      params: {
        categories: idsArray.join(','),
        page: params.page || 1,
        per_page: params.per_page || 20, // Increased default
        _embed: true,
        // Optional: Order by most recent first
        orderby: 'date',
        order: 'desc'
      }
    });
  
    return {
      posts: response.data,
      pagination: {
        total: parseInt(response.headers['x-wp-total'], 10) || 0,
        totalPages: parseInt(response.headers['x-wp-totalpages'], 10) || 0,
        currentPage: params.page || 1
      }
    };
  },


};

export default WordPressService;