import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const Sidebar = () => {
  return (
    <nav className={styles.sidebarNav}>
      <div className={styles.sidebarContent}>
        <h3 className={styles.sidebarTitle}>Quiénes somos</h3>
        <div className={styles.sidebarLinks}>
          <a href="#">Trabaja con nosotros</a>
          <a href="#" className={styles.lifeAtCompanyLink}>
            La vida en Local Secrets
          </a>
        </div>
      </div>
      <div className={styles.sidebarDivider} />
    </nav>
  );
};

export default Sidebar;
