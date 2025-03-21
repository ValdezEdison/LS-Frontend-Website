import ApiService from "../../../../services/ApiService";

const placesService = {
    getPlacesInCity: async (cityId, page = 1, type = "place", levels = null, categories = null, subcategories = null) => {
        const params = {};
        if (cityId !== undefined && cityId !== null && cityId !== "") params.city_id = cityId;
        if (page !== undefined && page !== null && page !== "") params.page = page;
        if (type !== undefined && type !== null && type !== "") params.type = type;
        if (levels !== undefined && levels !== null && levels !== "") params.levels = levels;
        if (categories !== undefined && categories !== null && categories !== "") params.categories = categories;
        if (subcategories !== undefined && subcategories !== null && subcategories !== "") params.subcategories = subcategories;
        return ApiService.get(`/sites/`, { params });
    },
};

export default placesService