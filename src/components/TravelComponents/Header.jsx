import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  const navItems = [
    { text: "Lugares", active: false },
    { text: "Eventos", active: false },
    { text: "Itinerarios", active: false },
    { text: "Explorar", active: false },
    { text: "Mis viajes", active: true },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.navigation}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/bf7d82308dcac30b98b3e3fd3414980eeafe8cd3?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Local Secrets Logo"
            className={styles.logo}
          />
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`${styles.navItem} ${item.active ? styles.active : ""}`}
            >
              {item.text}
            </button>
          ))}
        </nav>
        <div className={styles.userActions}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dee1de9d9d2ca465d2c09fd31034c716872348cf?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Search Icon"
            className={styles.actionIcon}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/eb4e7633446e3762063ea91053ca9ccb76c5a4d0?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Notification Icon"
            className={styles.actionIcon}
          />
          <button className={styles.blogButton}>Blog</button>
          <div className={styles.divider} />
          <button className={styles.contactButton}>Contacto</button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dc6f8ff1979c5560ad9ef604c44da4a5b5e7a390?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="User Profile"
            className={styles.profileIcon}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
