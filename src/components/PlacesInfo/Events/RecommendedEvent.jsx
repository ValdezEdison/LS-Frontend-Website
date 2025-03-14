import React from "react";
import styles from "./RecommendedEvent.module.css";

function RecommendedEvent({ title, image }) {
  return (
    <div className={styles.recommendedEvent}>
      <img src={image} alt={title} className={styles.eventImage} />
      <p className={styles.eventTitle}>{title}</p>
    </div>
  );
}

export default RecommendedEvent;
