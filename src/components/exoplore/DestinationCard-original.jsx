import React from "react";
import styles from "./DestinationCard.module.css";
import { useTranslation } from "react-i18next";

const DestinationCard = ({ destinationId, name, results, image, handleActions }) => {

  const { t } = useTranslation("ExplorePage");

  return (
    <div className={styles.destinationCard} onClick={(e) => handleActions(e,'showSites', destinationId)}>
      <img
        src={image}
        alt={`Vista de ${name}`}
        className={styles.destinationImage}
      />
      <div className={styles.destinationInfo}>
        <h3 className={styles.destinationName}>{name}</h3>
        <p className={styles.destinationResults}>{t('results', { count: results })}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
