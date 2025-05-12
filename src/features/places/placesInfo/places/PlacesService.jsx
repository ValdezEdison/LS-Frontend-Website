import ApiService from "../../../../services/ApiService";

const placesService = {
    getPlacesInCity: async (cityId, page = 1, type = "place", levels = null, categories = null, subcategories = null, points, preview) => {
        const params = {};
        if (cityId !== undefined && cityId !== null && cityId !== "") params.city_id = cityId;
        if (page !== undefined && page !== null && page !== "") params.page = page;
        if (type !== undefined && type !== null && type !== "") params.type = type;
        if (levels !== undefined && levels !== null && levels !== "") params.levels = levels;
        if (categories !== undefined && categories !== null && categories !== "") params.categories = categories;
        if (subcategories !== undefined && subcategories !== null && subcategories !== "") params.subcategories = subcategories;
        if (preview !== undefined && preview !== null && preview !== "") params.preview = 1;
        let url = '/sites/';
        if (points) {
            // Ensure points starts with '?' or '&' as needed
            const separator = url.includes('?') ? '&' : '?';
            url += `${separator}${points}`;
        }

        return ApiService.get(url, { params });
    },
};

export default placesService