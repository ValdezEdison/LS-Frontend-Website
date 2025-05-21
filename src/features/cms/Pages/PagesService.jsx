import CmsApiService from "../../../services/CmsApiService";

const PagesService = {
    getHeroContent: async (language) => {
        return CmsApiService.get('/api/v2/hero-content/?locale=' + language);
    },
    getOurPartners: async (language) => {
        return CmsApiService.get('/api/v2/our-partners/?locale=' + language);
    },

    getWhoWeAre: async (language) => {
        return CmsApiService.get('/api/v2/who-we-are/?locale=' + language);
    },

    getContactUs: async (language) => {
        return CmsApiService.get('/api/v2/contact-sections/?locale=' + language);
    },

    getFreePages: async (language) => {
        return CmsApiService.get('/api/v2/free-page-blocks/?locale=' + language);
    },

    getWorkWithUs: async (language) => {
        return CmsApiService.get('/api/v2/work-with-us/?locale=' + language);
    },
    getFaqBlocks: async (language) => {
        return CmsApiService.get('/api/v2/faq-blocks/?locale=' + language);
    },
}

export default PagesService