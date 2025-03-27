import React, { useState } from "react";
import styles from "./CommentPopup.module.css";
import StarRating from "./StarRating";
import CloseIcon from "./CloseIcon";

const CommentPopup = ({ }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Comment submitted:", comment);
    onClose();
  };

  return (
    <>
        <h3 className={styles.subtitle}>National historical museum</h3>
        <label htmlFor="rating" className={styles.ratingLabel}>
          Puntuación general:
        </label>
        <div className={styles.ratingContainer} id="rating">
          <StarRating />
        </div>
        <label htmlFor="commentText" className={styles.commentLabel}>
          Comentario:
        </label>
        <div className={styles.textareaContainer}>
          <textarea
            id="commentText"
            className={styles.textarea}
            placeholder="Escribe un comentario"
            value={comment}
            onChange={handleCommentChange}
            maxLength={400}
          />
          <div className={styles.characterCount}>{comment.length}/400</div>
        </div>
        <div className={styles.submitContainer}>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Enviar
          </button>
        </div>
        </>
  );
};

export default CommentPopup;
