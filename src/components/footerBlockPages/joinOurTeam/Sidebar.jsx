import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";

function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarLinks}>
        <a href="#">Quiénes somos</a>
        <a href="#" className={styles.activeLink}>
          Trabaja con nosotros
        </a>
        <a href="#" className={styles.sidebarLink}>
          Más que una empresa
        </a>
      </div>
      <div className={styles.sidebarDivider} aria-hidden="true" />
    </nav>
  );
}

export default Sidebar;
