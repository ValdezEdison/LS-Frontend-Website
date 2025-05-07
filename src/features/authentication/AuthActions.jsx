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
    return null;
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
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail(email);
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