import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8b6d92fc8d3a1badfef835d5d65c0b8df848e82e175645d4e390c177b284d404?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Local Secrets Logo"
          className={styles.logo}
        />
        <nav className={styles.navigation}>
          <button className={styles.navButton}>Lugares</button>
          <button className={styles.navButton}>Eventos</button>
          <button className={styles.navButton}>Itinerarios</button>
          <button className={styles.navButton}>Explorar</button>
        </nav>
      </div>
      <div className={styles.userSection}>
        <div className={styles.languageSelector}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1b21b688e810f0d5a002b17cb67303cad271512b8756ed7b8326d9be48119629?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Language selector"
            className={styles.icon}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dbb7c717c96a1a57bc99b363b1598e903089c222316b6fb8c5cdee08dadac523?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Dropdown arrow"
            className={styles.icon}
          />
        </div>
        <nav className={styles.userNav}>
          <a href="#blog" className={styles.navLink}>
            Blog
          </a>
          <span className={styles.divider}></span>
          <a href="#contact" className={styles.navLink}>
            Contacto
          </a>
        </nav>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/a8e55a5f6259eb4c04889d83edcb17bc65673cf93782c1c2c40272b91d103518?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="User profile"
          className={styles.userIcon}
        />
      </div>
    </header>
  );
};

export default Header;
