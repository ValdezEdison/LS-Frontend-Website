import React from "react";
import styles from "./EventCard.module.css";

const EventCard = ({ image, title, location, date, category }) => {
  return (
    <div className={styles.eventCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.eventImage} />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/d4eff01f84d9396160aa0416ac405ccae9848863?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt=""
          className={styles.favoriteIcon}
        />
      </div>
      <div className={styles.eventInfo}>
        <h3 className={styles.eventTitle}>{title}</h3>
        <p className={styles.eventLocation}>{location}</p>
        <p className={styles.eventDate}>{date}</p>
        <p className={styles.eventCategory}>{category}</p>
      </div>
      <div className={styles.eventActions}>
        <button className={styles.viewMoreButton}>Ver más</button>
        <button className={styles.addToTripButton}>
          <span className={styles.addIcon}></span>
          Añadir a viaje
        </button>
      </div>
    </div>
  );
};

export default EventCard;
