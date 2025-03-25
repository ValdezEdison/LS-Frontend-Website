import React from "react";
import styles from "./UserMenu.module.css";

const UserMenuItem = ({ icon, label }) => {
  return (
    <div className={styles.menuItem}>
      <div className={styles.icon} dangerouslySetInnerHTML={{ __html: icon }} />
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default UserMenuItem;
