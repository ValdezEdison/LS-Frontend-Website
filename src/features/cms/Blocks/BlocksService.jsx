
// src/features/cms/Blocks/BlocksService.jsx
import { get } from "lodash";
import CmsApiService from "../../../services/CmsApiService";

const BlocksService = {
    getHeaderBlocks: async () => {
        return CmsApiService.get('/api/v2/header-blocks');
    },

    getNewsLetterBlocks: async (language) => {
        return CmsApiService.get('/api/v2/newsletters/?locale=' + language)
    },
    getBannerBlocks: async (language) => {
        return CmsApiService.get('/api/v2/banners/?locale=' + language);
    },
    getFooterBlocks: async (language) => {
        return CmsApiService.get('/api/v2/footer-blocks/?locale=' + language);
    },

    getMarketingCampaigns: async (language, name) => {
        return CmsApiService.get(`/api/v2/marketing-campaigns/?locale=${encodeURIComponent(language)}&name=${encodeURIComponent(name)}`);
    },
    getSEOSettingsList: async (language) => {
        return CmsApiService.get(`/api/v2/seo-settings/?locale=${encodeURIComponent(language)}`);
    },
    getAnalyticsSettingsList: async (language) => {
        return CmsApiService.get(`/api/v2/analytics-settings/?locale=${encodeURIComponent(language)}`);
    },
    getAmbassadorBlocks: async (language) => {
        return CmsApiService.get(`/api/v2/ambassadors-blocks/?locale=${encodeURIComponent(language)}`);
    },

}

export default BlocksService