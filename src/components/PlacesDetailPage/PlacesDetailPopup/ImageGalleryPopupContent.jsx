import React from "react";
import styles from "./MuseumModal.module.css";



const ImageGalleryPopupContent = ({ images }) => {
  return (
    <div className={styles.imageGalleryPopupContent}>
      {images.map((image, index) => (
        <img key={index} src={image.original} alt={`Exhibit ${index + 1}`} />
      ))}
    </div>
  );
};

export default ImageGalleryPopupContent;
