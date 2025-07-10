import apiService from "../../../services/ApiService"; 

const ContactUsService = {
  // Send Contact Form Service API
  sendContactForm: async (formData) => {
    // Validation (Optional)
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error("Validation Error: Missing required fields.");
    }

    // Try sending request
    try {
      return apiService.post("/contact-form/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      if (!error.response) {
        throw new Error("Network Error");
      }
      throw error;
    }
  },

  // Subscribe to Newsletter Service
  signupNewsletter: async (email, gdprConsent) => {
    try {
      return apiService.post(
        "/newsletter/subscribe/",
        { email, gdpr_consent: gdprConsent },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      if (!error.response) {
        throw new Error("Network error");
      }
      throw error;
    }
  },
};

export default ContactUsService;