import React from "react";
import styles from "./ItineraryCard.module.css";

const ItineraryCard = ({ place, index }) => {
  return (
    <div className={styles.itenaryCardWrapper}>
      <div className={styles.cardIndex}>{index}</div>
      <div className={styles.itineraryCard}>
        
        <div className={styles.cardContent}>
          <div className={styles.imageContainer}>
            <img
              src={place.image}
              alt={place.name}
              className={styles.placeImage}
            />
            <button
              className={styles.favoriteButton}
              aria-label="Add to favorites"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/9140b40ebf360338b9f5f1817977859dcc6c34cd3c67c7a8bb2be210d9539a5f?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                alt=""
                className={styles.favoriteIcon}
              />
            </button>
          </div>
          <div className={styles.placeInfo}>
            <div className={styles.placeInfoTop}>
              <h3 className={styles.placeName}>{place.name}</h3>
              <p className={styles.placeAddress}>{place.address}</p>
            </div>
            <div className={styles.ratingContainer}>
              <span className={styles.ratingScore}>{place.rating}</span>
              <div className={styles.ratingText}>
                <span className={styles.ratingLabel}>Excelente</span>
                <span className={styles.reviewCount}>
                  {place.reviews} comentarios
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
