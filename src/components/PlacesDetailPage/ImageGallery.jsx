import React from "react";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ handleClickViewMoreDetails, images }) => {
  console.log(images, 'images')
  return (
    <div className={styles.imageGallery}>
      <div className={styles.imageGalleryTop}>
        <div className={styles.mainImage}>
          <img src={images && images[0] && images[0]?.original} alt="Main exhibit" />
        </div>
        <div className={styles.thumbnails}>
          {images?.slice(1).map((image, index) => (
            <img key={index} src={image.original} alt={`Exhibit ${index + 1}`} />
          ))}
        </div>
      </div>
      <button className={styles.viewMoreButton} onClick={handleClickViewMoreDetails}>
        Ver más
      </button>
    </div>
  );
};

export default ImageGallery;