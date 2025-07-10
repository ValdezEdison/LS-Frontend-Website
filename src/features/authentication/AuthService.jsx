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

  verifyEmail: async (email, timeStamp) => {
    return apiService.post('/users/verify', { email, timeStamp });
  },

  resendVerificationMail: async (email) => {
    return apiService.post('users/verification-email', { email });
  },

  // New Method: Send Contact Form
  sendContactForm: async (formData) => {
    return apiService.post('/contact-form/', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  // New Method: Signup Newsletter
  signupNewsletter: async (email, gdprConsent) => {
    return apiService.post('/newsletter/subscribe/', { email, gdpr_consent: gdprConsent }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

  saveNotificationPreferences : async (preferences) => {
    return apiService.patch('/users/notification-preference',  preferences );
  },

  getNotificationPreferences : async () => {
    return apiService.get('/users/notification-preference');
  },
};

export default authService; 