import React from "react";
import styles from "./EventCard.module.css";

function EventCard({ title, location, date, category, image }) {
  return (
    <div className={styles.eventCard}>
      <div className={styles.eventImageContainer}>
        <img src={image} alt={title} className={styles.eventImage} />
        <div className={styles.favIcon}></div>
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
}

export default EventCard;
