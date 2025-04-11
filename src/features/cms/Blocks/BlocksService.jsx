
import CmsApiService from "../../../services/CmsApiService";

const BlocksService = {
    getHeaderBlocks: async () => {
        return CmsApiService.get('/api/v2/header-blocks');
    },
  
}

export default BlocksService