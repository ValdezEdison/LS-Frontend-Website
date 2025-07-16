// src/features/places/placesInfo/destination/DestinationService.jsx
import apiService from "../../../../services/ApiService";

const DestionationService = {
    getDestinationInfo: async (cityId) => {
        return apiService.get(`/cities/${cityId}`);
    },
    getEventsByCity: async (cityId) => {
    return apiService.get(`/cities/${cityId}/events`);
    },
    
    getPlacesByCity: async (cityId) => {
        return apiService.get(`/cities/${cityId}/places`);
    },
    
    getItinerariesByCity: async (cityId) => {
        return apiService.get(`/cities/${cityId}/itineraries`);
    },
    
    // Add methods to handle itinerary details by slug
    getItineraryBySlug: async (slug) => {
        return apiService.get(`/webroutes/${slug}`);
    },
}

export default DestionationService