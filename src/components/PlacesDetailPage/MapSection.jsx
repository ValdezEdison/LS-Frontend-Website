import React from "react";
import styles from "./MapSection.module.css";
import Map from "../PlacesPage/Map";
import { useTranslation } from "react-i18next";

const MapSection = ({ place, handleShowMapPopup }) => {
  const { t } = useTranslation("DetailsPage");

  return (
    <div className={styles.mapSection}>
      <Map onOpenPopup={handleShowMapPopup} />
      <div className={styles.openingHours}>
        <h3 className={styles.openingHoursTitle}>{t("header.openingHours")}:</h3>
        <ul className={styles.hoursList}>
          {/* --- THIS IS THE FIX --- */}
          {/* First, check if the place is always open. */}
          {place?.always_open ? (
            // If it is, display a specific message with an hour icon.
            <li className={styles.hoursItem}> 
              <span className={styles.day}> {t("header.alwaysOpen")}</span>
            </li>
            ) : (
            // Otherwise, map over the schedules as before.
       place?.schedules
          .filter(schedule => schedule.opening_hours.length > 0) // Only show days with opening hours
          .map((schedule, index) => (
            <li key={index} className={styles.hoursItem}>
              <span className={styles.day}>{schedule.day}</span>
              <span className={styles.hours}>
                {schedule?.opening_hours.map((hour, hourIndex) => (
                  <span key={hourIndex}>
                    {hour.initial_hour} - {hour.end_hour}
                    {hourIndex < schedule.opening_hours.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </span>
            </li>
          ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default MapSection;
