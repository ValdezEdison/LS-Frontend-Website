import apiService from "../../services/ApiService";

const PlaceService = {
    getPlaces: async () => {
        return apiService.get('/sites/sites_to_discover?page=1');
    },
    getPlace: async (placeId) => {
        return apiService.get(`/sites/${placeId}`);
    },

    getPlacesByCityId: async (cityId, page = 1, preview = 1, country = null, avg_rating = "", categories = "", levels = "") => {
        let url = `/sites/?type=place&city_id=${cityId}&page=${page}&preview=${preview}`;
        
        if (country) {
            url += `&country=${encodeURIComponent(country)}`;
        }
        if (avg_rating) {
            url += `&avg_rating=${encodeURIComponent(avg_rating)}`;
        }
        if (categories) {
            url += `&categories=${encodeURIComponent(categories)}`;
        }
        if (levels) {
            url += `&levels=${encodeURIComponent(levels)}`;
        }
        
        return apiService.get(url);
    },
    

    getGeoLocations: async (cityId, type) => {
        return apiService.get(`/sites/geolocations?city_id=${cityId}&type=${type}`);
    },

    getPlaceComments: async (placeId) => {
        return apiService.get(`/sites/${placeId}/comments`);
    },

    getNearbyPlaces: async (placeId, page=1) => {
        return apiService.get(`/sites/${placeId}/nearby?page=${page}`);
    },

    getPlacesFilterCategories: async (page=1, type="place", cityId) => { 
        return apiService.get('/sites/categories?page=' + page + '&type=' + type + '&city_id=' + cityId); 
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