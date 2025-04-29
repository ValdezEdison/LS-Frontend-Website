import ApiService from "../../services/ApiService";

const FavoritesService = {
    getFavorites: async (page, keyword, filters = {}) => {
        const queryParams = [];
        
        // Handle page parameter
        if (page) {
            queryParams.push(`page=${page}`);
        }
        
        // Handle keyword parameter
        if (keyword) {
            queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
        }
        
        // Handle filter parameters
        if (filters.city) {
            queryParams.push(`city=${encodeURIComponent(filters.city)}`);
        }
        if (filters.type) {
            queryParams.push(`type=${encodeURIComponent(filters.type)}`);
        }
        if (filters.level_id) {
            queryParams.push(`levels=${encodeURIComponent(filters.level_id)}`);
        }
        if (filters.category_id) {
            queryParams.push(`categories=${encodeURIComponent(filters.category_id)}`);
        }
        if (filters.subcategory_id) {
            queryParams.push(`subcategories=${encodeURIComponent(filters.subcategory_id)}`);
        }
        
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        return ApiService.get(`/sites/favorites${queryString}`);
    },
    toggleFavorite: async (placeId) => {
        return ApiService.post(`/sites/${placeId}/check_fav`);
      },
   
}

export default FavoritesService;