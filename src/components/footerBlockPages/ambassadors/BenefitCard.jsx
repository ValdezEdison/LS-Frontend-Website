import React from "react";
import styles from "./BenefitCard.module.css";

function BenefitCard({ image, title }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}

export default BenefitCard;
