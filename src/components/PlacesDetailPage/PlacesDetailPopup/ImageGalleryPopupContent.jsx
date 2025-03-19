import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./MuseumModal.module.css";

const ImageGalleryPopupContent = ({ images, isWide = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const thumbnailCount = images && images.length ? images.length : 0

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => setCurrentIndex(index),
  };

  // Calculate visible thumbnails
  const getVisibleThumbnails = () => {
    const thumbnails = [];
    const totalImages = images.length;

    // Always include the current image
    thumbnails.push(images[currentIndex]);

    // Add the next 3 images (or wrap around if necessary)
    for (let i = 1; i < thumbnailCount; i++) {
      const nextIndex = (currentIndex + i) % totalImages;
      thumbnails.push(images[nextIndex]);
    }

    return thumbnails;
  };

  const visibleThumbnails = getVisibleThumbnails();

  console.log(images.length, 'images.length')

  return (
    <div className={`${styles.gallerySection} ${isWide ? styles.destinationImageContainer : ""}`}>
      {images.length > 1 ? (
        <>
          <div className={styles.mainImageContainer}>
            <button
              className={`${styles.arrowButton} ${styles.prev}`}
              aria-label="Previous image"
              onClick={handlePrev}
            >
              {/* Add your arrow icon here */}
            </button>
            <Slider {...settings} ref={sliderRef}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.original}
                  alt={image.alt}
                  className={styles.mainImage}
                />
              ))}
            </Slider>
            <button
              className={`${styles.arrowButton} ${styles.next}`}
              aria-label="Next image"
              onClick={handleNext}
            >
              {/* Add your arrow icon here */}
            </button>
          </div>

          <div className={styles.imageCounter}>
            {currentIndex + 1}/{images.length}
          </div>
          <div className={styles.thumbnailContainer}>
            {visibleThumbnails.map((image, index) => (
              <img
                key={index}
                src={image.thumbnail}
                alt={image.alt}
                className={`${styles.thumbnail} ${index === 0 ? styles.activeThumbnail : ""
                  }`}
                onClick={() => {
                  const clickedIndex = images.indexOf(image);
                  sliderRef.current.slickGoTo(clickedIndex);
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.mainImageContainer}>
          <img
            src={images[0] ? images[0]?.original : PlaceHolderImg2}
            alt="Main exhibit"
            className={styles.mainImage}
          />
        </div>
      )}


    </div>
  );
};

export default ImageGalleryPopupContent;