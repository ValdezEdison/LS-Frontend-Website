import React from "react";
import styles from "./RecoveryForm.module.css";
import Loader from "../common/Loader";

function RecoveryForm({
  formData,
  fieldStates,
  handleInputChange,
  handleSubmit,
  handleFocus,
  handleBlur,
  isFormValid
}) {
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Recuperar contraseña</h1>
      <p className={styles.formDescription}>
        Para recuperar tu contraseña introduce tu correo electrónico y te
        mandaremos un link al email para restablecerla.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inputLabel}>
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${styles.input} ${
              fieldStates.email.error && fieldStates.email.touched ? styles.inputError : ""
            }`}
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            aria-label="Correo electrónico"
          />
          {!fieldStates.email.isValid && fieldStates.email.focused && (
            <div className={styles.infoMessage}>{fieldStates.email.info}</div>
          )}
          {fieldStates.email.error && fieldStates.email.touched && (
            <div className={styles.errorMessage}>{fieldStates.email.error}</div>
          )}
        </div>
        <button 
          type="submit" 
          className={`${styles.submitButton} ${isFormValid ? styles.active : ''}`}
          disabled={!isFormValid}
        >
          Enviar
        </button>
        <button 
        className="submitLoadingButton" 
        disabled={!isFormValid}
      >
        <div className="loaderBtnWrapper">
          <Loader/>
        </div>
       
      </button>
      </form>
      <p className={styles.helpText}>¿No te ha llegado ningún correo?</p>
    </div>
  );
}

export default RecoveryForm;