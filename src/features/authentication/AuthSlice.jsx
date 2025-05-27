// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { login, register, getProfile, logout, forgotPassword, verifyEmail, resendVerificationMail, updateProfile, updateProfilePicture, changePassword, deleteAccount, fetchUsersGroups, updateUserLanguage, saveSuggestions, saveNotificationPreferences, fetchNotificationPreferences } from "./AuthActions";
import { socialLogin } from "./socialLogin/SocialAuthAction";
const userToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
const authUser = JSON.parse(localStorage.getItem('authUser'));
const initialState = {
  user: authUser ? authUser : null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: !!userToken,
  userLoading: false,
  groups: [],
  groupsLoading: false,
  notificationPreferences: [],
  notificationPreferencesLoading: false
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
        // state.user = action.payload.user;
        // state.token = action.payload.token;
        // state.isAuthenticated = true; // Set authenticated to true
        state.error = null; // Clear any previous errors
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from the rejected action
        state.isAuthenticated = false; // Ensure authenticated is false on error
      })

      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true; // Set authenticated to true
        state.error = null; // Clear any previous errors

      })
      .addCase(getProfile.rejected, (state, action) => {
        state.userLoading = false;
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
      .addCase(socialLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(socialLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true; // Set authenticated to true
        state.error = null; // Clear any previous errors
    })
    .addCase(socialLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from the rejected action
        state.isAuthenticated = false; // Ensure authenticated is false on error
    })

    .addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true; // Set authenticated to true
      state.error = null; // Clear any previous errors
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error from the rejected action
      state.isAuthenticated = false; // Ensure authenticated is false on error
    })

    .addCase(updateProfilePicture.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProfilePicture.fulfilled, (state, action) => {
      state.loading = false;
      // state.user = action.payload;
      state.isAuthenticated = true; // Set authenticated to true
      state.error = null; // Clear any previous errors
    })
    .addCase(updateProfilePicture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error from the rejected action
      state.isAuthenticated = false; // Ensure authenticated is false on error
    })

    // change password

    .addCase(changePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      // state.user = action.payload;
      state.isAuthenticated = true; // Set authenticated to true
      state.error = null; // Clear any previous errors
    })
    .addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error from the rejected action
      state.isAuthenticated = false; // Ensure authenticated is false on error
    })

    // delete account

    .addCase(deleteAccount.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteAccount.fulfilled, (state, action) => {
      state.loading = false;
      // state.user = action.payload;
      state.isAuthenticated = false; // Set authenticated to true
      state.error = null; // Clear any previous errors
    })
    .addCase(deleteAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error from the rejected action
      state.isAuthenticated = true; // Ensure authenticated is false on error
    })

    .addCase(fetchUsersGroups.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUsersGroups.fulfilled, (state, action) => {
      state.loading = false;
      state.groups = action.payload;
      state.error = null; // Clear any previous errors
    })
    .addCase(fetchUsersGroups.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error from the rejected action
    })

    .addCase(updateUserLanguage.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUserLanguage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null; // Clear any previous errors
    })
    .addCase(updateUserLanguage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error from the rejected action
    })

    .addCase(saveSuggestions.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(saveSuggestions.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null; // Clear any previous errors
    })
    .addCase(saveSuggestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error from the rejected action
    })

    .addCase(saveNotificationPreferences.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(saveNotificationPreferences.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null; // Clear any previous errors
    })
    .addCase(saveNotificationPreferences.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error from the rejected action
    })

    .addCase(fetchNotificationPreferences.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchNotificationPreferences.fulfilled, (state, action) => {
      state.loading = false;
      state.notificationPreferences = action.payload;
      state.error = null; // Clear any previous errors
    })
    .addCase(fetchNotificationPreferences.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error from the rejected action
    })
      
  },
});

export const { clearError } = authSlice.actions; // Export the clearError action
export default authSlice.reducer;