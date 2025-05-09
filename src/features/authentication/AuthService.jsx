// src/features/auth/authService.js
import { update } from 'lodash';
import apiService from '../../services/ApiService';
import { updateProfile } from './AuthActions';

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

  updateProfile: async (userData) => {
    return apiService.patch('/users/me', userData);
  },
  updateProfilePicture: async (userData) => {
    return apiService.post('/users/update_pfp', userData);
  },

  changePassword: async (userData) => {
    return apiService.post('/users/reset_password', userData);
  },
  deleteAccount: async () => {
    return apiService.delete('/users/me');
  },
  usersGroups: async () => {
    return apiService.get('/users/groups');
  },

  updateUserLanguage : async (language) => {
    return apiService.post('/users/language', { lang_id: language });
  },

  saveSuggestions : async (suggestions) => {
    return apiService.post('/users/suggestions', { suggestions });
  },
};

export default authService; 