"use client";
import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumns}>
          <div className={styles.logoColumn}>
            <div className={styles.logoContainer}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7d5e399aff09b052a35b6ee462d192f252eb43f6?placeholderIfAbsent=true"
                alt="Local Secrets Logo"
                className={styles.footerLogo}
              />
              <button className={styles.appButton}>Descarga nuestra app</button>
            </div>
          </div>
          <div className={styles.linksColumn}>
            <div className={styles.linksContainer}>
              <h3 className={styles.columnTitle}>Conócenos</h3>
              <p className={styles.linksList}>
                Quiénes somos
                <br />
                Trabaja con nosotros
                <br />
                La vida en Local Secrets
              </p>
            </div>
          </div>
          <div className={styles.linksColumn}>
            <div className={styles.linksContainer}>
              <h3 className={styles.columnTitle}>Colaboradores</h3>
              <p className={styles.linksList}>
                Embajadores
                <br />
                Local secret managers
                <br />
              </p>
            </div>
          </div>
          <div className={styles.linksColumn}>
            <div className={styles.linksContainer}>
              <h3 className={styles.columnTitle}>Recursos</h3>
              <p className={styles.linksList}>
                <span className={styles.footerLink}>Contacto</span>
                <br />
                <span className={styles.footerLink}>Centro de ayuda</span>
                <br />
                <span className={styles.footerLinkUnderline}>
                  Inicio sesión LS managers
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.footerDivider} />
      <div className={styles.copyrightRow}>
        <p className={styles.copyrightText}>
          Copyright Local Secrets 2024 · Condiciones generales · Política de
          privacidad · Gestión de cookies
        </p>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/bfa59d98b78c20c3eb621b393259121050d37703?placeholderIfAbsent=true"
          alt="Social Media"
          className={styles.socialIcon}
        />
      </div>
    </footer>
  );
}

export default Footer;
