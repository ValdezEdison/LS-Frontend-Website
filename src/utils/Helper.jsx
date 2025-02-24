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
  export const handleApiError = (error) => {
    console.error('API Error:', error.message || error);
    throw error;
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