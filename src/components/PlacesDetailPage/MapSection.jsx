import React from "react";
import styles from "./MapSection.module.css";

const MapSection = () => {
  return (
    <div className={styles.mapSection}>
      <div className={styles.mapContainer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1be9944e10236113084d403d17d26bcff994236ff9a8f4b5fa063ceea9328db2?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Map of museum location"
          className={styles.mapImage}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/df11d3e639a6734868b974ac4877f86bc7a88fb56257cdfa7b7842afa8e6a10c?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Location pin"
          className={styles.locationPin}
        />
        <button className={styles.viewMapButton}>Ver mapa</button>
      </div>
      <div className={styles.openingHours}>
        <h3 className={styles.openingHoursTitle}>Horario de apertura:</h3>
        <ul className={styles.hoursList}>
          {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(
            (day) => (
              <li key={day} className={styles.hoursItem}>
                <span className={styles.day}>{day}</span>
                <span className={styles.hours}>08:00 AM - 04:00 PM</span>
              </li>
            )
          )}
          <li className={styles.hoursItem}>
            <span className={styles.day}>Domingo</span>
            <span className={styles.hours}>Cerrado</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MapSection;
