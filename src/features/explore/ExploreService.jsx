import ApiService from "../../services/ApiService";

const ExploreService = {

    getCitiesInContinent: async (continentId) => {
        return ApiService.get("/cities?continent_id=" + continentId);
    }
};

export default ExploreService