import React from "react";
import styles from "./CommentPopup.module.css";
import StarRating from "./StarRating";
import { useTranslation } from "react-i18next";

const CommentPopup = ({ 
  title,
  comment, 
  rating, 
  errors,
  touched,
  onCommentChange, 
  onRatingChange,
  onFieldBlur,
  onSubmit,
  isEditing
}) => {
  const { t } = useTranslation("DetailsPage");
  return (
    <div className={styles.CommentPopupMain}>
      <h3 className={styles.subtitle}>{title}</h3>
      
      <label htmlFor="rating" className={styles.ratingLabel}>
      {t('commentPopup.ratingLabel')}
      </label>
      <div 
        className={`${styles.ratingContainer} ${errors.rating && touched.rating ? styles.error : ''}`} 
        id="rating"
      >
        <StarRating 
          rating={rating} 
          onRatingChange={onRatingChange} 
        />
        {errors.rating && touched.rating && (
          <div className="errorMessage">{errors.rating}</div>
        )}
      </div>
      
      <label htmlFor="commentText" className={styles.commentLabel}>
      {t('commentPopup.commentLabel')}
      </label>
      <div className={styles.textareaContainer}>
        <textarea
          id="commentText"
          className={`${styles.textarea}  ${errors.text && touched.text ? 'error' : ''}`}
          placeholder={t('commentPopup.placeholder')}
          value={comment}
          onChange={onCommentChange}
          onBlur={() => onFieldBlur('text')}
          maxLength={400}
        />

        <div className={styles.characterCount}>
        {t('reviews.characterCount', { current: comment.length })}
        </div>
        {errors.text && touched.text && (
          <div className="errorMessage">{errors.text}</div>
        )}
      </div>
      
      <div className={styles.submitContainer}>
        <button 
          className={styles.submitButton} 
          onClick={onSubmit}
        >
          {isEditing ? t('reviews.update') : t('reviews.submit')}
        </button>
      </div>
    </div>
  );
};

export default CommentPopup;