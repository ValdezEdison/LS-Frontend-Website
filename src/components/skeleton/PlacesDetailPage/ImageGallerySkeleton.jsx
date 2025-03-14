import React from "react";
import styles from "../../PlacesDetailPage/ImageGallery.module.css";
import Skeleton from "react-loading-skeleton";
import { PlaceHolderImg4 } from "../../common/Images";

const ImageGallerySkeleton = () => {
    return (
        <div className={styles.imageGallery}>
            <div className={styles.imageGalleryTop}>
                <div className={styles.mainImage}>
                    <img src={PlaceHolderImg4} alt="" /> {/* Placeholder for the main image */}
                </div>
                <div className={styles.thumbnails}>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} height={80} width={80} /> 
                    ))}
                </div>
            </div>
            <Skeleton height={40} width={100} /> {/* Placeholder for the "View More" button */}
        </div>
    );
};

export default ImageGallerySkeleton;