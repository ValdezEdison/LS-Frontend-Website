import React from "react";
import styles from "./TestimonialCard.module.css";

function TestimonialCard({ avatar, text }) {
  return (
    <div className={styles.card}>
      <img src={avatar} alt="Avatar" className={styles.avatar} />
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default TestimonialCard;
