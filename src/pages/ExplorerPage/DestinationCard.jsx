import React from "react";
import styles from "./DestinationCard.module.css";

const DestinationCard = ({ name, results, image }) => {
  return (
    <div className={styles.destinationCard}>
      <img
        src={image}
        alt={`Vista de ${name}`}
        className={styles.destinationImage}
      />
      <div className={styles.destinationInfo}>
        <h3 className={styles.destinationName}>{name}</h3>
        <p className={styles.destinationResults}>{results} resultados</p>
      </div>
    </div>
  );
};

export default DestinationCard;
