import React from "react";
import styles from "./Sidebar.module.css";
import { userAdd, Notification, Setting, Card, Lock, MapIcon } from "../common/Images";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const tabConfig = {
  personal: { image: userAdd },
  preferences: { image: Setting },
  location: { image: MapIcon },
  security: { image: Lock },
  privacy: { image: Card },
  notifications: { image: Notification },
};

const Sidebar = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation('ProfileSection');

  const { user } = useSelector((state) => state.auth);

    // Filter out the privacy tab if user is logged in via social login
    const filteredTabs = Object.entries(tabConfig).filter(([tabKey]) => {
      return !(user?.is_social_login && tabKey === 'privacy');
    });


  return (
    <aside className={styles.sidebar}>
      {/* {Object.entries(tabConfig).map(([tabKey, { image }]) => (
        <div 
          key={tabKey} 
          className={styles.menuItem}
          onClick={() => onTabChange(tabKey)}
        >
          <div className={`${styles.iconPlaceholder} ${activeTab === tabKey ? styles.active : ''}`}>
            <img src={image} alt={t(`sidebar.tabs.${tabKey}`)} />
          </div>
          <span className={activeTab === tabKey ? styles.activeLabel : styles.label}>
            {t(`sidebar.tabs.${tabKey}`)}
          </span>
        </div>
      ))} */}
       {filteredTabs.map(([tabKey, { image }]) => (
        <div 
          key={tabKey} 
          className={styles.menuItem}
          onClick={() => onTabChange(tabKey)}
        >
          <div className={`${styles.iconPlaceholder} ${activeTab === tabKey ? styles.active : ''}`}>
            <img src={image} alt={t(`sidebar.tabs.${tabKey}`)} />
          </div>
          <span className={activeTab === tabKey ? styles.activeLabel : styles.label}>
            {t(`sidebar.tabs.${tabKey}`)}
          </span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;