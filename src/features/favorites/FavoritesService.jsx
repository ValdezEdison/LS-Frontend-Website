import ApiService from "../../services/ApiService";

const FavoritesService = {
    getFavorites: async (page, keyword) => {
        if(keyword) {
            return ApiService.get(`/sites/favorites?keyword=${encodeURIComponent(keyword)}`);
        }
        if(page) {
            return ApiService.get(`/sites/favorites?page=${page}`);
        }
        return ApiService.get('/sites/favorites');
    },
    toggleFavorite: async (placeId) => {
        return ApiService.post(`/sites/${placeId}/check_fav`);
      },
   
}

export default FavoritesService;