import React from "react";
import styles from "./Sidebar.module.css";
import { userAdd, Notification, Setting, Card, Lock } from "../common/Images";

const Sidebar = () => {
  const menuItems = [
    { label: "Detalles personales", isActive: true, image: userAdd },
    { label: "Preferencias", isActive: false,  image: Setting},
    { label: "Seguridad", isActive: false, image: Lock},
    { label: "Privacidad", isActive: false, image: Card},
    { label: "Notificaciones", isActive: false, image: Notification},
  ];

  return (
    <aside className={styles.sidebar}>
      {menuItems.map((item, index) => (
        <div key={index} className={styles.menuItem}>
          <div className={`${styles.iconPlaceholder} ${styles.active}`}><img src={item.image}/></div>
          <span className={item.isActive ? styles.activeLabel : styles.label}>
            {item.label}
          </span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
