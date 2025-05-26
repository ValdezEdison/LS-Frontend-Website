import ApiService from "../../../../services/ApiService";

const tagsService = {
    getTags: (tagId, cityId, page) =>{

        return ApiService.get(`/users/tags/${tagId}/routes_and_sites?city_id=${cityId}&page=${page}`)
    },
    getEventsOrPlacesByTag: (type, tagId, cityId, page=1) => {
        return ApiService.get(`/sites?type=${type}&city_id=${cityId}&tag=${tagId}&page=${page}`)
    },
    getItinerariesByTag: (tagId, cityId, page) => {
        return ApiService.get(`/routes?city_id=${cityId}&tag=${tagId}&page=${page}`);
    }
}

export default tagsService