import React from 'react';
import styles from './MuseumModal.module.css';
import { ProfilePlaceholder, Star, StarFill } from "../../common/Images";
import { useTranslation } from 'react-i18next'; // 1. Import the hook

const ReviewSectionPopupContent = ({ placeDetails, reviews }) => {
  const { t } = useTranslation("DetailsPage");

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
          {/* 3. Replace hardcoded text with the 't' function */}
          <div className={styles.reviewCount}>
            {t('reviews.reviewsCount', { count: reviews.length })}
          </div>
        </div>
      </div>
      {/* 4. Replace hardcoded title */}
      <h3 className={styles.reviewsTitle}>{t('reviews.travelerCommentsTitle')}</h3>
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