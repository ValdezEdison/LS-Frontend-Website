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
        <button className={`${styles.actionButton} ${styles.editButton}`} aria-label="Edit trip" onClick={(e) => handleActions(e, 'editTrip', id)}>
        </button>
        <button className={`${styles.actionButton} ${styles.shareButton}`} aria-label="More options">
        </button>
      </div>
    </div>
  );
};

export default TripInfo;
