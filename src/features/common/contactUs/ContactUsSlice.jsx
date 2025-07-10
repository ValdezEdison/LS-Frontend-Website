// src/features/common/contactUs/ContactUsSlice.jsx

import { createSlice } from "@reduxjs/toolkit";
import { submitContactForm } from "./ContactUsAction";

const initialState = {
  loading: false,
  error: null,
  success: false, // Added to handle success state
};

const contactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {
    resetContactState: () => initialState, // Optional reducer to reset state
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true; // Updated success state here
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Handle payload error or generic message
        state.success = false;
      });
  },
});

export const { resetContactState } = contactUsSlice.actions; // Export action
export default contactUsSlice.reducer; // Export reducer