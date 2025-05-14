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
    },
    updateTrip: async (tripId, tripData) => {
        return ApiService.patch('/travels/' + tripId, tripData);
    },
    updateStops: async (tripId, sites) => {
        return ApiService.patch('/travels/' + tripId + '/update_stops', { sites: sites });
    },
    deleteTrip: async (tripId) => {
        return ApiService.delete('/travels/' + tripId);
    },
    updateCities: async (tripId, cities) => {
        return ApiService.patch('/travels/' + tripId + '/update_cities', { cities: cities });
    },
    downloadTrip: async (tripId) => {
        return ApiService.get('/travels/' + tripId + '/pdf');
    }

};

export default MyTripsService;