import React from "react";
import styles from "./UserMenu.module.css";


const UserMenuItem = ({ icon, label, onClick }) => {
  return (
    <div className={styles.menuItem} onClick={onClick}>
      <div dangerouslySetInnerHTML={{ __html: icon }} />
      <span>{label}</span>
    </div>
  );
};

export default UserMenuItem;
