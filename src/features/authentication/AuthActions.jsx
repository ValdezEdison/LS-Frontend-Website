// src/features/auth/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from './AuthService';
import { setToken, removeToken, handleApiError } from '../../utils/Helper';

// Login user
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials);
    setToken(response.token); // Save token to localStorage
    return response;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

// Register user
export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData);
    setToken(response.token); // Save token to localStorage
    return response;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

// Fetch user profile
export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await authService.getProfile();
    return response;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    removeToken(); // Remove token from localStorage
    return null;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});