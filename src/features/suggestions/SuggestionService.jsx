import ApiService from "../../services/ApiService";

const SuggestionService = {

    getSuggestedPlaces: async (page, latitude, longitude, type, cityId) => {

        const params = new URLSearchParams();
        
        // Required parameter
        params.append('page', page);

        // Optional parameters (only append if they exist)
        if (type) params.append('type', type);
        if (latitude && longitude) {
            params.append('latitude', latitude);
            params.append('longitude', longitude);
        }
        if (cityId) params.append('city_id', cityId);

        return ApiService.get(`/sites/suggested?${params.toString()}`);
    },

};

export default SuggestionService;