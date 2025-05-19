import ApiService from "../../services/ApiService";

const SuggestionService = {

    getSuggestedPlaces: async (page, latitude, longitude, type) => {

        if (!latitude || !longitude) {
            return ApiService.get(`/sites/suggested?page=${page}&type=${type}`);
        }else {
            return ApiService.get(`/sites/suggested?page=${page}&latitude=${latitude}&longitude=${longitude}&type=${type}`);
        }
    },

};

export default SuggestionService;