// src/features/auth/authService.js
import apiService from '../../services/ApiService';

const authService = {
  login: async (credentials) => {
    return apiService.post('/auth/token', credentials);
  },

  register: async (userData) => {
    return apiService.post('/users/create', userData);
  },

  getProfile: async () => {
    return apiService.get('/users/me');
  },

  logout: async () => { 
    return apiService.post('/users/logout');
  }
};

export default authService; 