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
          // _embed: params._embed === false ? false : true
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
      params
    });
    return response.data;
  },

  /**
   * Get media by ID
   * @param {number} id - Media ID
   * @returns {Promise} - Media object
   */
  getMedia: async (id) => {
    const response = await WordPressInstance.get(`/media/${id}`);
    return response.data;
  },
  getPostsByCategory: async (params) => {
    const { categoryId, page = 1, perPage = 10 } = params;
    const response = await WordPressInstance.get('/wp-json/wp/v2/posts', {
      params: {
        categories: categoryId,
        page,
        per_page: perPage,
        // _embed: true
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
  }
};

export default WordPressService;