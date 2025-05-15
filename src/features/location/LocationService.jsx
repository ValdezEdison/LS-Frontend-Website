import ApiService from "../../services/ApiService";
import { updateLocationSettings } from "./LocationAction";

const LocationService = {
    getLocationSettings: async () => {
        return ApiService.get('/users/location_settings');
    },
    updateLocation: async (location) => {
        return ApiService.post('/users/update_location', location);
    },

    updateLocationSettings: async (data) => {
        return ApiService.post('/users/update_location_settings', data);
    },
  
};

export default LocationService;