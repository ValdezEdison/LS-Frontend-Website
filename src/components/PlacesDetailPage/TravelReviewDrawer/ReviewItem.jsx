import React from "react";
import styles from "./TravelerReviews.module.css";
import { Star, StarFill } from "../../common/Images";

const ReviewItem = ({ user, body, rating, created_at }) => {
  // Format the date to a more readable form
  const formattedDate = new Date(created_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? styles.starFilled : styles.starEmpty}
        >
          {i <= rating ? (
            <img src={StarFill} alt="filled star" />
          ) : (
            <img src={Star} alt="empty star" />
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.reviewItem}>
      <div className={styles.reviewRow}>
        <img
          src={user.profile_picture.thumbnail} // Use thumbnail for smaller images
          alt={`${user.username}'s avatar`}
          className={styles.avatar}
        />
        <div className={styles.reviewerName}>
          {user.username}
          {/* Assuming country is not provided in the API, you can remove or adjust this part */}
          {/* <div className={styles.reviewerCountry}>{country}</div> */}
        </div>
        <div className={styles.reviewContent}>
          <div className={styles.reviewRating}>
            <div className={styles.starRating}>
              {renderStars(rating)} {/* Use the renderStars function here */}
            </div>
            <span>{rating}</span>
          </div>
          <div className={styles.reviewDate}>
            Fecha del comentario: {formattedDate}
          </div>
          <div className={styles.reviewText}>{body}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;