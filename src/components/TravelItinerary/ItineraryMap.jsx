import React from "react";
import styles from "./ItineraryMap.module.css";

const ItineraryMap = () => {
  return (
    <div className={styles.itineraryMap}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/0281867c4ac5424ba871d937ba64a9e405e98dbb?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
        alt="Mapa del itinerario"
        className={styles.mapImage}
      />
      <div className={styles.mapOverlay}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/65706d473c49c974bce6e2bb4a2ab79daed16ab0?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Ruta del itinerario"
          className={styles.routeImage}
        />
        <div className={styles.carIcon} />
        <div className={styles.stopIcon} />
      </div>
    </div>
  );
};

export default ItineraryMap;
