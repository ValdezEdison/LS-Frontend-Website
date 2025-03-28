import SocialLogin from "../../../components/LoginPage/SocialLogin";
import ApiService from "../../../services/ApiService";

const SocialAuthService = {
    socialLogin: async (data) => {
        return ApiService.post('/auth/convert-token', data);
    },
  
};

export default SocialAuthService;