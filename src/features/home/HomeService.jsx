import ApiService from "../../services/ApiService";

const HomeService = {
    getRandomPlaces: async (page = 1) => {
        return ApiService.get("/sites/random" + "?page=" + page);
    },
};

export default HomeService;