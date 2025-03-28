import React from "react";
import styles from "./ConfirmationPopup.module.css";

const ConfirmationPopup = ({ title, description, onCancel, onConfirm }) => {
  return (
    // <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalDescription}>{description}</p>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className={`${styles.button} ${styles.deleteButton}`}
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    // </div>
  );
};

export default ConfirmationPopup;
