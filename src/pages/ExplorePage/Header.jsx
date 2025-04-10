import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.mainNav}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/fe2aaf6466041f830138395f3aa0f01d139fa787?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Local Secrets Logo"
            className={styles.logo}
          />
          <button className={styles.navButton}>Lugares</button>
          <button className={styles.navButton}>Eventos</button>
          <button className={styles.navButton}>Itinerarios</button>
          <button className={`${styles.navButton} ${styles.active}`}>
            Explorar
          </button>
          <button className={styles.navButton}>Mis viajes</button>
        </nav>
        <div className={styles.userNav}>
          <button className={styles.iconButton} aria-label="Notifications">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dee1de9d9d2ca465d2c09fd31034c716872348cf?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt=""
              className={styles.icon}
            />
          </button>
          <button className={styles.iconButton} aria-label="Messages">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/eb4e7633446e3762063ea91053ca9ccb76c5a4d0?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt=""
              className={styles.icon}
            />
          </button>
          <a href="/blog" className={styles.blogLink}>
            Blog
          </a>
          <span className={styles.divider}></span>
          <a href="/contact" className={styles.contactLink}>
            Contacto
          </a>
          <button
            className={styles.userProfileButton}
            aria-label="User Profile"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dc6f8ff1979c5560ad9ef604c44da4a5b5e7a390?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt="User Avatar"
              className={styles.userAvatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
