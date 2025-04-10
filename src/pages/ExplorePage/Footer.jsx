import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1195b51102a6c8fe3d9dd4f251325558f8bbba34?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Local Secrets App"
            className={styles.footerLogo}
          />
          <button className={styles.downloadButton}>
            Descarga nuestra app
          </button>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Conócenos</h3>
          <ul className={styles.footerList}>
            <li>
              <a href="/about">Quiénes somos</a>
            </li>
            <li>
              <a href="/careers">Trabaja con nosotros</a>
            </li>
            <li>
              <a href="/life">La vida en Local Secrets</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Colaboradores</h3>
          <ul className={styles.footerList}>
            <li>
              <a href="/ambassadors">Embajadores</a>
            </li>
            <li>
              <a href="/managers">Local secret managers</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Recursos</h3>
          <ul className={styles.footerList}>
            <li>
              <a href="/contact">Contacto</a>
            </li>
            <li>
              <a href="/help">Centro de ayuda</a>
            </li>
            <li>
              <a href="/login" className={styles.loginLink}>
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
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/928ccf91c793777140a613dd4287ac5bb2903e87?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Social Media"
          className={styles.socialIcon}
        />
      </div>
    </footer>
  );
};

export default Footer;
