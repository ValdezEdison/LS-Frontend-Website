import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const menuItems = [
    { name: "Quiénes somos", path: "/who-we-are" },
    { name: "Trabaja con nosotros", path: "/join-our-team" },
    { 
      name: "La vida en Local Secrets", 
      path: "/life-at-local-secrets",
      className: styles.lifeAtCompanyLink 
    },
  ];

  return (
    <nav className={styles.sidebarNav}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarLinks}>
          {menuItems.map((item) => (
            <a
              key={item.path} // Using path as key since it's unique
              className={`${item.className || ''} ${
                activePath === item.path ? styles.active : ''
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
      {/* <div className={styles.sidebarDivider} /> */}
    </nav>
  );
};

export default Sidebar;