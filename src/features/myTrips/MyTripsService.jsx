import ApiService from "../../services/ApiService";

const MyTripsService = {
    getMyFutureTrips: async (page) => {
        return ApiService.get('/travels/upcoming?page=' + page);
    },
    getMyPastTrips: async (page) => {
        return ApiService.get('/travels/history?page=' + page);
    },
    getTripDetails: async (tripId) => {
        return ApiService.get('/travels/' + tripId);
    }
};

export default MyTripsService;