import React from "react";
import styles from "./SuccessPopup.module.css";
import CheckIcon from "./CheckIcon";
import CloseIcon from "./CloseIcon";

const SuccessPopup = ({message, onClose }) => {

  return (
    // <div className={styles.modal}>
      <div className={styles.modalContent}>
        <CheckIcon className={styles.checkIcon} />
        <h2 className={styles.modalTitle}>
          ¡Comentario enviado correctamente!
        </h2>
        <p className={styles.modalDescription}>
          Recuerda que una vez se valide podrás editar o eliminar tu comentario.
        </p>
        <button
          className={styles.closeIcon}
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <CloseIcon />
        </button>
      </div>
    // </div>
  );
};

export default SuccessPopup;
