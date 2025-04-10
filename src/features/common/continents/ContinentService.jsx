import ApiService from "../../../services/ApiService";

const ContinentService = {
    getContinents: async () => {
        return ApiService.get("/cities/continent");
    },
};

export default ContinentService;