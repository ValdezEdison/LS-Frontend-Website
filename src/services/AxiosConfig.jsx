// src/services/AxiosConfig.js
import axios from 'axios';
import { getLanguageData } from "../utils/Helper";
import config from "../config";
console.log(config.api.cmsBaseUrl, 'config.api.cmsBaseUrl');
const ApiInstance = axios.create({
  baseURL: config.api.baseUrl,
});

const CmsInstance = axios.create({
  
  baseURL: config.api.cmsBaseUrl,
});

const languageData = getLanguageData();
let currentLanguage = languageData?.code || 'es';

export const setCurrentLanguage = (language) => {
  currentLanguage = language;
};

const configureInstance = (instance, isCmsInstance = false) => {
  console.log(instance, 'instance');
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      }

      config.headers['Accept-Language'] = currentLanguage;
      if(!isCmsInstance){
        config.headers['language'] = currentLanguage;
      }
      

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
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
};

configureInstance(ApiInstance);
configureInstance(CmsInstance, true); 

export { ApiInstance, CmsInstance };