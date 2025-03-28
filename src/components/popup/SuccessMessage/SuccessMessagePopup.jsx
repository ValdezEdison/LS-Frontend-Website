import React from "react";
import styles from "./SuccessMessagePopup.module.css";
import CloseIcon from "./CloseIcon";
import TickIcon from "./TickIcon";

const SuccessMessagePopup = ({title, message }) => {
  return (
      <div className={styles.messageBox}>
     
        <div className={styles.icon}>
          <TickIcon />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          {message}
        </p>
      </div>
  );
};

export default SuccessMessagePopup;
