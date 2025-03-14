import apiService from "../../../../services/ApiService";

const DestionationService = {
    getDestinationInfo: async (cityId) => {
        return apiService.get(`/cities/${cityId}`);
    },
}

export default DestionationService