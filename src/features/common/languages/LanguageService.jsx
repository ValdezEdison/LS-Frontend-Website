import ApiService from "../../../services/ApiService";

const LanguageService = {
    getLanguages: async () => {
        return ApiService.get("/translations/languages");
    },
};

export default LanguageService;