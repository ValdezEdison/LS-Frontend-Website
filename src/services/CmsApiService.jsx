// src/services/CmsServices.js
import { CmsInstance } from './AxiosConfig';

const CmsApiService = {
  get: async (url, config = {}) => {
    try {
      const response = await CmsInstance.get(url, config);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const response = await CmsInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },

  put: async (url, data, config = {}) => {
    try {
      const response = await CmsInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await CmsInstance.delete(url, config);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },
};

export default CmsApiService;