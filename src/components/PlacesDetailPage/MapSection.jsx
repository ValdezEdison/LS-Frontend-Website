import React from "react";
import styles from "./MapSection.module.css";
import Map from "../PlacesPage/Map";
const MapSection = ({ place, handleShowMapPopup }) => {
  return (
    <div className={styles.mapSection}>
      <Map onOpenPopup={handleShowMapPopup} />
      <div className={styles.openingHours}>
        <h3 className={styles.openingHoursTitle}>Horario de apertura:</h3>
        <ul className={styles.hoursList}>
        {place?.schedules.map((schedule, index) => (
            <li key={index} className={styles.hoursItem}>
              <span className={styles.day}>{schedule.day}</span>
              <span className={styles.hours}>
                {schedule.opening_hours[0]?.initial_hour} - {schedule.opening_hours[0]?.end_hour}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapSection;
