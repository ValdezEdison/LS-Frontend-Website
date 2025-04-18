// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { login, register, getProfile, logout, forgotPassword, verifyEmail, resendVerificationMail } from "./AuthActions";
const userToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
const authUser = JSON.parse(localStorage.getItem('authUser'));
const initialState = {
  user: authUser ? authUser : null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: !!userToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Optional: Add a reducer to clear errors manually
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true; // Set authenticated to true
        state.error = null; // Clear any previous errors
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from the rejected action
        state.isAuthenticated = false; // Ensure authenticated is false on error
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true; // Set authenticated to true
        state.error = null; // Clear any previous errors
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from the rejected action
        state.isAuthenticated = false; // Ensure authenticated is false on error
      })

      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true; // Set authenticated to true
        state.error = null; // Clear any previous errors

      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from the rejected action
        state.isAuthenticated = false; // Ensure authenticated is false on error
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false; // Set authenticated to false
        state.error = null; // Clear any previous errors
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null; // Clear any previous errors
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from the rejected action
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null; // Clear any previous errors
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from the rejected action
      })

      // Resend Verification Mail
      .addCase(resendVerificationMail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationMail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null; // Clear any previous errors
      })
      .addCase(resendVerificationMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from the rejected action
      })
      ;
  },
});

export const { clearError } = authSlice.actions; // Export the clearError action
export default authSlice.reducer;