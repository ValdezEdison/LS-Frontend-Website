
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
  
}

export default BlocksService