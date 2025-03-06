import React from "react";
import styles from "./ReviewSection.module.css";

const ReviewSection = () => {
  const reviews = [
    {
      name: "Virginia I",
      date: "23/03/24",
      content:
        "Mirador muy concurrido! Tiene bonitas vistas, incluido el agua, pero sigo prefiriendo el punto de vista de la dama del monte porque es más alto y ofrece mejores vistas de la ciudad y no está tan lleno de gente.",
    },
    {
      name: "Virginia I",
      date: "23/03/24",
      content:
        "Mirador muy concurrido! Tiene bonitas vistas, incluido el agua, pero sigo prefiriendo el punto de vista de la dama del monte porque es más alto y ofrece mejores vistas de la ciudad y no está tan lleno de gente.",
    },
    {
      name: "Virginia I",
      date: "23/03/24",
      content:
        "Mirador muy concurrido! Tiene bonitas vistas, incluido el agua, pero sigo prefiriendo el punto de vista de la dama del monte porque es más alto y ofrece mejores vistas de la ciudad y no está tan lleno de gente.",
    },
  ];

  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewHeader}>
        <div>
          <h2 className={styles.reviewTitle}>Comentarios de los viajeros</h2>
          <div className={styles.ratingBlock}>
            <span className={styles.ratingScore}>4,5</span>
            <div className={styles.stars}>
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/4f73071d1dd5262ca8fb2a608304a91ce90d26710e0d62dabc6f4698d9cca148?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                  alt="Star"
                  className={styles.starIcon}
                />
              ))}
            </div>
            <span className={styles.reviewCount}>123 reseñas</span>
          </div>
        </div>
        <button className={styles.addReviewButton}>Añadir un comentario</button>
      </div>
      <div className={styles.tagContainer}>
        <span className={styles.tag}>Museo</span>
      </div>
      <div className={styles.reviewList}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c44397955bda573f2db9b8f3dfeb234842b0dc084b9036d4db025d6dcdbab67d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                alt="User avatar"
                className={styles.avatar}
              />
              <div>
                <h3 className={styles.reviewerName}>{review.name}</h3>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
            </div>
            <p className={styles.reviewContent}>{review.content}</p>
          </div>
        ))}
      </div>
      <button className={styles.viewAllButton}>
        Ver todos los comentarios
      </button>
    </section>
  );
};

export default ReviewSection;
