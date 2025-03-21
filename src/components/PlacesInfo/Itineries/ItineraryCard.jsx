import React from "react";
import styles from "./ItineraryCard.module.css";

const ItineraryCard = ({ place, index, handleViewMoreDetails }) => {
  const { title, address, images, rating, tags, city } = place;

  return (
    <div className={styles.itenaryCardWrapper} onClick={() => handleViewMoreDetails(place?.id)}>
      <div className={styles.cardIndex}>{index}</div>
      <div className={styles.itineraryCard}>
        <div className={styles.cardContent}>
          <div className={styles.imageContainer}>
            <img
              src={images[0]?.original}
              alt={title}
              className={styles.placeImage}
            />
            <button className={styles.favoriteButton} aria-label="Add to favorites">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/9140b40ebf360338b9f5f1817977859dcc6c34cd3c67c7a8bb2be210d9539a5f?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                alt=""
                className={styles.favoriteIcon}
              />
            </button>
          </div>
          <div className={styles.placeInfo}>
            <div className={styles.placeInfoTop}>
              <h3 className={styles.placeName}>{title}</h3>
              <p className={styles.placeAddress}>{address?.street}</p>
               <p className={styles.placeLocation}>
                    {city?.name}
                    {city?.name && city?.country?.name && ", "}
                    {city?.country?.name}
                </p>
            </div>
            <div className={styles.ratingContainer}>
              <span className={styles.ratingScore}>{rating}</span>
              <div className={styles.ratingText}>
                <span className={styles.ratingLabel}>Excelente</span>
                <span className={styles.reviewCount}>0 comentarios</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;