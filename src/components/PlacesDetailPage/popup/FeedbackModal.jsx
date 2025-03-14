import React from "react";
import styles from "./FeedbackModal.module.css";
import CloseIcon from "./CloseIcon";

const FeedbackModal = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        <h2 className={styles.title}>¿Quieres darnos tu opinión?</h2>
        <p className={styles.description}>
          Regístrate o inicia sesión para escribir un comentario sobre el local
          secrets o evento al que has acudido.
        </p>
        <div className={styles.buttonWrapper}>
          <button className={styles.actionButton}>
            Inicia sesión o crea una cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
