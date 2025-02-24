// src/services/apiService.js
import AxiosInstance from './AxiosConfig';

const ApiService = {
  get: async (url, config = {}) => {
    try {
      const response = await AxiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const response = await AxiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  },

  put: async (url, data, config = {}) => {
    try {
      const response = await AxiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await AxiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  },
};

export default ApiService;