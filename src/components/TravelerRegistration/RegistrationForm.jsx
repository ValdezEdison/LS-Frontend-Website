import React from "react";
import styles from "./RegistrationForm.module.css";
import Loader from "../common/Loader";

const RegistrationForm = ({
  formData,
  fieldStates,
  showPassword,
  handleInputChange,
  togglePasswordVisibility,
  handleSubmit,
  handleNavigate,
  handleFocus,
  handleBlur,
  isFormValid
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Username Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="username" className={styles.label}>
          Nombre de usuario
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Nombre y apellidos"
          className={`${styles.input} ${
            fieldStates.username.error && fieldStates.username.touched ? styles.inputError : ""
          }`}
          value={formData.username}
          onChange={handleInputChange}
          onFocus={() => handleFocus('username')}
          onBlur={() => handleBlur('username')}
        />
        {!fieldStates.username.isValid && fieldStates.username.focused && (
          <div className={styles.infoMessage}>{fieldStates.username.info}</div>
        )}
        {fieldStates.username.error && fieldStates.username.touched && (
          <div className={styles.errorMessage}>{fieldStates.username.error}</div>
        )}
      </div>

      {/* Email Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="nombre@ejemplo.com"
          className={`${styles.input} ${
            fieldStates.email.error && fieldStates.email.touched ? styles.inputError : ""
          }`}
          value={formData.email}
          onChange={handleInputChange}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
        />
        {!fieldStates.email.isValid && fieldStates.email.focused && (
          <div className={styles.infoMessage}>{fieldStates.email.info}</div>
        )}
        {fieldStates.email.error && fieldStates.email.touched && (
          <div className={styles.errorMessage}>{fieldStates.email.error}</div>
        )}
      </div>

      {/* Phone Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="phone" className={styles.label}>
          Teléfono
        </label>
        <div className={styles.phoneInput}>
          <div className={styles.phoneCodeWrapper}>
            <select className={styles.select}>
              <option>+000</option>
            </select>
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="123 456 789"
            className={`${styles.input} ${
              fieldStates.phone.error && fieldStates.phone.touched ? styles.inputError : ""
            }`}
            value={formData.phone}
            onChange={handleInputChange}
            onFocus={() => handleFocus('phone')}
            onBlur={() => handleBlur('phone')}
          />
        </div>
        {!fieldStates.phone.isValid && fieldStates.phone.focused && (
          <div className={styles.infoMessage}>{fieldStates.phone.info}</div>
        )}
        {fieldStates.phone.error && fieldStates.phone.touched && (
          <div className={styles.errorMessage}>{fieldStates.phone.error}</div>
        )}
      </div>

      {/* Password Input */}
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Contraseña
        </label>
        <div className={styles.passwordRequirements}>
          Debe de constar <strong>al menos de 8 caracteres</strong> y contener
          mínimo <strong>un número, una mayúscula y un símbolo.</strong>
        </div>
        <div className={styles.passwordInput}>
          <div 
            className={`${styles.showPassword} ${showPassword ? styles.clicked : ''}`} 
            onClick={togglePasswordVisibility}
          ></div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Introduce una contraseña"
            className={`${styles.input} ${
              fieldStates.password.error && fieldStates.password.touched ? styles.inputError : ""
            }`}
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
          />
        </div>
        {!fieldStates.password.isValid && fieldStates.password.focused && (
          <div className={styles.infoMessage}>{fieldStates.password.info}</div>
        )}
        {fieldStates.password.error && fieldStates.password.touched && (
          <div className={styles.errorMessage}>{fieldStates.password.error}</div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className={styles.termsGroup}>
        <label className={styles.radioContainer}>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            onFocus={() => handleFocus('terms')}
            onBlur={() => handleBlur('terms')}
          />
          <span className={styles.checkmark}></span>
          Acepta los
          <span className={styles.termsLink}>Términos y Condiciones</span>
        </label>
        {fieldStates.terms.error && fieldStates.terms.touched && (
          <div className={styles.errorMessage}>{fieldStates.terms.error}</div>
        )}
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className={`${styles.submitButton} ${isFormValid ? styles.active : ''}`}
        disabled={!isFormValid}
      >
        Crear cuenta
      </button>
      <button 
        className="submitLoadingButton" 
        disabled={!isFormValid}
      >
        <div className="loaderBtnWrapper">
          <Loader/>
        </div>
       
      </button>

      {/* Login Prompt */}
      <p className={styles.loginPrompt}>
        ¿Ya tienes cuenta?{" "}
        <span className={styles.loginLink} onClick={handleNavigate}>
          Inicia sesión
        </span>
      </p>
    </form>
  );
};

export default RegistrationForm;