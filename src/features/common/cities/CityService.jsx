import ApiService from "../../../services/ApiService";

const CityService = {
    getCities: async (countryId, searchQuery = "") => {
        const params = {};

        if (countryId) {
            params.country_id = countryId;
        }

        if (searchQuery) {
            params.name = searchQuery;
        }

        return ApiService.get("/cities/", { params });
    },
};

export default CityService;