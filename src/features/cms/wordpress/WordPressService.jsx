import { WordPressInstance } from "../../../services/AxiosConfig";

const WordPressService = {
  /**
   * Get posts from WordPress
   * @param {Object} params - Query parameters
   * @returns {Promise} - Response with posts and headers
   */
  getPosts: async (params = {}) => {
    const defaultParams = {
      _embed: true,       // Always embed linked resources
      per_page: 4,       // Default to 4 posts per page (matches your API example)
    //   page: 1,           // Default to first page
    //   _fields: [
    //     'id',
    //     'title',
    //     'excerpt',
    //     'slug',
    //     'date',
    //     'modified',
    //     'status',
    //     'type',
    //     'featured_media',
    //     'categories',
    //     'tags',
    //     '_links',
    //     '_embedded'
    //   ].join(',')
    };
  
    try {
      const response = await WordPressInstance.get('/wp-json/wp/v2/posts', {
        params: {
          ...defaultParams,
          ...params,
          // Ensure _embed is always true unless explicitly disabled
          _embed: params._embed === false ? false : true
        },
    
      });
  
      // Transform the response data
      const transformedData = response.data.map(post => ({
        id: post.id,
        title: post.title?.rendered || '',
        excerpt: post.excerpt?.rendered || '',
        slug: post.slug,
        date: post.date,
        modified: post.modified,
        featuredMedia: post._embedded?.['wp:featuredmedia']?.[0],
        categories: post._embedded?.['wp:term']?.[0] || [],
        tags: post._embedded?.['wp:term']?.[1] || []
      }));
  
      return {
        posts: transformedData,
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
  getCategories: async () => {
    const response = await WordPressInstance.get('/categories', {
      params: {
        per_page: 100,
        _fields: 'id,name,slug,count'
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
    const response = await WordPressInstance.get(`/media/${id}`);
    return response.data;
  }
};

export default WordPressService;