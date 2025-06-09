import ApiService from "../../../services/ApiService";

const ContactUsService = {
    submitContactForm: (data) => {
        return ApiService.post('/contact-form/', data);
    }
};

export default ContactUsService;