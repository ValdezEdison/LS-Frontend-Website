import React, { useContext} from "react";
import styles from "./TripCard.module.css";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";


const TripCard = ({ trip, isPast, handleActions }) => {
  

  const { t } = useTranslation('MyTrips');

  const { currentLanguage } = useContext(LanguageContext);

  const firstCity = trip.cities?.[0];
  const firstImage = firstCity?.images?.[0]?.thumbnail;
  const title = trip.title || `${firstCity?.name || t('tripCard.defaultTitle')} ${t('tripCard.defaultTitle')}`;

    // Function to format date as "Month Day, Year"
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(currentLanguage, {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    };
  
    // Function to format the date range
    const formatDateRange = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // If same year
      if (start.getFullYear() === end.getFullYear()) {
        const startStr = start.toLocaleDateString(currentLanguage, { 
          month: 'long', 
          day: 'numeric' 
        });
        const endStr = end.toLocaleDateString(currentLanguage, { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        });
        return t('tripCard.dateRangeFormatSameYear', { 
          startDate: startStr, 
          endDate: endStr 
        });
      }
      // If different years
      return t('tripCard.dateRangeFormatDifferentYears', { 
        startDate: formatDate(startDate), 
        endDate: formatDate(endDate) 
      });
    };
  
    const dateRange = formatDateRange(trip.initial_date, trip.end_date);

  return (
    <>
    <div className={styles.tripDate}>{dateRange}</div>
    <div className={styles.tripCard} onClick={(e) => handleActions(e, 'showTripDetails', trip.id)}>
      <div className={styles.tripInfo}>
        <img 
          src={firstImage || 'default-image-url'} 
          alt={title} 
          className={styles.tripImage}
          onError={(e) => {
            e.target.src = 'default-image-url';
          }}
        />
        <div className={styles.tripDetails}>
          <h3 className={styles.tripTitle}>{title}</h3>
          {/* {trip.cities?.length > 0 && (
            <p className={styles.tripCities}>
              {trip.cities.map(city => city.name).join(', ')}
            </p>
          )} */}
          {/* <p className={styles.tripType}>{trip.type}</p> */}
          <p className={styles.tripSites}> {t('tripCard.sitesAdded', { count: trip.num_of_places || 0 })}</p>
          <p className={styles.tripDates}>
           {dateRange}
          </p>
        </div>
      </div>
      {/* {!isPast && ( */}
        <div className={styles.tripActions}>
          <div className={styles.tripActionsDropdown}>
            <div className={styles.editButton}>{t('tripCard.editButton')}</div>
            <div className={styles.deleteButton}>{t('tripCard.deleteButton')}</div>
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default TripCard;