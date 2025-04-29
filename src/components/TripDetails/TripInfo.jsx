import React from "react";
import styles from "./TripDetails.module.css";

const TripInfo = ({ handleActions, id, tripDetails }) => {
  // Format dates to display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className={styles.tripHeader}>
      <div className={styles.tripInfo}>
        <h1 className={styles.tripTitle}>{tripDetails?.title || ''}</h1>
        <p className={styles.tripDates}>
          {tripDetails?.initial_date && tripDetails?.end_date ? (
            `Desde ${formatDate(tripDetails.initial_date)} hasta el ${formatDate(tripDetails.end_date)}`
          ) : (
            'No dates specified'
          )}
        </p>
      </div>
      <div className={styles.tripActions}>
        <button 
          className={`${styles.actionButton} ${styles.editButton}`} 
          aria-label="Edit trip" 
          onClick={(e) => handleActions(e, 'editTrip', id)}
        >
          
        </button>
        <button 
          className={`${styles.actionButton} ${styles.shareButton}`} 
          aria-label="More options"
        >
          
        </button>
      </div>
    </div>
  );
};

export default TripInfo;