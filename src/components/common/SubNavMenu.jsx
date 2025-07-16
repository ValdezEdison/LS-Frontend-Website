// src/components/common/SubNavMenu.jsx
import React, { useEffect } from "react";
import styles from "./SubNavMenu.module.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SubNavMenu = ({ activeLink }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation("Common");
  
  // Get destination from Redux
  const { destination } = useSelector(state => state.destination);
  
  // Store city information when available
  useEffect(() => {
    if (location.pathname.startsWith('/cities/') && destination) {
      localStorage.setItem('lastCitySlugUrl', location.pathname);
      localStorage.setItem('lastCityId', destination.id.toString());
      
      // Also store event, place, and itinerary base paths for this city
      if (destination.events_url) {
        localStorage.setItem('cityEventsUrl', destination.events_url);
      }
      if (destination.places_url) {
        localStorage.setItem('cityPlacesUrl', destination.places_url);
      }
      if (destination.itineraries_url) {
        localStorage.setItem('cityItinerariesUrl', destination.itineraries_url);
      }
    }
  }, [location.pathname, destination]);
  
  const handleNavigation = (path) => {
    // For the destination tab, navigate back to the city slug URL
    if (path === "/places/destination") {
      const lastCitySlugUrl = localStorage.getItem('lastCitySlugUrl');
      if (lastCitySlugUrl) {
        navigate(lastCitySlugUrl);
      } else {
        navigate(path);
      }
      return;
    }
    
    // Handle other tabs based on stored slug URLs when available
    if (path === "/places/events") {
      const cityEventsUrl = localStorage.getItem('cityEventsUrl');
      if (cityEventsUrl) {
        navigate(cityEventsUrl);
      } else if (destination?.id) {
        navigate(path, { state: { id: destination.id } });
      } else {
        navigate(path);
      }
      return;
    }
    
    if (path === "/places/destination-places") {
      const cityPlacesUrl = localStorage.getItem('cityPlacesUrl');
      if (cityPlacesUrl) {
        navigate(cityPlacesUrl);
      } else if (destination?.id) {
        navigate(path, { state: { id: destination.id } });
      } else {
        navigate(path);
      }
      return;
    }
    
    if (path === "/places/itineraries") {
      const cityItinerariesUrl = localStorage.getItem('cityItinerariesUrl');
      if (cityItinerariesUrl) {
        navigate(cityItinerariesUrl);
      } else if (destination?.id) {
        navigate(path, { state: { id: destination.id } });
      } else {
        navigate(path);
      }
      return;
    }
    
    // Default navigation
    navigate(path);
  };

  const isActive = (path) => {
    // For destination tab, check if we're on a city slug URL
    if (path === "/places/destination" && location.pathname.startsWith("/cities/")) {
      return true;
    }
    
    // For other tabs, check if we're on the specific path or a sub-path
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className={styles.subNav}>
      <a
        className={`${styles.subNavLink} ${isActive("/places/destination") ? styles.active : ""}`}
        onClick={() => handleNavigation("/places/destination")}
      >
        {t('subNav.destination')}
      </a>
      
      <a
        className={`${styles.subNavLink} ${isActive("/places/events") ? styles.active : ""}`}
        onClick={() => handleNavigation("/places/events")}
      >
        {t('subNav.events')}
      </a>
      
      <a
        className={`${styles.subNavLink} ${isActive("/places/destination-places") ? styles.active : ""}`}
        onClick={() => handleNavigation("/places/destination-places")}
      >
        {t('subNav.places')}
      </a>
      
      <a
        className={`${styles.subNavLink} ${isActive("/places/itineraries") ? styles.active : ""}`}
        onClick={() => handleNavigation("/places/itineraries")}
      >
        {t('subNav.itineraries')}
      </a>
    </nav>
  );
};

export default SubNavMenu;