import apiService from "../../services/ApiService";
import { generateLink } from "./PlaceAction";

const PlaceService = {
  getPlaces: async () => {
    return apiService.get('/sites/sites_to_discover?page=1');
  },
  getPlace: async (placeId) => {
    return apiService.get(`/sites/${placeId}`);
  },

  getPlacesByCityId: async (cityId, page = 1, preview = 1, country = null, avg_rating = "", categories = "", levels = "", subcategories, points) => {
    let url = `/sites/?type=place&city_id=${cityId}&page=${page}&preview=${preview}`;
    if(cityId) {
      url += `&city_id=${encodeURIComponent(cityId)}`;
    }
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
    if (subcategories) {
      url += `&levels=${encodeURIComponent(subcategories)}`;
    }
    if (points) {
      url += `&${points}`; // Just append the already encoded points string
    }


    return apiService.get(url);
  },


  getGeoLocations: async (
    cityId,
    type,
    country,
    page,
    preview,
    avg_rating,
    categories,
    levels,
    subcategories,
    // points = [] // Accept points as an array
  ) => {
    let url = '/sites/geolocations?';

    // Add parameters to the URL
    if (cityId !== undefined && cityId !== null && cityId !== "") url += `city_id=${encodeURIComponent(cityId)}&`;
    if (type !== undefined && type !== null && type !== "") url += `type=${encodeURIComponent(type)}&`;
    if (country !== undefined && country !== null && country !== "") url += `country=${encodeURIComponent(country)}&`;
    if (page !== undefined && page !== null && page !== "") url += `page=${encodeURIComponent(page)}&`;
    if (preview !== undefined && preview !== null && preview !== "") url += `preview=${encodeURIComponent(preview)}&`;
    if (avg_rating !== undefined && avg_rating !== null && avg_rating !== "") url += `avg_rating=${encodeURIComponent(avg_rating)}&`;
    if (categories !== undefined && categories !== null && categories !== "") url += `categories=${encodeURIComponent(categories)}&`;
    if (levels !== undefined && levels !== null && levels !== "") url += `levels=${encodeURIComponent(levels)}&`;
    if (subcategories !== undefined && subcategories !== null && subcategories !== "") url += `levels=${encodeURIComponent(subcategories)}&`;

    // Append points as separate query parameters
    // if (points && points.length > 0) {
    //   points.forEach(point => {
    //     if (point !== undefined && point !== null && point !== "") {
    //       url += `points=${encodeURIComponent(point)}&`;
    //     }
    //   });
    // }

    // Remove the trailing '&' or '?' if no parameters were added
    url = url.replace(/[&?]$/, '');

    return apiService.get(url);
  },

  getPlaceComments: async (placeId) => {
    return apiService.get(`/sites/${placeId}/comments`);
  },

  getNearbyPlaces: async (placeId, page = 1) => {
    return apiService.get(`/sites/${placeId}/nearby?page=${page}`);
  },

  getPlacesFilterCategories: async (page = 1, type = "place", cityId) => {
    const params = {};
    if (cityId !== undefined && cityId !== null && cityId !== "") params.city_id = cityId;
    if (type !== undefined && type !== null && type !== "") params.type = type;
    if (page !== undefined && page !== null && page !== "") params.page = page;
    return apiService.get('/sites/categories', { params });
  },

  toggleFavorite: async (placeId) => {
    return apiService.post(`/sites/${placeId}/check_fav`);
  },

  addComment: async (placeId, commentData) => {
    return apiService.post(`/sites/${placeId}/comment`, commentData);
  },

  editComment: async ( commentId, commentData) => {
    return apiService.patch(`/sites/comments/${commentId}`, commentData);
  },

  deleteComment: async (commentId) => {
    return apiService.delete(`/sites/comments/${commentId}`);
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
  generateLink: async (placeId) => {  
    return apiService.get(`/sites/${placeId}/generate_link`);
  },
};

export default PlaceService;