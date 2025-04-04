import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.navigation}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b9441a9e9aab88f8aef7d9d53c2d3f54096dc980?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Logo"
            className={styles.logo}
          />
          <button className={styles.navButton}>Lugares</button>
          <button className={styles.navButton + " " + styles.active}>
            Eventos
          </button>
          <button className={styles.navButton}>Itinerarios</button>
          <button className={styles.navButton}>Explorar</button>
        </nav>
        <div className={styles.userActions}>
          <div className={styles.userLinks}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dee1de9d9d2ca465d2c09fd31034c716872348cf?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt=""
              className={styles.userIcon}
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b8ac1cd98e603ddc5b10641c2dee01b3b8682413?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt=""
              className={styles.languageIcon}
            />
            <a href="#blog" className={styles.link}>
              Blog
            </a>
            <span className={styles.divider}></span>
            <a href="#contact" className={styles.link}>
              Contacto
            </a>
          </div>
          <button className={styles.loginButton}>Iniciar sesión</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
