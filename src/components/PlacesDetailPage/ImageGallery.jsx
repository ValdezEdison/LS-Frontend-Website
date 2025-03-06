import React from "react";
import styles from "./ImageGallery.module.css";

const ImageGallery = () => {
  const images = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5720106ace5c480b1ec1b9778f200b9ee6c2e1e023abdcba2a9c3e54af1f3a51?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      alt: "Museum exterior",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/75b2beca685c2b694a6531f777834e930f8e72391c74808c61ba6e7cc3d7b4a5?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      alt: "Museum exhibit 1",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5d6c57641905ee4fa065770b6639e9e9dbdca608c30eec5b30744a2460f4220b?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      alt: "Museum exhibit 2",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/6883b48f91037b02c840dc0b12c619ea05d904d12594bf53f9ea0459eee3cfef?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      alt: "Museum exhibit 3",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/9bc27a34a534fac779cba8aee159ff528435c23aae4cf741dc0404255053f57d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      alt: "Museum exhibit 4",
    },
  ];

  return (
    <div className={styles.imageGallery}>
      <div className={styles.imageGalleryTop}>
        <div className={styles.mainImage}>
          <img src={images[0].src} alt={images[0].alt} />
        </div>
        <div className={styles.thumbnails}>
          {images.slice(1).map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} />
          ))}
        </div>
      </div>
     
      <button className={styles.viewMoreButton}>Ver más</button>
    </div>
  );
};

export default ImageGallery;
