import ApiService from "../../../services/ApiService";

const CountryService = {
    getCountries: async (searchQuery = "") => {
        if (searchQuery) {
            return ApiService.get("/cities/countries", { params: { name: searchQuery } });
        }else{
            return ApiService.get("/cities/countries");
        }
    },

    getCountriesPhonecodes: async () => {
        return ApiService.get("/cities/countries/phone_codes");
    },
};

export default CountryService;