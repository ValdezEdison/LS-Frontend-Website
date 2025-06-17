import React from "react";
import styles from "./ImageGallery.module.css";
import { PlaceHolderImg2 } from "../common/Images";
import { useTranslation } from "react-i18next";

const ImageGallery = ({ handleClickViewMoreDetails, images }) => {
  const { t } = useTranslation("Common");

  // This is a safe handler. If the prop isn't passed, it does nothing.
  // It passes the index of the clicked image back to the parent component.
  const handleGalleryOpen = (index) => {
    if (handleClickViewMoreDetails) {
      handleClickViewMoreDetails(index);
    }
  };

  return (
    <div className={styles.imageGallery}>
      <div className={styles.imageGalleryTop}>
        <div className={styles.mainImage}>
          <img
            src={images && images[0] && images[0]?.original ? images[0]?.original : PlaceHolderImg2}
            alt="Main exhibit"
            // Pass index 0 for the main image
            onClick={() => handleGalleryOpen(0)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className={styles.thumbnails}>
          {/* We use slice(1, 5) to show a maximum of 4 thumbnails */}
          {images?.slice(1, 5).map((image, index) => (
            <img
              key={image.id || index}
              src={image.original}
              alt={`Exhibit ${index + 2}`}
              // The index here is from the sliced array (0, 1, 2..), 
              // so we add 1 to get the correct original index (1, 2, 3..).
              onClick={() => handleGalleryOpen(index + 1)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
      {/* The button will open the gallery starting from the first image (index 0) */}
      <button className={styles.viewMoreButton} onClick={() => handleGalleryOpen(0)}>
        {t("seeMore")}
      </button>
    </div>
  );
};

export default ImageGallery;