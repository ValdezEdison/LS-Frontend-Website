import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.appDownload}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/03f5b9252b73ce1c8b19e4a0cf2e0649b0bfdb0dfeb3c0339d4a1447f9e28c12?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Local Secrets App"
            className={styles.appLogo}
          />
          <button className={styles.downloadButton}>
            Descarga nuestra app
          </button>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Conócenos</h3>
            <ul className={styles.linkList}>
              <li>Quiénes somos</li>
              <li>Trabaja con nosotros</li>
              <li>La vida en Local Secrets</li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Colaboradores</h3>
            <ul className={styles.linkList}>
              <li>Embajadores</li>
              <li>Local secret managers</li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>Recursos</h3>
            <ul className={styles.linkList}>
              <li>Contacto</li>
              <li>Centro de ayuda</li>
              <li className={styles.underline}>Inicio sesión LS managers</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.legalLinks}>
          <span>Copyright Local Secrets 2024</span>
          <span className={styles.dot}>·</span>
          <a href="#terms">Condiciones generales</a>
          <span className={styles.dot}>·</span>
          <a href="#privacy">Política de privacidad</a>
          <span className={styles.dot}>·</span>
          <a href="#cookies">Gestión de cookies</a>
        </div>
        <div className={styles.socialLinks}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c16f52377c623cc24b0ed584a5af735acb2bf8ce53437803d9a391397a29c785?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Facebook"
            className={styles.socialIcon}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/d6928c362ea21386ee4a2f173cd523b016d637fd153d9e32aac1935d149abbd2?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Twitter"
            className={styles.socialIcon}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/39a061e8b2e6e66dd9ccb3cd23ede69e0e2830aedb1bf1fd50b1968fe114153e?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Instagram"
            className={styles.socialIcon}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
