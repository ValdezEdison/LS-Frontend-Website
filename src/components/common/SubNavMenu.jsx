import React, { useEffect } from "react";
import styles from "./SubNavMenu.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { PURGE } from "redux-persist"; // Import PURGE action
import { useDispatch } from "react-redux";

const SubNavMenu = ({ activeLink }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = location.state || {};

  console.log(id, 'id in SubNavMenu');

  const handleNavigation = (path) => {
    navigate(path, { state: { id } });
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

   // Clear persisted data when the user navigates away from the sub-navigation routes
   useEffect(() => {
    const subNavRoutes = [
      "/places/destination",
      "/places/events",
      "/places/destination-places",
      "/places/itineraries",
      "/places/itineraries-details",
    ];

    const isSubNavRouteActive = subNavRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (!isSubNavRouteActive) {
      // Clear persisted data if the user navigates away from the sub-navigation routes
      dispatch({
        type: PURGE,
        key: "destination", // Key used in persistConfig
        result: () => null, // Optional callback
      });
    }
  }, [location.pathname, dispatch]);

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