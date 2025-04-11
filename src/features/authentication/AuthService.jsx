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
  },
  forgotPassword: async (email) => {
    return apiService.post('/users/create/restore_password', { email });
  },  

  verifyEmail: async (email) => {
    return apiService.post('/users/verify', { email });
  },

  resendVerificationMail: async (email) => {
    return apiService.post('users/verification-email', { email });
  },
};

export default authService; 