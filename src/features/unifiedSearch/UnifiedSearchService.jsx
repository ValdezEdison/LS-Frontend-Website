import ApiService from "../../services/ApiService";

const UnifiedSearchService = {
  
    getUnifiedSearchResults: async (keyword) => {
        return ApiService.get(`/sites/unified-search/search?keyword=${keyword}`);
    },
};

export default UnifiedSearchService;