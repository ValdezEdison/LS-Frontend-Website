// src/utils/helpers.js

// Save token to localStorage
export const setToken = (token) => {
    localStorage.setItem('access_token', token);
  };
  
  // Get token from localStorage
  export const getToken = () => {
    return localStorage.getItem('access_token');
  };
  
 // Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenExpiresAt');
};

// Save tokens from login/refresh response
export const setAuthTokens = (response) => {
  const { access_token, refresh_token, expires_in } = response;
  setToken(access_token);
  localStorage.setItem('refreshToken', refresh_token);
  const expiresAt = new Date().getTime() + (expires_in * 1000);
  localStorage.setItem('tokenExpiresAt', expiresAt.toString());
};

// Check if token is expired
export const isTokenExpired = () => {
  const expiresAt = localStorage.getItem('tokenExpiresAt');
  if (!expiresAt) return true;
  return new Date().getTime() > parseInt(expiresAt);
};
  
  // Handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      error: error.response.data.error || "Unknown error",
      error_description: error.response.data.error_description || "An error occurred. Please try again.",
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      error: "network_error",
      error_description: "Network error. Please check your internet connection.",
    };
  } else {
    // Something happened in setting up the request that triggered an error
    return {
      error: "request_error",
      error_description: "An error occurred while setting up the request.",
    };
  }
};

// Function to store code, flag, and language in localStorage
export const setLanguage = (code, flag, language) => {
  const languageData = {
      code,
      flag,
      language,
  };
  localStorage.setItem('languageData', JSON.stringify(languageData)); // Store as a JSON string
};

// Function to retrieve language data from localStorage
export const getLanguageData = () => {
  const languageData = localStorage.getItem('languageData');
  return languageData ? JSON.parse(languageData) : null; // Parse the JSON string back to an object
};