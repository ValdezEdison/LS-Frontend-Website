import React from "react";
import styles from "./ItineraryCard.module.css";

const ItineraryCard = ({ title, stops, location, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/d4eff01f84d9396160aa0416ac405ccae9848863?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt=""
            className={styles.favoriteIcon}
          />
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.stops}>
            {stops} parada{stops > 1 ? "s" : ""}
          </p>
          <p className={styles.type}>Itinerario</p>
          <p className={styles.location}>{location}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.viewButton}>Ver más</button>
        <button className={styles.addButton}>
          <span className={styles.addIcon}></span>
          Añadir a viaje
        </button>
      </div>
    </div>
  );
};

export default ItineraryCard;
