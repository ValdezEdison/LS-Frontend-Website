import React from "react";
import styles from "./MyTrips.module.css";

const TripCard = ({ image, name, sitesAdded, dates }) => {
  return (
    <div className={styles.tripCard}>
      <img src={image} alt="" className={styles.tripImage} />
      <div className={styles.tripInfo}>
        <h3 className={styles.tripName}>{name}</h3>
        <p className={styles.tripDetails}>{sitesAdded} sitios añadidos</p>
        <p className={styles.tripDetails}>{dates}</p>
      </div>
      <button className={styles.tripCardMenu} aria-label="Opciones del viaje">
        <svg
          id="I213:7963;486:44911"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG content */}
        </svg>
      </button>
    </div>
  );
};

export default TripCard;
