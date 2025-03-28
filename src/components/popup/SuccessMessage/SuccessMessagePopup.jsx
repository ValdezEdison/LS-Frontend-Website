import React from "react";
import styles from "./SuccessMessagePopup.module.css";
import CloseIcon from "./CloseIcon";
import TickIcon from "./TickIcon";

const SuccessMessagePopup = ({ }) => {
  return (
      <div className={styles.messageBox}>
     
        <div className={styles.icon}>
          <TickIcon />
        </div>
        <h2 className={styles.title}>¡Comentario enviado correctamente!</h2>
        <p className={styles.description}>
          Recuerda que una vez se valide podrás editar o eliminar tu comentario.
        </p>
      </div>
  );
};

export default SuccessMessagePopup;
