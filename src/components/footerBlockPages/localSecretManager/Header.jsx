"use client";
import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.navigationLinks}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/878666a42372dd00f26fa888dcd80ed81a19a746?placeholderIfAbsent=true"
            alt="Local Secrets Logo"
            className={styles.logo}
          />
          <button className={styles.navButton}>Lugares</button>
          <button className={styles.navButton}>Eventos</button>
          <button className={styles.navButton}>Itinerarios</button>
          <button className={styles.navButton}>Explorar</button>
        </nav>
        <div className={styles.rightSection}>
          <div className={styles.linkContainer}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dee1de9d9d2ca465d2c09fd31034c716872348cf?placeholderIfAbsent=true"
              alt="User Icon"
              className={styles.userIcon}
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b8ac1cd98e603ddc5b10641c2dee01b3b8682413?placeholderIfAbsent=true"
              alt="Blog Icon"
              className={styles.blogIcon}
            />
            <a href="#" className={styles.textLink}>
              Blog
            </a>
            <div className={styles.divider} />
            <a href="#" className={styles.textLink}>
              Contacto
            </a>
          </div>
          <button className={styles.loginButton}>Iniciar sesión</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
