import ApiService from "../../services/ApiService";

const ExploreService = {

    getCitiesInContinent: async (continentId, page) => {
        return ApiService.get("/cities?continent_id=" + continentId + "&page=" + page);
    }
};

export default ExploreService