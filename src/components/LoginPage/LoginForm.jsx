import React from "react";
import styles from "./LoginForm.module.css";
import Loader from "../common/Loader";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const LoginForm = ({
  formData,
  fieldStates,
  showPassword,
  handleInputChange,
  handleTogglePassword,
  handleSubmit,
  handleNavigate,
  isFormValid,
  handleFocus,
  handleBlur,
  rememberMe,
  setRememberMe,
}) => {

  const { loading } = useSelector((state) => state.auth);
  const { t } = useTranslation('Login');
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      {/* Email Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
        {t('email')}
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className={`${styles.input} ${
            fieldStates.email.error && fieldStates.email.touched ? styles.inputError : ""
          }`}
          placeholder={t('emailPlaceholder')}
          value={formData.email}
          onChange={handleInputChange}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
        />
        {/* {!fieldStates.email.isValid && fieldStates.email.focused && (
          <div className={styles.infoMessage}>{fieldStates.email.info}</div>
        )} */}
        {fieldStates.email.error && fieldStates.email.touched && (
          <div className={styles.errorMessage}>{fieldStates.email.error}</div>
        )}
      </div>

      {/* Password Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
        {t('password')}
        </label>
        <div className={styles.passwordInput}>
          <div 
            className={`${styles.showPassword} ${showPassword ? styles.clicked : ''}`} 
            onClick={handleTogglePassword}
          ></div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className={`${styles.input} ${
              fieldStates.password.error && fieldStates.password.touched ? styles.inputError : ""
            }`}
            placeholder={t('passwordPlaceholder')}
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
          />
        </div>
        {/* {!fieldStates.password.isValid && fieldStates.password.focused && (
          <div className={styles.infoMessage}>{fieldStates.password.info}</div>
        )} */}
        {fieldStates.password.error && fieldStates.password.touched && (
          <div className={styles.errorMessage}>{fieldStates.password.error}</div>
        )}
      </div>

      {/* Remember Me and Forgot Password */}
      <div className={styles.optionsRow}>
        <div className={styles.rememberMe}>
          <label className="check-container login-check">
            <input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
            <span className="checkmark"></span>
            {t('rememberMe')}
          </label>
        </div>
        <a onClick={() => handleNavigate('/password-recovery')} className={styles.forgotPassword}>
        {t('forgotPassword')}
        </a>
      </div>

      {/* Submit Button */}
      {loading ? (
        <button 
        className="submitLoadingButton" 
        disabled={!isFormValid}
      >
        <div className="loaderBtnWrapper">
          <Loader/>
        </div>
       
      </button>
      ): (
        <button 
        type="submit" 
        className={`${styles.submitButton} ${isFormValid ? styles.active : ''}`}
        disabled={!isFormValid}
      >
         {t('submitButton')}
      </button>
      )}
   
      

      {/* Register Prompt */}
      <p className={styles.registerPrompt}>
      {t('noAccount')}{" "}
        <a className={styles.registerLink} onClick={() => handleNavigate('/register')}>
        {t('register')}
        </a>
      </p>
    </form>
  );
};

export default LoginForm;