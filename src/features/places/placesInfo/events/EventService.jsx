import ApiService from "../../../../services/ApiService";

const eventService = {
    getEventsByCityId: async (cityId, page = 1, preview = 1, type, levels, points, startDate, endDate) => {
      const params = {};
      if (cityId !== undefined && cityId !== null && cityId !== "") params.city_id = cityId;
      if (page !== undefined && page !== null && page !== "") params.page = page;
      if (preview !== undefined && preview !== null && preview !== "") params.preview = preview;
      if (type !== undefined && type !== null && type !== "") params.type = type;
      if (levels !== undefined && levels !== null && levels !== "") params.levels = levels;
      if (startDate) params.first_date = startDate;
      if (endDate) params.last_date = endDate;

      let url = '/sites/';
      if (points) {
          // Ensure points starts with '?' or '&' as needed
          const separator = url.includes('?') ? '&' : '?';
          url += `${separator}${points}`;
      }

      return ApiService.get(url, { params });
    },
  };

export default eventService;
