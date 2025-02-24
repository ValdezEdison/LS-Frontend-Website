// src/features/auth/authService.js
import apiService from '../../services/ApiService';

const authService = {
  login: async (credentials) => {
    return apiService.post('/auth/login', credentials);
  },

  register: async (userData) => {
    return apiService.post('/auth/register', userData);
  },

  getProfile: async () => {
    return apiService.get('/auth/profile');
  },
};

export default authService;