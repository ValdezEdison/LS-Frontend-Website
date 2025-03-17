import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./Header.module.css";
import LanguageSelector from "../common/LanguageSelector";
import { getLanguageData, setLanguage } from "../../utils/Helper";
import { useTranslation } from "react-i18next";
import { LSLogo2_1, Favorite } from "../common/Images";
import { fetchLanguages } from "../../features/common/languages/LanguageAction";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"
import { fetchImages } from "../../features/common/defaultImages/ImageAction";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchHeaderBlocks } from "../../features/cms/Blocks/BlockAction";

const Header = () => {

  const { t, i18n } = useTranslation("Header");
  const { language, setLanguage } = useContext(LanguageContext); // Use context to manage language
  const [showNavBar, setShownavBar] = useState(false);
  const [showLanguageOption, setShowLanguageOption] = useState(false);
  const languagesRef = useRef(null);
  const mobNavRef = useRef(null);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    dispatch(fetchLanguages());
    dispatch(fetchImages());
    dispatch(fetchHeaderBlocks());
  }, [dispatch, language]); // Re-fetch data when language changes

  const handleClickHamburger = () => {
    setShownavBar(!showNavBar);
  };

  const handleClickLanguage = () => {
    setShowLanguageOption(!showLanguageOption);
  };

  const handleClickOutside = (event) => {
    if (languagesRef.current && !languagesRef.current.contains(event.target)) {
      setShowLanguageOption(false);
    }
  };

  const handleClickOutsideMobNav = (event) => {
    if (mobNavRef.current && !mobNavRef.current.contains(event.target)) {
      setShownavBar(false);
    }
  };

  useEffect(() => {
    if (showLanguageOption) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguageOption]);

  useEffect(() => {
    if (showNavBar) {
      document.addEventListener("mousedown", handleClickOutsideMobNav);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMobNav);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMobNav);
    };
  }, [showNavBar]);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLanguageChange = (code, flag, name) => {
    i18n.changeLanguage(code); // Update i18n
    setLanguage(code, flag, name); // Update context and localStorage
    setShowLanguageOption(false); // Close the language selector
  };

  const languageData = getLanguageData();

  if (languageData) {

  } else {
    console.log('No language data found in localStorage.');
    setLanguage("es", "images/spain.png", "Español");
  }

  return (
    <header>
      <div className="page-center">
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <img
              src={LSLogo2_1}
              alt="Local Secrets Logo"
              className={styles.logo}
              onClick={() => handleNavigation("/")}
            />
            <nav className={styles.mainNav}>
              <button
                className={`${styles.navButton} ${isActive("/places") ? styles.navItemActive : ""
                  }`}
                onClick={() => handleNavigation("/places")}
              >
                {t("nav.places")}
              </button>
              <button
                className={`${styles.navButton} ${isActive("/events") ? styles.navItemActive : ""
                  }`}
                onClick={() => handleNavigation("/events")}
              >
                {t("nav.events")}
              </button>
              <button
                className={`${styles.navButton} ${isActive("/itineraries") ? styles.navItemActive : ""
                  }`}
                onClick={() => handleNavigation("/itineraries")}
              >
                {t("nav.itineraries")}
              </button>
              <button
                className={`${styles.navButton} ${isActive("/explore") ? styles.navItemActive : ""
                  }`}
                onClick={() => handleNavigation("/explore")}
              >
                {t("nav.explore")}
              </button>
            </nav>
          </div>
          <div className={styles.userActions}>


            <div className={styles.iconContainer}>
              <div className={styles.languageContainer}>
                <img
                  src={languageData?.flag}
                  alt="Search"
                  className={styles.icon}
                  onClick={handleClickLanguage}
                />
                {showLanguageOption ? <LanguageSelector languagesRef={languagesRef} handleLanguageChange={handleLanguageChange} /> : ""}

              </div>
              <img
                src={Favorite}
                alt="Notifications"
                className={styles.icon}
              />
              <nav className={styles.secondaryNav}>
                <a
                  onClick={() => handleNavigation("/blog")}
                  className={`${styles.navLink} ${isActive("/blog") ? styles.navItemActive : ""
                    }`}
                >
                  {t("nav.blog")}
                </a>
                <span className={styles.divider}></span>
                <a
                  onClick={() => handleNavigation("/contact")}
                  className={`${styles.navLink} ${isActive("/contact") ? styles.navItemActive : ""
                    }`}
                >
                  {t("nav.contact")}
                </a>
              </nav>
            </div>
            {/* <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/a8e55a5f6259eb4c04889d83edcb17bc65673cf93782c1c2c40272b91d103518?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="User Profile"
            className={styles.userIcon}
          /> */}
            <button className="cta-button">{t("login")}</button>
            <div className="mob-nav-container">
              <div className={`icon-nav ${showNavBar ? "open" : ""}`} onClick={handleClickHamburger}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <ul className={`mob-nav ${showNavBar ? "open" : ""}`} ref={mobNavRef}>
                <li
                  className={`${styles.navButton} ${isActive("/places") ? styles.navItemActive : ""
                    }`}
                  onClick={() => handleNavigation("/places")}
                >
                  {t("nav.places")}
                </li>
                <li
                  className={`${styles.navButton} ${isActive("/events") ? styles.navItemActive : ""
                    }`}
                  onClick={() => handleNavigation("/events")}
                >
                  {t("nav.events")}
                </li>
                <li
                  className={`${styles.navButton} ${isActive("/itineraries") ? styles.navItemActive : ""
                    }`}
                  onClick={() => handleNavigation("/itineraries")}
                >
                  {t("nav.itineraries")}
                </li>
                <li
                  className={`${styles.navButton} ${isActive("/explore") ? styles.navItemActive : ""
                    }`}
                  onClick={() => handleNavigation("/explore")}
                >
                  {t("nav.explore")}
                </li>
                <li
                  className={`${styles.navButton} ${isActive("/blog") ? styles.navItemActive : ""
                    }`}
                  onClick={() => handleNavigation("/blog")}
                >
                  {t("nav.blog")}
                </li>
                <li
                  className={`${styles.navButton} ${isActive("/contact") ? styles.navItemActive : ""
                    }`}
                  onClick={() => handleNavigation("/contact")}
                >
                  {t("nav.contact")}
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
