import React from "react";
import styles from "./PlaceCard.module.css";
import { PlaceHolderImg2 } from "../common/Images";

const PlaceCard = ({ place }) => {
  return (
    <div className={styles.placeCard}>
      <div className={styles.placeImageContainer}>
        <img src={place.images[0]? place.images[0]?.midsize : PlaceHolderImg2} alt={place.name} className={styles.placeImage} />
        <div className={`${styles.favIcon} ${styles.clicked}`}></div>
      </div>
      <div className={styles.placeInfo}>
        <h3 className={styles.placeName}>{place.name}</h3>
        <p className={styles.placeLocation}>{place.location}</p>
        <p className={styles.placeCategory}>{place.category}</p>
        <div className={styles.placeRating}>
          <span className={styles.ratingScore}>{place.rating}</span>
          <div className={styles.ratingInfo}>
            <p className={styles.ratingText}>
              {place.rating >= 4 ? "Excelente" : "Muy bueno"}
            </p>
            <p className={styles.reviewCount}>{place.reviews} comentarios</p>
          </div>
        </div>
      </div>
      <div className={styles.placeActions}>
        <button className={styles.viewMoreButton}>Ver más</button>
        <button className={styles.addToTripButton}>
          <span className={styles.addIcon}></span>
          Añadir a viaje
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
