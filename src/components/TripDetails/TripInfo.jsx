import React from "react";
import styles from "./TripDetails.module.css";

const TripInfo = ({ handleActions, id }) => {
  return (
    <div className={styles.tripHeader}>
      <div className={styles.tripInfo}>
        <h1 className={styles.tripTitle}>Viaje cumple mamá</h1>
        <p className={styles.tripDates}>
          Desde 24 Ene de 2025 hasta el 30 Ene de 2025
        </p>
      </div>
      <div className={styles.tripActions}>
        <button className={styles.actionButton} aria-label="Edit trip" onClick={(e) => handleActions(e, 'editTrip', id)}>
          <svg
            id="249:12021"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content for edit icon */}
          </svg>
        </button>
        <button className={styles.actionButton} aria-label="More options">
          <svg
            id="249:12020"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content for more options icon */}
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TripInfo;
