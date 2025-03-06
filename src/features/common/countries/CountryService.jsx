import ApiService from "../../../services/ApiService";

const CountryService = {
    getCountries: async (searchQuery = "") => {
        if (searchQuery) {
            return ApiService.get("/cities/countries", { params: { name: searchQuery } });
        }else{
            return ApiService.get("/cities/countries");
        }
    },
};

export default CountryService;