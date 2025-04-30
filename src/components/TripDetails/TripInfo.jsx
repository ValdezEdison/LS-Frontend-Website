import React from "react";
import styles from "./TripDetails.module.css";
import { useTranslation } from "react-i18next";

const TripInfo = ({ handleActions, id, tripDetails }) => {

  const { t } = useTranslation('MyTrips');
  // Format dates to display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString(
        i18n.language,
        t('tripInfo.dateFormat', { returnObjects: true })
      );
    } catch {
      return dateString;
    }
  };

  return (
    <div className={styles.tripHeader}>
      <div className={styles.tripInfo}>
        <h1 className={styles.tripTitle}>{tripDetails?.title || ''}</h1>
        <p className={styles.tripDates}>
          {tripDetails?.initial_date && tripDetails?.end_date ? (
            t('tripInfo.dateRange', {
              startDate: formatDate(tripDetails.initial_date),
              endDate: formatDate(tripDetails.end_date)
            })
          ) : (
            t('tripInfo.noDates')
          )}
        </p>
      </div>
      <div className={styles.tripActions}>
        <button 
          className={`${styles.actionButton} ${styles.editButton}`} 
          aria-label={t('tripInfo.ariaLabels.editTrip')}
          onClick={(e) => handleActions(e, 'editTrip', id)}
        >
          
        </button>
        <button 
          className={`${styles.actionButton} ${styles.shareButton}`} 
          aria-label={t('tripInfo.ariaLabels.shareTrip')}
          onClick={(e) => handleActions(e, 'shareTrip', id)}
        >
          
        </button>
      </div>
    </div>
  );
};

export default TripInfo;