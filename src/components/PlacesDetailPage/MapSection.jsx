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
        <h3 className={styles.openingHoursTitle}>{t('header.openingHours')}:</h3>
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
