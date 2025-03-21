import React from "react";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <form className={styles.loginForm}>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          className={styles.input}
          placeholder="nombre@ejemplo.com"
          aria-label="Correo electrónico"
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Contraseña
        </label>
        <div className={styles.passwordInput}>
          <div className={styles.showPassword}></div>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Introduce una contraseña"
            aria-label="Contraseña"
          />
        </div>
       
      </div>
      <div className={styles.optionsRow}>
        <div className={styles.rememberMe}>
          {/* <input type="checkbox" id="remember" className={styles.checkbox} />
          <label htmlFor="remember" className={styles.checkboxLabel}>
            Recuérdame
          </label> */}
          <label className="check-container login-check">
          <input type="checkbox" id="remember"/>


                        <span className="checkmark"></span>
                        Recuérdame
                      </label>
                   
        </div>
        <a href="#" className={styles.forgotPassword}>
          ¿Has olvidado la contraseña?
        </a>
      </div>
      <button type="submit" className={styles.submitButton}>
        Iniciar sesión
      </button>
      <p className={styles.registerPrompt}>
        ¿No tienes cuenta?{" "}
        <a href="#" className={styles.registerLink}>
          Regístrate
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
