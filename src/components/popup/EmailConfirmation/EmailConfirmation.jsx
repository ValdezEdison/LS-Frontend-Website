import React from "react";
import styles from "./EmailConfirmation.module.css";
import Logo from "./Logo";
import UserIcon from "./UserIcon";
import CloseButton from "./CloseButton";
import ConfirmationImage from "./ConfirmationImage";

function EmailConfirmation({ email, onClose, onResend }) {
  return (
    <div className={styles.modalInner}>
      <div className={styles.confirmationContent}>
        <div className={styles.confirmationBox}>
          <ConfirmationImage />
          <div className={styles.textContent}>
            <h2 className={styles.title}>Confirmación del email</h2>
            <p className={styles.description}>
              Hemos enviado un email a <strong>{email}</strong> para confirmar
              que la dirección de correo electrónico es correcta. Al
              recibir el email, haz click en el link para completar el
              registro.
            </p>
          </div>
        </div>
        <div className={styles.divider} />
      </div>
      <p className={styles.resendText}>
        <span className={styles.resendNormal}>
          Si no has recibido ningún email haz click en
        </span>{" "}
        <button
          className={styles.resendLink}
          onClick={onResend}
        >
          reenviar email de confirmación
        </button>
      </p>
    </div>
  );
}

export default EmailConfirmation;