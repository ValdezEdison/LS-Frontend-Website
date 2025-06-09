import ApiService from "../../../services/ApiService";
import Cookies from "js-cookie";

const ContactUsService = {
    submitContactForm: (data) => {
        const csrfToken = Cookies.get('csrftoken');
        return ApiService.post('/contact-form/', data, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
    }
};

export default ContactUsService;