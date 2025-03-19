import ApiService from "../../../../services/ApiService";

const placesService = {
    getPlacesInCity: async (cityId,page=1, type="place") => {
        const params = {}
        if (cityId !== undefined && cityId !== null && cityId !== "") params.city_id = cityId;
        if (page !== undefined && page !== null && page !== "") params.page = page;
        if (type !== undefined && type !== null && type !== "") params.type = type;
        return ApiService.get(`/sites/`, {params});
    },
}

export default placesService