import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.footerDivider} />
      <p className={styles.footerText}>
        Al iniciar sesión o al crear una cuenta, aceptas nuestros{" "}
        <a href="#" className={styles.footerLink}>
          Términos y condiciones
        </a>{" "}
        y la{" "}
        <a href="#" className={styles.footerLink}>
          Política de privacidad
        </a>
        <br />
        Todos los derechos reservados.
        <br />
        Copyright (2024) - Local Secrets
      </p>
    </footer>
  );
};

export default Footer;
