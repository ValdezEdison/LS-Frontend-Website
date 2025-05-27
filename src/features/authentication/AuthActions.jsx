// src/features/auth/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from './AuthService';
import { setAuthTokens, removeToken, handleApiError, setAuthUser } from '../../utils/Helper';

// Login user
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials);
    setAuthTokens(response, credentials.rememberMe);// Save token to localStorage
    return response;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

// Register user
export const register = createAsyncThunk('users/create', async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData);
    // setAuthTokens(response, false); // Default to session-only for new registrations
    return response;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

// Fetch user profile
export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await authService.getProfile();
    setAuthUser(response);
    return response;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await authService.logout();
    removeToken(); // Remove token from localStorage
    return response;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(email);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({email, timeStamp}, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail(email, timeStamp);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);

export const resendVerificationMail = createAsyncThunk(
  'auth/resendVerificationMail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.resendVerificationMail(email);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(userData);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);

export const updateProfilePicture = createAsyncThunk(
  'auth/updateProfilePicture',
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    try {
      const response = await authService.updateProfilePicture(formData);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);


export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await authService.changePassword(passwordData);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);

export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.deleteAccount();
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);


export const fetchUsersGroups = createAsyncThunk(
  'auth/fetchUsersGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.usersGroups();
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);

export const updateUserLanguage = createAsyncThunk(
  'auth/updateUserLanguage',
  async (language, { rejectWithValue }) => {
    try {
      const response = await authService.updateUserLanguage(language);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);

export const saveSuggestions = createAsyncThunk(
  'auth/saveSuggestions',
  async (suggestions, { rejectWithValue }) => {
    try {
      const response = await authService.saveSuggestions(suggestions);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);


export const saveNotificationPreferences = createAsyncThunk(
  'auth/saveNotificationPreferences',
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await authService.saveNotificationPreferences(preferences);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);

export const fetchNotificationPreferences = createAsyncThunk(
  'auth/fetchNotificationPreferences',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getNotificationPreferences();
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    } 
  }
);