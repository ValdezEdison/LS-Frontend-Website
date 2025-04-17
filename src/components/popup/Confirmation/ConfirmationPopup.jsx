import React from "react";
import styles from "./ConfirmationPopup.module.css";
import { useTranslation } from "react-i18next";

const ConfirmationPopup = ({ title, description, onCancel, onConfirm }) => {
  const { t } = useTranslation("DetailsPage");
  return (
      <div className={styles.deleteConfirmationMain}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalDescription}>{description}</p>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onCancel}
          >
            {t('confirmationPopup.deleteComment.cancel')}
          </button>
          <button
            className={`${styles.button} ${styles.deleteButton}`}
            onClick={onConfirm}
          >
            {t('confirmationPopup.deleteComment.confirm')}
          </button>
        </div>
        </div>
  );
};

export default ConfirmationPopup;
