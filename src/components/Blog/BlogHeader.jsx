"use client";
import React from "react";
import styles from "../../pages/Blog/BlogPage.module.css";

function BlogHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.navLinks}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/451aacecc5f25c0e85fcf0059a95436d266850e7?placeholderIfAbsent=true"
            alt="Local Secrets Logo"
            className={styles.logoImage}
          />
          <a href="#" className={styles.navLink}>
            Lugares
          </a>
          <a href="#" className={styles.navLinkEvents}>
            Eventos
          </a>
          <a href="#" className={styles.navLinkItineraries}>
            Itinerarios
          </a>
          <a href="#" className={styles.navLinkExplore}>
            Explorar
          </a>
        </nav>

        <div className={styles.userActions}>
          <div className={styles.userLinksGroup}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/dee1de9d9d2ca465d2c09fd31034c716872348cf?placeholderIfAbsent=true"
              alt="User icon"
              className={styles.userIcon}
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b8ac1cd98e603ddc5b10641c2dee01b3b8682413?placeholderIfAbsent=true"
              alt="Blog icon"
              className={styles.blogIcon}
            />
            <a href="#" className={styles.blogLink}>
              Blog
            </a>
            <div className={styles.divider} aria-hidden="true" />
            <a href="#" className={styles.contactLink}>
              Contacto
            </a>
          </div>
          <a href="#" className={styles.loginButton}>
            Iniciar sesión
          </a>
        </div>
      </div>
    </header>
  );
}

export default BlogHeader;
