import apiService from "../../../services/ApiService";

const PlaceService = {
    getPlaces: async () => {
        return apiService.get('/sites/sites_to_discover?page=1');
    },
    getPlace: async (placeId) => {
        return apiService.get(`/places/${placeId}`);
    },
    createPlace: async (placeData) => {
        return apiService.post('/places', placeData);
    },
    updatePlace: async (placeId, placeData) => {
        return apiService.put(`/places/${placeId}`, placeData);
    },
    deletePlace: async (placeId) => {
        return apiService.delete(`/places/${placeId}`);
    },
};

export default PlaceService;