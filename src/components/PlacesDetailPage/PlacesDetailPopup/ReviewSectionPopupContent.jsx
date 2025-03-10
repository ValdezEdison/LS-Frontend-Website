import React from 'react';
import styles from './MuseumModal.module.css';

const ReviewSectionPopupContent = () => {
  const reviews = [
    {
      text: "Mirador muy concurrido! Tiene bonitas vistas, incluido el agua, pero sigo prefiriendo el punto de vista de la dama del monte porque es más alto y ofrece mejores vistas de la ciudad y no está tan lleno de gente.",
      name: "Virginia I",
      location: "España"
    },
    {
      text: "Mirador muy concurrido! Tiene bonitas vistas, incluido el agua, pero sigo prefiriendo el punto de vista de la dama del monte porque es más alto y ofrece mejores vistas de la ciudad y no está tan lleno de gente.",
      name: "Virginia I",
      location: "España"
    },
    {
      text: "Mirador muy concurrido! Tiene bonitas vistas, incluido el agua, pero sigo prefiriendo el punto de vista de la dama del monte porque es más alto y ofrece mejores vistas de la ciudad y no está tan lleno de gente.",
      name: "Virginia I",
      location: "España"
    },
    {
      text: "Mirador muy concurrido! Tiene bonitas vistas, incluido el agua, pero sigo prefiriendo el punto de vista de la dama del monte porque es más alto y ofrece mejores vistas de la ciudad y no está tan lleno de gente.",
      name: "Virginia I",
      location: "España"
    },
    {
      text: "Mirador muy concurrido! Tiene bonitas vistas, incluido el agua, pero sigo prefiriendo el punto de vista de la dama del monte porque es más alto y ofrece mejores vistas de la ciudad y no está tan lleno de gente.",
      name: "Virginia I",
      location: "España"
    },
    {
      text: "Mirador muy concurrido! Tiene bonitas vistas, incluido el agua, pero sigo prefiriendo el punto de vista de la dama del monte porque es más alto y ofrece mejores vistas de la ciudad y no está tan lleno de gente.",
      name: "Virginia I",
      location: "España"
    }
  ];

  return (
    <div className={styles.reviewsSection}>
      <div className={styles.ratingContainer}>
        <div className={styles.ratingScore}>4,5</div>
        <div className={styles.ratingDetails}>
          <div className={styles.stars}>
          
          </div>
          <div className={styles.reviewCount}>123 reseñas</div>
        </div>
      </div>
      <h3 className={styles.reviewsTitle}>Comentarios de los viajeros:</h3>
      <ul className={styles.reviewList}>
        {reviews.map((review, index) => (
          <li key={index} className={styles.reviewItem}>
            <p className={styles.reviewText}>{review.text}</p>
            <div className={styles.reviewerInfo}>
              <div className={styles.reviewerAvatar} aria-hidden="true" />
              <span className={styles.reviewerName}>{review.name}</span>
              <span className={styles.reviewerLocation}>{review.location}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewSectionPopupContent;