import React from "react";
import styles from "./EventCard.module.css";
import { PlaceHolderImg2 } from "../common/Images"
import Loader from "../common/Loader";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function EventCard({ event, handleActions, isFavoriteToggling = false }) {
  const { title, images, next_schedule, levels, city } = event;

  const { isAuthenticated } = useSelector((state) => state.auth);

  const location = useLocation();
  const isMyTripsEditPage = location.pathname.includes("my-trips/edit");
  const isEventsPage = location.pathname.includes("events");

  const { t } = useTranslation('MyTrips');

    // Check if date is already in "DD Month YYYY" format
    const isAlreadyFormatted = (dateString) => {
      return /^\d{1,2} \w+ \d{4}$/.test(dateString);
    };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    if (isAlreadyFormatted(dateString)) return dateString;
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original if invalid date
      
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      
      return `${day} ${month} ${year}`;
    } catch {
      return dateString; // Return original if formatting fails
    }
  };

  // Extract relevant data
  const eventImage = images.length > 0 ? images[0].original : PlaceHolderImg2;
  // const eventDate = next_schedule ? `${next_schedule.day} ${next_schedule.opening_hours[0]?.initial_hour}` : t('travelItineraryEdit.eventCard.dateNotAvailable');
  const formattedDate = next_schedule ? formatDate(next_schedule.day) : "";
  const eventTime = next_schedule?.opening_hours[0]?.initial_hour || "";
  const eventDate = next_schedule 
    ? `${formattedDate} ${eventTime}`.trim()
    : t('travelItineraryEdit.eventCard.dateNotAvailable');
  const eventCategory = levels.length > 0 ? levels[0].title : t('travelItineraryEdit.eventCard.categoryNotAvailable');
  const eventLocation = city ? `${city.name}, ${city.country.name}` : t('travelItineraryEdit.eventCard.locationNotAvailable');

  return (
    <div className={styles.eventCard} onClick={(e) => handleActions(e, 'viewMore', isEventsPage? event?.id : event?.absolute_url || event?.id, title)}>
      <div className={styles.eventImageContainer}>
        {isFavoriteToggling && (
          <div className={styles.loaderOverlay}>
            <div className={styles.loaderToCenter}>
              <Loader />
            </div>
          </div>
        )}
        <img src={eventImage} alt={title} className={styles.eventImage} />
      {isAuthenticated &&  <div className={`${styles.favIcon} ${event?.is_fav ? styles.clicked : ''}`} onClick={(e) => handleActions(e, 'addToFavorites', event?.id, title)}></div>}
      </div>

      <div className={styles.eventInfo}>
        <h3 className={styles.eventTitle}>{title}</h3>
        <p className={styles.eventLocation}>{eventLocation}</p>
        <p className={styles.eventDate}>{eventDate}</p>
        <p className={styles.eventCategory}>{eventCategory}</p>
      </div>
      <div className={styles.eventActions}>
        <button className={styles.viewMoreButton} onClick={(e) => handleActions(e, 'viewMore', isEventsPage? event?.id : event?.absolute_url || event?.id, title)}>{t('travelItineraryEdit.buttons.viewMore')}</button>
        <button className={styles.addToTripButton} onClick={(e) => handleActions(e, isMyTripsEditPage ? 'addToStop' : 'addToTrip', event?.id, title)}>
          <span className={styles.addIcon}></span>
          {t('travelItineraryEdit.buttons.addToTrip')}
        </button>
      </div>
    </div>
  );
}

export default EventCard;