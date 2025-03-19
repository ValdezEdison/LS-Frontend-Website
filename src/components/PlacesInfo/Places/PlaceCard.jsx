import React from "react";
import styles from "../../../pages/placesInfo/places/Places.module.css";


const PlaceCard = ({ image, name, location, category, rating, reviews }) => {
  return (
    <div className={styles.placeCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.placeImage} />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/cc8f543a5471a64d7c76250a1c72bf520695c035074566a09d747e59e35ec524?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Favorite"
          className={styles.favoriteIcon}
        />
      </div>
      <div className={styles.placeInfo}>
        <h3 className={styles.placeName}>{name}</h3>
        <p className={styles.placeLocation}>{location}</p>
        <p className={styles.placeCategory}>{category}</p>
        <div className={styles.ratingContainer}>
          <span className={styles.ratingScore}>{rating}</span>
          <div className={styles.ratingInfo}>
            <span className={styles.ratingText}>Excelente</span>
            <span className={styles.reviewCount}>{reviews} comentarios</span>
          </div>
        </div>
      </div>
      <div className={styles.placeActions}>
        <button className={styles.viewMoreButton}>Ver más</button>
        <button className={styles.addToTripButton}>
          <span className={styles.addIcon} />
          Añadir a viaje
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
