// src/utils/helpers.js

// Save token to localStorage
export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Get token from localStorage
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Remove token from localStorage
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  // Handle API errors
// src/utils/handleApiError.js
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