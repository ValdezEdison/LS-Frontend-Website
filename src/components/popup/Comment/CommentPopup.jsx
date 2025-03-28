import React from "react";
import styles from "./CommentPopup.module.css";
import StarRating from "./StarRating";

const CommentPopup = ({ 
  comment, 
  rating, 
  onCommentChange, 
  onRatingChange, 
  onSubmit 
}) => {
  return (
    <div className={styles.CommentPopupMain}>
      <h3 className={styles.subtitle}>National historical museum</h3>
      
      <label htmlFor="rating" className={styles.ratingLabel}>
        Rating:
      </label>
      <div className={styles.ratingContainer} id="rating">
        <StarRating 
          rating={rating} 
          onRatingChange={onRatingChange} 
        />
      </div>
      
      <label htmlFor="commentText" className={styles.commentLabel}>
        Comment:
      </label>
      <div className={styles.textareaContainer}>
        <textarea
          id="commentText"
          className={styles.textarea}
          placeholder="Write your comment here"
          value={comment}
          onChange={onCommentChange}
          maxLength={400}
        />
        <div className={styles.characterCount}>
          {comment.length}/400
        </div>
      </div>
      
      <div className={styles.submitContainer}>
        <button 
          className={styles.submitButton} 
          onClick={onSubmit}
          disabled={!comment.trim() || rating === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentPopup;