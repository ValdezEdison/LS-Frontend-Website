import React, { useEffect } from "react";
import styles from "./SubNavMenu.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { PURGE } from "redux-persist"; // Import PURGE action
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const SubNavMenu = ({ activeLink }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = location.state || {};

  const { t } = useTranslation("Common");

  const handleNavigation = (path) => {
    if (path === '/places/tags') {
      // Special handling for tags path
      const tagDetails = JSON.parse(localStorage.getItem('tagDetails') || '{}');
      navigate(path, {
        state: {
          cityId: tagDetails.cityId || '',
          cityName: tagDetails.cityName || '',
          tagId: tagDetails.tagId || '',
          title: tagDetails.title || ''
        }
      });
    } else {
      navigate(path, { state: { id } });
    }
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
      "/places/tags",
    ];

    const isSubNavRouteActive = subNavRoutes.some((route) =>
      location.pathname.startsWith(route)
    );
    if (!isSubNavRouteActive) {
      // Clear persisted data if the user navigates away from the sub-navigation routes
      dispatch({
        type: PURGE,
        key: "destination", // Key used in persistConfig
      });
      localStorage.removeItem('tagDetails');
    }
  }, [location.pathname, dispatch]);


  const isTagsPage = location.pathname === '/places/tags';

  useEffect(() => {
    if(isTagsPage){
      const { cityId, title, tagId, cityName } = location?.state ?? {};    
      const tagDetails = {
        cityId: cityId || '',
        title: title || '',
        tagId: tagId || '',
        cityName: cityName || ''
      };
  
      localStorage.setItem('tagDetails', JSON.stringify(tagDetails));

    }

  }, [isTagsPage, location]);

  const hasTagDetails = Boolean(JSON.parse(localStorage.getItem('tagDetails') || 'null'));

  return (
    <nav className={styles.subNav}>
      {isTagsPage || hasTagDetails ? (
        <a
          className={`${styles.subNavLink} ${isActive("/places/tags") ? styles.active : ""}`}
          onClick={() => handleNavigation("/places/tags")}
        >
          {t('subNav.tags')}
        </a>
      )
        :(
        <a
        className={`${styles.subNavLink} ${isActive("/places/destination") ? styles.active : ""}`}
        onClick={() => handleNavigation("/places/destination")}
      >
       {t('subNav.destination')}
      </a>
      )}
   
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