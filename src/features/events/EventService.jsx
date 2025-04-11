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
            endDate 
        } = params;
        
        let url = `/sites?type=${type}&page=${page}`;
        
        if (cityId) url += `&cityId=${cityId}`;
        if (categories) url += `&categories=${categories}`;
        if (subcategories) url += `&subcategories=${subcategories}`;
        if (levels) url += `&levels=${levels}`;
        if (startDate) url += `&startDate=${startDate}`;
        if (endDate) url += `&endDate=${endDate}`;
        
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
};

export default eventService;
