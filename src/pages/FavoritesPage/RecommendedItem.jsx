import React from "react";
import styles from "./RecommendedItem.module.css";

const RecommendedItem = ({ image, title }) => {
  return (
    <div className={styles.recommendedItem}>
      <img src={image} alt={title} className={styles.recommendedImage} />
      <h3 className={styles.recommendedTitle}>{title}</h3>
    </div>
  );
};

export default RecommendedItem;
