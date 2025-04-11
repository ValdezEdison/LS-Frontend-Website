import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/3ec1e9c231dd989946c44dff0e825f167f140499?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Logo"
            className={styles.footerLogo}
          />
          <button className={styles.appDownloadButton}>
            Descarga nuestra app
          </button>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Conócenos</h3>
          <ul className={styles.sectionList}>
            <li>Quiénes somos</li>
            <li>Trabaja con nosotros</li>
            <li>La vida en Local Secrets</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Colaboradores</h3>
          <ul className={styles.sectionList}>
            <li>Embajadores</li>
            <li>Local secret managers</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Recursos</h3>
          <ul className={styles.sectionList}>
            <li>Contacto</li>
            <li>Centro de ayuda</li>
            <li>
              <a href="#login" className={styles.loginLink}>
                Inicio sesión LS managers
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className={styles.footerDivider} />
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          Copyright Local Secrets 2024 · Condiciones generales · Política de
          privacidad · Gestión de cookies
        </p>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/808cf602fb903b01c533f26eb7c318be22919ddc?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Social Media"
          className={styles.socialIcon}
        />
      </div>
    </footer>
  );
};

export default Footer;
