import ApiService from "../../../../services/ApiService";

const itineraryService = {

    getItineriesInCityId: async (cityId, page=1) => {
        const params = {}
        if (cityId !== undefined && cityId !== null && cityId !== "") params.city_id = cityId;
        if (page !== undefined && page !== null && page !== "") params.page = page;
        return ApiService.get('/routes/', {params});
    },

    getItineraryDetails: async (routeId) => {
        return ApiService.get(`/routes/${routeId}`);
    },

    getTravelLiteList: async () => {
        return ApiService.get(`travels/list_lite`);
    },

    getTravelTime: async (travelId, mode) => {
        const params = {}
        if (mode !== undefined && mode !== null && mode !== "") params.mode = mode;
        return ApiService.get(`routes/${travelId}/directions`, {params});
    },

    addTrip: async (trip) => {
        return ApiService.post('/travels/', trip);
    },

    generateLink: async (tripId) => {
        return ApiService.get(`/routes/${tripId}/generate_link`);
    },

    downloadTrip: async (tripId) => {
        return ApiService.get(`/routes/${tripId}/pdf`);
    },
    getStops: async (cityId, type = "place", page = 1) => {
        const encodedCityId = encodeURIComponent(cityId);
        return ApiService.get(`/sites/?type=${type}&city_id=${encodedCityId}&page=${page}`);
    },

}

export default itineraryService