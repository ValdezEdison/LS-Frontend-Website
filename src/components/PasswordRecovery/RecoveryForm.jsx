import React from "react";
import styles from "./RecoveryForm.module.css";

function RecoveryForm() {
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Recuperar contraseña</h1>
      <p className={styles.formDescription}>
        Para recuperar tu contraseña introduce tu correo electrónico y te
        mandaremos un link al email para restablecerla.
      </p>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inputLabel}>
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            defaultValue="pablogomez@gmail.com"
            className={styles.input}
            aria-label="Correo electrónico"
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Enviar
        </button>
      </form>
      <p className={styles.helpText}>¿No te ha llegado ningún correo?</p>
    </div>
  );
}

export default RecoveryForm;
