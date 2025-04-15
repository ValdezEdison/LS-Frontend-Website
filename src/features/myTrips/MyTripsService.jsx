import ApiService from "../../services/ApiService";

const MyTripsService = {
    getMyFutureTrips: async (page) => {
        return ApiService.get('/travels/upcoming?page=' + page);
    },
    getMyPastTrips: async (page) => {
        return ApiService.get('/travels/history?page=' + page);
    }
};

export default MyTripsService;