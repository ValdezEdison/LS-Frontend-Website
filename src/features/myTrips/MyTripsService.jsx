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
    },
    getSimilarStops: async (page, tripId) => {
        return ApiService.get('/travels/' + tripId + '/similar_stops?page=' + page);
    },
    getTravelTime: async ({ travelId, mode }) => {
        return ApiService.get('/travels/' + travelId + '/directions?mode=' + mode);
    }
};

export default MyTripsService;