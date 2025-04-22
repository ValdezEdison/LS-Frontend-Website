import CmsApiService from "../../../services/CmsApiService";

const PagesService = {
    getHeroContent: async (language) => {
        return CmsApiService.get('/api/v2/hero-content/?locale=' + language);
    },
    getOurPartners: async (language) => {
        return CmsApiService.get('/api/v2/our-partners/?locale=' + language);
    }
}

export default PagesService