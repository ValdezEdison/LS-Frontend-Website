import React from "react";
import styles from "./TripCard.module.css";

const TripCard = ({ trip, isPast, handleActions }) => {
  console.log('trip', trip)
  const firstCity = trip.cities?.[0];
  const firstImage = firstCity?.images?.[0]?.thumbnail;
  const title = trip.title || `${firstCity?.name || 'Unknown'} Trip`;

  return (
    <>
    <div className={styles.tripDate}>24 Ene al 30 Ene de 2025</div>
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
          <p className={styles.tripSites}>{trip.num_of_places} sitios añadidos</p>
          <p className={styles.tripDates}>
            {trip.initial_date} - {trip.end_date}
          </p>
        </div>
      </div>
      {/* {!isPast && ( */}
        <div className={styles.tripActions}>
          <div className={styles.tripActionsDropdown}>
            <div  className={styles.editButton}>Editar</div>
            <div className={styles.deleteButton}>Eliminar</div>
          </div>
        </div>
      {/* )} */}
    </div>
    </>
  );
};

export default TripCard;