import React from "react";
import styles from "./RecoveryForm.module.css";
import Loader from "../common/Loader";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function RecoveryForm({
  formData,
  fieldStates,
  handleInputChange,
  handleSubmit,
  handleFocus,
  handleBlur,
  isFormValid
}) {

  const { loading } = useSelector((state) => state.auth);
  const { t } = useTranslation('PasswordRecovery');

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>{t('passwordRecovery.title')}</h1>
      <p className={styles.formDescription}>
      {t('passwordRecovery.description')}
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inputLabel}>
          {t('passwordRecovery.form.email.label')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${styles.input} ${fieldStates.email.error && fieldStates.email.touched ? styles.inputError : ""
              }`}
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            aria-label="Correo electrónico"
          />
          {/* {!fieldStates.email.isValid && fieldStates.email.focused && (
            <div className={styles.infoMessage}>{fieldStates.email.info}</div>
          )} */}
          {fieldStates.email.error && fieldStates.email.touched && (
            <div className={styles.errorMessage}> {fieldStates.email.error === "Please enter your email"
              ? t('passwordRecovery.form.email.errors.required')
              : t('passwordRecovery.form.email.errors.invalid')}</div>
          )}
        </div>
        {loading ? (
          <button
            className="submitLoadingButton"
            disabled={!isFormValid}
          >
            <div className="loaderBtnWrapper">
              <Loader />
            </div>

          </button>
        ) :
          <button
            type="submit"
            className={`${styles.submitButton} ${isFormValid ? styles.active : ''}`}
            disabled={!isFormValid}
          >
            {t('passwordRecovery.form.submit')}
          </button>
        }


      </form>
      <p className={styles.helpText}>{t('passwordRecovery.form.helpText')}</p>
    </div>
  );
}

export default RecoveryForm;