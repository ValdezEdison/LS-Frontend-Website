import React from "react";
import styles from "./TripDetails.module.css";
import { useTranslation } from "react-i18next";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TripInfo = ({ handleActions, id, tripDetails, loading }) => {

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


  if (loading) {
    return (
      <div className={styles.tripHeader}>
        <div className={styles.tripInfo}>
          {/* Trip Title Skeleton */}
          <Skeleton 
            width={200} 
            height={32} 
            style={{ marginBottom: '8px' }} 
          />
          
          {/* Trip Dates Skeleton */}
          <Skeleton 
            width={180} 
            height={20} 
          />
        </div>
        
        <div className={styles.tripActions}>
          {/* Edit Button Skeleton */}
          <Skeleton 
            circle={true}
            width={40} 
            height={40} 
            style={{ marginRight: '8px' }}
          />
          
          {/* Share Button Skeleton */}
          <Skeleton 
            circle={true}
            width={40} 
            height={40} 
          />
        </div>
      </div>
    );
  }

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
        <div className="shareButtonWrapper">
        <button 
          className={`${styles.actionButton} ${styles.shareButton}`} 
          aria-label={t('tripInfo.ariaLabels.shareTrip')}
          onClick={(e) => handleActions(e, 'shareTrip', id)}
        >
        
        </button>
        </div>
      </div>
    </div>
  );
};

export default TripInfo;