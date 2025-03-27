import React from "react";
import styles from "./AlertPopup.module.css";
import CloseIcon from "./CloseIcon";

const AlertPopup = ({ handleNavigateToLogin }) => {
  return (
    <>
        <h2 className={styles.title}>¿Quieres darnos tu opinión?</h2>
        <p className={styles.description}>
          Regístrate o inicia sesión para escribir un comentario sobre el local
          secrets o evento al que has acudido.
        </p>
        <div className={styles.buttonWrapper}>
          <button className={styles.actionButton} onClick={handleNavigateToLogin}>
            Inicia sesión o crea una cuenta
          </button>
        </div>
        </>
  );
};

export default AlertPopup;
