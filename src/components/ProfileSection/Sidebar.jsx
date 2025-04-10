import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const menuItems = [
    { label: "Detalles personales", isActive: true },
    { label: "Preferencias", isActive: false },
    { label: "Seguridad", isActive: false },
    { label: "Privacidad", isActive: false },
    { label: "Notificaciones", isActive: false },
  ];

  return (
    <aside className={styles.sidebar}>
      {menuItems.map((item, index) => (
        <div key={index} className={styles.menuItem}>
          <div className={styles.iconPlaceholder}></div>
          <span className={item.isActive ? styles.activeLabel : styles.label}>
            {item.label}
          </span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
