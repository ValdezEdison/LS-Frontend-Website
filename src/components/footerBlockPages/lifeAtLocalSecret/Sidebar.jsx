import React from "react";
import styles from "./LifeAtLocalSecrets.module.css";

function Sidebar() {
  return (
    <nav className={styles.sidebarNav}>
      <div className={styles.sidebarContainer}>
        <div className={styles.navLinksContainer}>
          <a href="#quienes-somos" className={styles.navLinkAbout}>
            Quiénes somos
          </a>
          <a href="#trabaja-con-nosotros" className={styles.navLinkJobs}>
            Trabaja con nosotros
          </a>
        </div>
        <a href="#vida-local-secrets" className={styles.navLinkActive}>
          La vida en Local Secrets
        </a>
      </div>
      <div className={styles.navDivider} aria-hidden="true" />
    </nav>
  );
}

export default Sidebar;
