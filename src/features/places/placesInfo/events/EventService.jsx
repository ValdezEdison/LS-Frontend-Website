import ApiService from "../../../../services/ApiService";

const eventService = {
    getEventsByCityId: async (cityId, page = 1, preview = 1, type) => {
      const params = {};
      if (cityId !== undefined && cityId !== null && cityId !== "") params.city_id = cityId;
      if (page !== undefined && page !== null && page !== "") params.page = page;
      if (preview !== undefined && preview !== null && preview !== "") params.preview = preview;
      if (type !== undefined && type !== null && type !== "") params.type = type;
  
      return ApiService.get('/sites/', { params });
    },
  };

export default eventService;
