import React from "react";
import styles from "./EventCard.module.css";
import { PlaceHolderImg2 } from "../common/Images"
import Loader from "../common/Loader";
import { useSelector } from "react-redux";

function EventCard({ event, handleActions, isFavoriteToggling = false }) {
  const { title, images, next_schedule, levels, city } = event;

  const { isAuthenticated } = useSelector((state) => state.auth);

  // Extract relevant data
  const eventImage = images.length > 0 ? images[0].original : PlaceHolderImg2;
  const eventDate = next_schedule ? `${next_schedule.day} ${next_schedule.opening_hours[0]?.initial_hour}` : "Fecha no disponible";
  const eventCategory = levels.length > 0 ? levels[0].title : "Categoría no disponible";
  const eventLocation = city ? `${city.name}, ${city.country.name}` : "Ubicación no disponible";

  return (
    <div className={styles.eventCard}>
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
        <button className={styles.viewMoreButton} onClick={(e) => handleActions(e, 'viewMore', event?.id, title)}>Ver más</button>
        <button className={styles.addToTripButton} onClick={(e) => handleActions(e, 'addToTrip', event?.id, title)}>
          <span className={styles.addIcon}></span>
          Añadir a viaje
        </button>
      </div>
    </div>
  );
}

export default EventCard;