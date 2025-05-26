import ApiService from "../../../../services/ApiService";

const tagsService = {
    getTags: (tagId, cityId, page) =>{

        return ApiService.get(`/users/tags/${tagId}/routes_and_sites?city_id=${cityId}&page=${page}`)
    } 
}

export default tagsService