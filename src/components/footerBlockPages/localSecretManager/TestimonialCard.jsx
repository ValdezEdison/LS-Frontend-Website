"use client";
import React from "react";
import styles from "./TestimonialCard.module.css";

function TestimonialCard({ imageSrc, text, className }) {
  return (
    <article className={`${styles.testimonialCard} ${className}`}>
      <div className={styles.cardContent}>
        <img
          src={imageSrc}
          alt="Testimonial Avatar"
          className={styles.avatar}
        />
        <p className={styles.testimonialText}>{text}</p>
      </div>
    </article>
  );
}

export default TestimonialCard;
