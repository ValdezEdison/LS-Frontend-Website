import apiService from "../../services/ApiService";

const eventService = {
    getEvents: async (params) => {
        const { 
            type, 
            page, 
            cityId, 
            categories, 
            subcategories, 
            levels, 
            startDate, 
            endDate,
            keyword,
            sortBy
        } = params;
        
        let url = `/sites?type=${type}&page=${page}`;
        
        if (cityId) url += `&city_id=${cityId}`;
        if (categories) url += `&categories=${categories}`;
        if (subcategories) url += `&subcategories=${subcategories}`;
        if (levels) url += `&levels=${levels}`;
        if (startDate) url += `&first_date=${startDate}`;
        if (endDate) url += `&last_date=${endDate}`;
        if (keyword) url += `&keyword=${keyword}`;
        if (sortBy) url += `&sort_by=${sortBy}`;
        
        return apiService.get(url);
    },
    getEvent: async (eventId) => {
        return apiService.get(`/events/${eventId}`);
    },
    createEvent: async (eventData) => {
        return apiService.post('/events', eventData);
    },
    updateEvent: async (eventId, eventData) => {
        return apiService.put(`/events/${eventId}`, eventData);
    },
    deleteEvent: async (eventId) => {
        return apiService.delete(`/events/${eventId}`);
    },

    getNearMeEvents: async (page = 1, lat, lng, type = "event", categories, subcategories, levels, radius, startDate, endDate, sortBy) => {
        // return apiService.get(`/sites/near-me?latitude=${lat}&longitude=${lng}&page=${page}&type=${type}`);
        const params = {
            latitude: lat,
            longitude: lng,
            page: page,
            type: type
        };
    
        // Add optional parameters only if they exist
        if (categories) params.categories = categories;
        if (subcategories) params.subcategories = subcategories;
        if (levels) params.levels = levels;
        if (radius) params.radius = radius;
        if (startDate) params.initial_date = startDate;
        if (endDate) params.end_date = endDate;
        if (sortBy) params.sort_by = sortBy;
    
        // Convert params to query string
        const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
    
        return apiService.get(`/sites/near-me?${queryString}`);
    },

    getEventsSearchResults: async (page = 1, type, keyword) => {
        return apiService.get(`/sites/search/sites/${type}/${keyword}`);
    },
};

export default eventService;
