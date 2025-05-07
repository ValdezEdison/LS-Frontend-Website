import React from 'react';
import styles from './MuseumModal.module.css';
import { Profilecircle, ProfilePlaceholder, Star, StarFill } from "../../common/Images";

const ReviewSectionPopupContent = ({ placeDetails, reviews }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.starEmpty}>
          {i <= rating ? <img src={StarFill} alt="filled star" /> : <img src={Star} alt="empty star" />}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.reviewsSection}>
      <div className={styles.ratingContainer}>
        <div className={styles.ratingScore}>{placeDetails.rating}</div>
        <div className={styles.ratingDetails}>
          <div className={styles.stars}>
            {renderStars(placeDetails.rating)}
          </div>
          <div className={styles.reviewCount}>{reviews.length} reseñas</div>
        </div>
      </div>
      <h3 className={styles.reviewsTitle}>Comentarios de los viajeros:</h3>
      <ul className={styles.reviewList}>
        {reviews.map((review, index) => (
          <li key={review.id || index} className={styles.reviewItem}>
            <div className={styles.reviewContent}>
              <p className={styles.reviewText}>{review.body}</p>
            </div>
            <div className={styles.reviewerInfo}>
              <img
                src={review.user.profile_picture.original || ProfilePlaceholder}
                alt={review.user.username}
                className={styles.reviewerAvatar}
              />
              <span className={styles.reviewerName}>{review.user.username}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewSectionPopupContent;