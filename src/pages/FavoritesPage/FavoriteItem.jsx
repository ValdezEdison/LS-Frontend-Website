import React from "react";
import styles from "./FavoriteItem.module.css";

const FavoriteItem = ({
  image,
  title,
  location,
  date,
  category,
  rating,
  reviews,
  stops,
}) => {
  return (
    <div className={styles.favoriteItem}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.itemImage} />
        <button
          className={styles.favoriteButton}
          aria-label="Añadir a favoritos"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/801576e065e6d51123cb0b479f0d7462dd074581?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt=""
            className={styles.heartIcon}
          />
        </button>
      </div>
      <div className={styles.itemInfo}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <p className={styles.itemLocation}>{location}</p>
        {date && <p className={styles.itemDate}>{date}</p>}
        {category && <p className={styles.itemCategory}>{category}</p>}
        {stops && <p className={styles.itemStops}>{stops}</p>}
        {rating && (
          <div className={styles.ratingContainer}>
            <span className={styles.rating}>{rating}</span>
            <div className={styles.reviewInfo}>
              <span className={styles.reviewText}>Excelente</span>
              <span className={styles.reviewCount}>{reviews} comentarios</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.itemActions}>
        <button className={styles.viewMoreButton}>Ver más</button>
        <button className={styles.addToTripButton}>
          <span className={styles.addIcon}></span>
          Añadir a viaje
        </button>
      </div>
    </div>
  );
};

export default FavoriteItem;
