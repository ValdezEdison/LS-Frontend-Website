// src/services/apiService.js
import { ApiInstance } from './AxiosConfig';

const ApiService = {
  get: async (url, config = {}) => {
    try {
      const response = await ApiInstance.get(url, config);
      return response.data;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const response = await ApiInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  },

  put: async (url, data, config = {}) => {
    try {
      const response = await ApiInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  },

  patch: async (url, data, config = {}) => {
    try {
      const response = await ApiInstance.patch(url, data, config);
      return response.data;
    } catch (error) {
      console.error('PATCH request failed:', error);
      throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await ApiInstance.delete(url, config);
      return response.data;
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  },
};

export default ApiService;