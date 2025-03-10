import React from "react";
import styles from "./MuseumModal.module.css";
import ImageGallery from "./ImageGalleryPopupContent";
import ReviewSection from "./ReviewSectionPopupContent";

const MuseumModal = () => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>National historical museum</h2>
          <button className={styles.closeButton} aria-label="Close modal">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.9504 22.3637L9.63664 11.05C9.25009 10.6635 9.25009 10.0224 9.63664 9.63582C10.0232 9.24927 10.6643 9.24927 11.0509 9.63582L22.3646 20.9495C22.7511 21.3361 22.7511 21.9772 22.3646 22.3637C21.978 22.7503 21.3369 22.7503 20.9504 22.3637Z"
                fill="#292D32"
              />
              <path
                d="M9.63543 22.3637C9.24888 21.9772 9.24888 21.3361 9.63543 20.9495L20.9491 9.63582C21.3357 9.24927 21.9768 9.24927 22.3634 9.63582C22.7499 10.0224 22.7499 10.6635 22.3634 11.05L11.0496 22.3637C10.6631 22.7503 10.022 22.7503 9.63543 22.3637Z"
                fill="#292D32"
              />
            </svg>
          </button>
        </div>
        <div className={styles.modalContent}>
          <ImageGallery />
          <ReviewSection />
        </div>
      </div>
    </div>
  );
};

export default MuseumModal;
