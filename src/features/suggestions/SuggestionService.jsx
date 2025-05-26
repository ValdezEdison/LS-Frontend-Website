import ApiService from "../../services/ApiService";

const SuggestionService = {

    getSuggestedPlaces: async (page, latitude, longitude, type, id) => {

        const params = new URLSearchParams();
        
        // Required parameter
        params.append('page', page);

        // Optional parameters (only append if they exist)
        if (type) params.append('type', type);
        if (latitude && longitude) {
            params.append('latitude', latitude);
            params.append('longitude', longitude);
        }

        return ApiService.get(`/sites/suggested?${params.toString()}`);
    },

};

export default SuggestionService;