
import CmsApiService from "../../../services/CmsApiService";

const BlockService = {
    getHeaderBlocks: async () => {
        return CmsApiService.get('/api/v2/header-blocks');
    },

}

export default BlockService