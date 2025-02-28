// src/services/axiosConfig.js
import axios from 'axios';
import { getLanguageData } from "../utils/Helper";
console.log(import.meta.env.VITE_NAME, 'import.meta.env.VITE_NAME');
const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: import.meta.env.VITE_API_BASE_URL_LOCAL,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
});

const languageData = getLanguageData();

// Global variable to store the current language
let currentLanguage = languageData?.code || 'es'; // Default language


// Function to update the current language
export const setCurrentLanguage = (language) => {
  currentLanguage = language;
};


// Request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    config.headers['Accept-Language'] = currentLanguage;
    // config.headers['language'] = currentLanguage;
    // config.headers['X-Platform'] = '1';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;