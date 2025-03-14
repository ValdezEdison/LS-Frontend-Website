import React from "react";
import styles from "./EventCard.module.css";

function EventCard({ title, location, date, category, image }) {
  return (
    <div className={styles.eventCard}>
      <img src={image} alt={title} className={styles.eventImage} />
      <button className={styles.favoriteButton} aria-label="Add to favorites">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG content */}
        </svg>
      </button>
      <div className={styles.eventInfo}>
        <h3 className={styles.eventTitle}>{title}</h3>
        <p className={styles.eventLocation}>{location}</p>
        <p className={styles.eventDate}>{date}</p>
        <p className={styles.eventCategory}>{category}</p>
      </div>
      <div className={styles.eventActions}>
        <button className={styles.viewMoreButton}>Ver más</button>
        <button className={styles.addToTripButton}>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content */}
          </svg>
          Añadir a viaje
        </button>
      </div>
    </div>
  );
}

export default EventCard;
