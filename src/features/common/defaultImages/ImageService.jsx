import ApiService from "../../../services/ApiService";

const ImageService = {
    getImages: async () => {
        return ApiService.get("/sites/default_images");
    },
};

export default ImageService;