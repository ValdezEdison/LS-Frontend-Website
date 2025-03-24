import React from "react";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = ({
  formData,
  errors,
  showPassword,
  handleInputChange,
  togglePasswordVisibility,
  handleSubmit,
  handleNavigate
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Username Input */}
      <div className={`${styles.inputGroup} ${styles.error}`}>
        <label htmlFor="username" className={styles.label}>
          Nombre de usuario
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Nombre y apellidos"
          className={`${styles.input} ${
            errors.username ? styles.inputError : ""
          }`}
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && (
          <div className={styles.errorMessage}>{errors.username}</div>
         )} 
      </div>

      {/* Email Input */}
      <div className={`${styles.inputGroup} ${errors.has_error_in_password && styles.error}`}>
        <label htmlFor="email" className={styles.label}>
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="nombre@ejemplo.com"
          className={`${styles.input} ${
            errors.email ? styles.inputError : ""
          }`}
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && (
          <div className={styles.errorMessage}>{errors.email}</div>
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
              errors.phone ? styles.inputError : ""
            }`}
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        {errors.phone && (
          <div className={styles.errorMessage}>{errors.phone}</div>
        )}
      </div>

      {/* Password Input */}
      <div className={`${styles.inputGroup} ${styles.error}`}>
        <label htmlFor="password" className={styles.label}>
          Contraseña
        </label>
        <div className={styles.passwordRequirements}>
          Debe de constar <strong>al menos de 8 caracteres</strong> y contener
          mínimo
          <strong> un número, una mayúscula y un símbolo.</strong>
        </div>
        <div className={styles.passwordInput}>
          <div className={`${styles.showPassword} ${styles.clicked}`} onClick={togglePasswordVisibility}></div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Introduce una contraseña"
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        {errors.password && (
          <div className={styles.errorMessage}>{errors.password}</div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className={styles.termsGroup}>
      <label className="radioContainer terms-check">
        <input type="radio" id="terms" name="terms" checked={formData.terms}
            onChange={handleInputChange}/>
        <span className="checkmark"></span>
        Acepta los
        <span className={styles.termsLink}>Términos y Condiciones</span>
      </label>
        {/* <label className="check-container terms-check">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
          />
          <span className="checkmark"></span>
          Acepta los
          <span className={styles.termsLink}>Términos y Condiciones</span>
        </label> */}
        {errors.terms && (
          <div className={styles.errorMessage}>{errors.terms}</div>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className={`${styles.submitButton} ${styles.active}`}>
        Crear cuenta
      </button>

      {/* Login Prompt */}
      <p className={styles.loginPrompt}>
        ¿Ya tienes cuenta?{" "}
        <span className={styles.loginLink} onClick={handleNavigate}>Inicia sesión</span>
      </p>
    </form>
  );
};

export default RegistrationForm;