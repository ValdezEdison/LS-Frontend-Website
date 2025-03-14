import React from "react";
import styles from "./SubNavMenu.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const SubNavMenu = ({ activeLink }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className={styles.subNav}>
      <a
        className={`${styles.subNavLink} ${isActive("/places/destination") ? styles.active : ""}`}
        onClick={() => handleNavigation("/places/destination")}
      >
        Destino
      </a>
      <a
        className={`${styles.subNavLink} ${isActive("/places/events") ? styles.active : ""}`}
        onClick={() => handleNavigation("/places/events")}
      >
        Eventos
      </a>
      <a
        className={`${styles.subNavLink} ${isActive("/places/destination-places") ? styles.active : ""}`}
        onClick={() => handleNavigation("/places/destination-places")}
      >
        Lugares
      </a>
      <a
        className={`${styles.subNavLink} ${isActive("/places/itineraries") ? styles.active : ""}`}
        onClick={() => handleNavigation("/places/itineraries")}
      >
        Itinerarios
      </a>
    </nav>
  );
};

export default SubNavMenu;