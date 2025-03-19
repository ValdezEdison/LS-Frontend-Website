import ApiService from "../../../../services/ApiService";

const itineraryService = {

    getItineriesInCityId: async (cityId, page=1) => {
        const params = {}
        if (cityId !== undefined && cityId !== null && cityId !== "") params.city_id = cityId;
        if (page !== undefined && page !== null && page !== "") params.page = page;
        return ApiService.get('/routes/', {params});
    },

}

export default itineraryService