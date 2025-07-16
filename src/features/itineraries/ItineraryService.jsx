import ApiService from "../../services/ApiService";

const itineraryService = {
    getItineraries: async (page = 1) => {
        return ApiService.get(`webroutes/by_city?page=${page}`);
    },
    getItinerariesInCity: async (cityId, page = 1) => {
        const query = [`page=${page}`];
        if (cityId) query.push(`city_id=${cityId}`);
        
        return ApiService.get(`/webroutes?${query.join('&')}`);
    },
    getItinerary: async (itineraryId) => {
        return ApiService.get(`/itineraries/${itineraryId}`);
    },
    getItineraryEvents: async (itineraryId) => {
        return ApiService.get(`/itineraries/${itineraryId}/events`);
    },
    getItineraryDestinations: async (itineraryId) => {
        return ApiService.get(`/itineraries/${itineraryId}/destinations`);
    },
    getItineraryStops: async (itineraryId) => {
        return ApiService.get(`/itineraries/${itineraryId}/stops`);
    },
    getItineraryComments: async (itineraryId) => {
        return ApiService.get(`/itineraries/${itineraryId}/comments`);
    },
    createItinerary: async (itinerary) => {
        return ApiService.post("/itineraries", itinerary);
    },
    updateItinerary: async (itineraryId, itinerary) => {
        return ApiService.put(`/itineraries/${itineraryId}`, itinerary);
    },
    deleteItinerary: async (itineraryId) => {
        return ApiService.delete(`/itineraries/${itineraryId}`);    
    }
};

export default itineraryService;