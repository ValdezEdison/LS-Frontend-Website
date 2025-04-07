import apiService from "../../services/ApiService";

const eventService = {
    getEvents: async (type, page) => {
        return apiService.get(`/sites?type=${type}&page=${page}`);
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
