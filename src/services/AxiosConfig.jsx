// src/services/AxiosConfig.js
import axios from 'axios';
import { getLanguageData, setToken, getToken, removeToken } from "../utils/Helper";
import config from "../config";
import { login } from '../features/authentication/AuthActions';
import { getClientId, getClientSecret } from "../utils/decryptSecrets";
import { store } from '../app/store';

const ApiInstance = axios.create({
  baseURL: config.api.baseUrl,
});

const CmsInstance = axios.create({
  baseURL: config.api.cmsBaseUrl,
});

const WordPressInstance = axios.create({
  baseURL: config.api.wordPressBaseUrl,
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  // }
});

  const clientId = getClientId();
  const clientSecret = getClientSecret();

const languageData = getLanguageData();
let currentLanguage = languageData?.code || 'es';

export const setCurrentLanguage = (language) => {
  currentLanguage = language;
};

// Token management functions
let refreshTokenRequest = null;

const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const getRememberMe = () => {
  return localStorage.getItem('rememberMe');
}

const setTokens = (accessToken, refreshToken) => {
  setToken(accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  // Store token expiration time (current time + expires_in seconds)
  const expiresAt = new Date().getTime() + (604800 * 1000); // 604800 seconds = 7 days
  localStorage.setItem('tokenExpiresAt', expiresAt.toString());
};

const isTokenExpired = () => {
  const expiresAt = localStorage.getItem('tokenExpiresAt');
  if (!expiresAt) return true;
  return new Date().getTime() > parseInt(expiresAt);
};

const refreshAuthToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    const rememberMe = getRememberMe();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // Only proceed if rememberMe is true
    if (rememberMe !== 'true') {
      removeToken();
      window.location.href = '/login';
      throw new Error('Remember me is not enabled');
    }

    const payload = {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      rememberMe: rememberMe
    };

    // Dispatch the login action with the refresh token payload
    const response = await store.dispatch(login(payload));
    
    // Assuming the login action returns the token data in response.payload
    const { access_token, refresh_token, expires_in } = response.payload;

    // Update tokens in storage
    const storage = localStorage.getItem('access_token') ? localStorage : sessionStorage;
    storage.setItem('access_token', access_token);
    storage.setItem('refreshToken', refresh_token);
    storage.setItem('tokenExpiresAt', new Date().getTime() + (expires_in * 1000));
    
    return access_token;
  } catch (error) {
    removeToken();
    window.location.href = '/login';
    throw error;
  }
};

const configureInstance = (instance, isCmsInstance = false) => {
  instance.interceptors.request.use(
    async (config) => {
      // Skip token check for refresh endpoint to avoid infinite loop
      if (config.url.includes('/auth/refresh')) {
        return config;
      }

      // Get current token and check expiration
      let token = getAccessToken();
      if (token && isTokenExpired()) {
        // If refresh is already in progress, wait for it
        if (refreshTokenRequest) {
          token = await refreshTokenRequest;
        } else {
          try {
            refreshTokenRequest = refreshAuthToken();
            token = await refreshTokenRequest;
            refreshTokenRequest = null;
          } catch (error) {
            refreshTokenRequest = null;
            return Promise.reject(error);
          }
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      }

      config.headers['Accept-Language'] = currentLanguage;
      if (!isCmsInstance) {
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
    async (error) => {
      const originalRequest = error.config;
      
      // If error is 401 and we haven't already retried
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const newToken = await refreshAuthToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest); // Retry the original request
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
};

const configureWordPressInstance = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      // WordPress-specific request transformations
      if (config.params?._embed) {
        config.params = {
          ...config.params,
          _embed: true // Ensure proper formatting for WP REST API
        };
      }
      
      config.headers['Accept-Language'] = currentLanguage;
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      // Transform WordPress response data if needed
      if (Array.isArray(response.data)) {
        response.data = response.data.map(post => ({
          ...post,
          featuredMedia: post._embedded?.['wp:featuredmedia']?.[0]
        }));
      }
      return response;
    },
    (error) => Promise.reject(error)
  );
};

configureInstance(ApiInstance);
configureInstance(CmsInstance, true);
configureWordPressInstance(WordPressInstance);

const initializeAxiosInterceptors = (dispatch) => {
  configureInstance(ApiInstance, dispatch);
  configureInstance(CmsInstance, dispatch, true);
  configureWordPressInstance(WordPressInstance);
};

export { ApiInstance, CmsInstance, WordPressInstance, initializeAxiosInterceptors };