import ApiService from "../../services/ApiService";

const itineraryService = {
    getItineraries: async (page = 1) => {
        return ApiService.get(`/routes/by_city?page=${page}`);
    },
    getItinerariesInCity: async (cityId, page = 1) => {
        return ApiService.get(`/routes?city_id=${cityId}&page=${page}`);
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