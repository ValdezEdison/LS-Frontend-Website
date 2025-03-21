import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.termsAndPolicy}>
        <p>
          Al iniciar sesión o al crear una cuenta, aceptas nuestros
          <a href="#" className={styles.link}>
            Términos y condiciones
          </a>
          y la
          <a href="#" className={styles.link}>
            Política de privacidad
          </a>
        </p>
      </div>
      <div className={styles.copyright}>
        Copyright (2024) - Local Secrets. Todos los derechos reservados.
      </div>
      <div className={styles.businessSignup}>
        <p>¿Tienes un negocio?</p>
        <a href="#" className={styles.link}>
          Registrarme como Local Secret Manager
        </a>
      </div>
    </footer>
  );
};

export default Footer;
