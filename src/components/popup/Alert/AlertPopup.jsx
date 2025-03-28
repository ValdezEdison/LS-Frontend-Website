import React from "react";
import styles from "./AlertPopup.module.css";
import CloseIcon from "./CloseIcon";

const AlertPopup = ({ handleNavigateToLogin, title="", description="", buttonText="" }) => {
  return (
    <>
      <div className={styles.alertPopupMain}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          {description}
        </p>
        <div className={styles.buttonWrapper}>
          <button className={styles.actionButton} onClick={handleNavigateToLogin}>
            {buttonText}
          </button>
        </div>
        </div>
        </>
  );
};

export default AlertPopup;
