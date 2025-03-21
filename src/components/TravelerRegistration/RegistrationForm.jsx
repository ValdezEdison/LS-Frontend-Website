import React from "react";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = ({ showPassword, togglePasswordVisibility }) => {
  return (
    <form className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="username" className={styles.label}>
          Nombre de usuario
        </label>
        <input
          type="text"
          id="username"
          placeholder="Nombre y apellidos"
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          placeholder="nombre@ejemplo.com"
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="phone" className={styles.label}>
          Teléfono
        </label>
        <div className={styles.phoneInput}>
          <select className={styles.select}>
            <option>+000</option>
          </select>
          <input
            type="tel"
            id="phone"
            placeholder="123 456 789"
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Contraseña
        </label>
        <div className={styles.passwordRequirements}>
          Debe de constar <strong>al menos de 8 caracteres</strong> y contener
          mínimo
          <strong> un número, una mayúscula y un símbolo.</strong>
        </div>
        <div className={styles.passwordInput}>
          <div className={styles.showPassword}></div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Introduce una contraseña"
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.termsGroup}>
      <label className="check-container terms-check">
          <input type="checkbox" id="terms"/>
            <span className="checkmark"></span>
            Acepta los 
            <span className={styles.termsLink}>Términos y Condiciones</span>
      </label>
                   
       
      </div>
      <button type="submit" className={styles.submitButton}>
        Crear cuenta
      </button>
      <p className={styles.loginPrompt}>
        ¿Ya tienes cuenta?{" "}
        <span className={styles.loginLink}>Inicia sesión</span>
      </p>
    </form>
  );
};

export default RegistrationForm;
