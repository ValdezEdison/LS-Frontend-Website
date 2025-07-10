// src/features/common/contactUs/ContactUsAction.jsx
import { createAsyncThunk } from "@reduxjs/toolkit";
import ContactUsService from "./ContactUsService";
import { handleApiError } from "../../../utils/Helper";

// AsyncThunk - Submit Contact Form
export const submitContactForm = createAsyncThunk(
  "contactForm/submitContactForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await ContactUsService.sendContactForm(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// AsyncThunk - Subscribe to Newsletter
export const signupNewsletter = createAsyncThunk(
  "newsletter/signupNewsletter",
  async ({ email, gdprConsent }, { rejectWithValue }) => {
    try {
      const response = await ContactUsService.signupNewsletter(email, gdprConsent);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);