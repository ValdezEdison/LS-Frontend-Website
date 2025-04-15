import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.navigation}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1eda86787c29074b5aefadefa3f3ff2a06044f79?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Logo"
            className={styles.logo}
          />
          <ul className={styles.navList}>
            <li>
              <button className={styles.navButton}>Lugares</button>
            </li>
            <li>
              <button className={styles.navButton}>Eventos</button>
            </li>
            <li>
              <button className={styles.navButton}>Itinerarios</button>
            </li>
            <li>
              <button className={styles.navButton}>Explorar</button>
            </li>
            <li>
              <button className={styles.navButtonActive}>Mis viajes</button>
            </li>
          </ul>
        </nav>
        <div className={styles.userActions}>
          <button className={styles.iconButton} aria-label="Notificaciones">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dee1de9d9d2ca465d2c09fd31034c716872348cf?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt=""
            />
          </button>
          <button className={styles.iconButton} aria-label="Mensajes">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/eb4e7633446e3762063ea91053ca9ccb76c5a4d0?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt=""
            />
          </button>
          <a href="/blog" className={styles.blogLink}>
            Blog
          </a>
          <div className={styles.divider} />
          <a href="/contacto" className={styles.contactLink}>
            Contacto
          </a>
          <button
            className={styles.userProfileButton}
            aria-label="Perfil de usuario"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dc6f8ff1979c5560ad9ef604c44da4a5b5e7a390?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt="Perfil de usuario"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
