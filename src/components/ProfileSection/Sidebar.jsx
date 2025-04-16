import React from "react";
import styles from "./Sidebar.module.css";
import { userAdd, Notification, Setting, Card, Lock } from "../common/Images";

const tabConfig = {
  personal: { label: "Personal details", image: userAdd },
  preferences: { label: "Preferences", image: Setting },
  security: { label: "Security", image: Lock },
  privacy: { label: "Privacy", image: Card },
  notifications: { label: "Notifications", image: Notification },
};

const Sidebar = ({ activeTab, onTabChange }) => {
  return (
    <aside className={styles.sidebar}>
      {Object.entries(tabConfig).map(([tabKey, { label, image }]) => (
        <div 
          key={tabKey} 
          className={styles.menuItem}
          onClick={() => onTabChange(tabKey)}
        >
          <div className={`${styles.iconPlaceholder} ${activeTab === tabKey ? styles.active : ''}`}>
            <img src={image} alt={label} />
          </div>
          <span className={activeTab === tabKey ? styles.activeLabel : styles.label}>
            {label}
          </span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;