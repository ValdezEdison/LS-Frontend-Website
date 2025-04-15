import React from "react";
import styles from "./TripDetails.module.css";

const StopCard = ({ number, name, address, image, rating, reviews }) => {
  return (
    <div className={styles.stopItem}>
      <div className={styles.stopNumber}>{number}</div>
      <div className={styles.stopCard}>
        <img src={image} alt={name} className={styles.stopImage} />
        <button className={styles.favoriteButton} aria-label="Add to favorites">
          <svg
            className={styles.favoriteIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content for favorite icon */}
          </svg>
        </button>
        <div className={styles.stopInfo}>
          <h3 className={styles.stopName}>{name}</h3>
          <p className={styles.stopAddress}>{address}</p>
          <div className={styles.stopRating}>
            <div className={styles.ratingScore}>{rating}</div>
            <div className={styles.ratingText}>Excelente</div>
            <div className={styles.ratingText}>{reviews} comentarios</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopCard;
