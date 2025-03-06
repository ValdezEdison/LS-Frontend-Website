import apiService from "../../services/ApiService";

const PlaceService = {
    getPlaces: async () => {
        return apiService.get('/sites/sites_to_discover?page=1');
    },
    getPlace: async (placeId) => {
        return apiService.get(`/places/${placeId}`);
    },

    getPlacesByCityId: async (cityId, page = 1, preview = 1, country = null) => {
        let url = '/sites/?type=place&city_id=' + cityId + '&page=' + page + '&preview=' + preview;
        if (country) {
            url += '&country=' + encodeURIComponent(country);
        }
        return apiService.get(url);
    },

    getGeoLocations: async (cityId, type) => {
        return apiService.get(`/sites/geolocations?city_id=${cityId}&type=${type}`);
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