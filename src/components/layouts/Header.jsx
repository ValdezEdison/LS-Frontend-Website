import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./Header.module.css";
import LanguageSelector from "../common/LanguageSelector";
import { getLanguageData, setLanguage, setSecretKey } from "../../utils/Helper";
import { useTranslation } from "react-i18next";
import { LSLogo2_1, Favorite, ProfilePlaceholder, Spain, UK, US } from "../common/Images";
import { fetchLanguages } from "../../features/common/languages/LanguageAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"
import { fetchImages } from "../../features/common/defaultImages/ImageAction";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchHeaderBlocks, fetchNewsLetterBlocks, fetchFooterBlocks } from "../../features/cms/Blocks/BlocksAction";
import UserMenu from "../UserMenu/UserMenu";
import { logout, getProfile, updateUserLanguage } from "../../features/authentication/AuthActions";
import Loader from "../../components/common/Loader";
import { languagesList } from "../../constants/LanguagesList";
import { toast } from "react-toastify";
import { clearLocation } from "../../features/location/LocationSlice";

const Header = () => {

  const { t, i18n } = useTranslation("Header");
  const { language, setLanguage, languageId } = useContext(LanguageContext); // Use context to manage language
  const [showNavBar, setShownavBar] = useState(false);
  const [showLanguageOption, setShowLanguageOption] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const languagesRef = useRef(null);
  const mobNavRef = useRef(null);
  const userMenuRef = useRef(null);

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const { languages } = useSelector((state) => state.languages);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isProfilePage = location.pathname.startsWith("/profile");
  const isFavoritesPage = location.pathname.startsWith("/favorites");
  const isHomepage = location.pathname === "/";

  const handleNavigation = (path) => {
    if (path === "/login") {
      // Pass the current location as state when navigating to /login
      navigate(path, { state: { from: location } });
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    dispatch(fetchLanguages());
    dispatch(fetchImages());
    dispatch(fetchHeaderBlocks());
    dispatch(fetchFooterBlocks(languageId));
    if(!isAuthenticated){
      dispatch(fetchNewsLetterBlocks(languageId));  
    }else{
      dispatch(getProfile());
    }
  }, [dispatch, language]); // Re-fetch data when language changes

  useEffect(() => {

    if(isHomepage){
      dispatch(fetchNewsLetterBlocks(languageId)); 
    }
 
  }, [isHomepage, dispatch, language]);

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

  const handleLanguageChange = (id, code, flag, name) => {
    const selectedLang = languagesList.find(lang => lang.code === code);
    i18n.changeLanguage(code); // Update i18n
    setLanguage(selectedLang.id, code, flag, name); // Update context and localStorage
    setShowLanguageOption(false); // Close the language selector
    dispatch(updateUserLanguage(id));
  };

  const languageData = getLanguageData();

  // const filteredLanguages = languages.filter((lang) => lang.code === "es");

  useEffect(() => {
    const languageData = getLanguageData();
    if (!languageData) {
      const selectedLang = languagesList.find(lang => lang.code === "es");
      setLanguage(selectedLang.id, "es", "/images/spain.png", "Español");
    }
  }, [setLanguage]);

    // Filter out 'fr' and 'pt' languages
    const filteredLanguages = languages.filter(
      (lang) => lang.code !== "fr" && lang.code !== "pt"
    );
  
    // Map language codes to their corresponding flag images
    const flagImages = {
      "es": Spain,
      "en": US,
      "en-GB": UK,
    };


  useEffect(() => {
    if(user && user.language !== null){
      setLanguage(user.language.id, user.language.code, flagImages[user.language.code] , user.language.name);
    }
    
  }, [user])



  const handleClickOutsideUserMenu = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };
  const handleUserIconClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  useEffect(() => {
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutsideUserMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideUserMenu);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideUserMenu);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
        dispatch(logout()).then((result) => {
          console.log(result, "result");
          if (result.type === "auth/logout/fulfilled") {
            toast.success(result.payload?.detail);
            dispatch(clearLocation())
            if(isProfilePage || isFavoritesPage){
              navigate("/");
            }
          }
        });
  }

  const handleActions = (e, action) => {
    e.stopPropagation();
    if (action === 'logout') {
      handleLogout();
    } else if (action === 'profile') {
      navigate('/profile/personal');
    } else if (action === 'favorites') {
      navigate('/favorites');
    }
  }

  useEffect(() => {
    setSecretKey("23a28f8270fd7bef759d20500101040b1f54fdc4cc2622e65c0954ca8de85663")
    
  },[])
  return (
    <>
   {loading && location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/password-recovery"  && location.pathname !== "/register/email-confirmation" && <div className="fullPageOverlay">
      <div className="loaderBtnWrapper">
          <Loader /> 
          </div>
      </div>
  }
    <header> 
      <div className="page-center">
        <div className={`${styles.header} ${location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/password-recovery" || location.pathname === "/verify-user-email" || location.pathname === "/register/email-confirmation" ? styles.homeHeader + " authHeader" : ""}`}>
          <div className={styles.logoContainer}>
            <img
              src={LSLogo2_1}
              alt="Local Secrets Logo"
              className={`${styles.logo} ${styles.logoCommon}`}
              onClick={() => handleNavigation("/")}
            />

            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f3b32c2b8998cb87f3022dd6929cd601c3eecf28?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt="Local Secrets Logo111"
              className={`${styles.logo} ${styles.logoAuth}`}
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
              {isAuthenticated &&
                <button
                  className={`${styles.navButton} ${isActive("/my-trips") ? styles.navItemActive : ""
                    }`}
                  onClick={() => handleNavigation("/my-trips")}
                >
                My Trips
                </button>
              }
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
                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/0f2b7313676b8aa46a1253a72edeac25273a7205?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                alt="Settings"
                className={`${styles.icon} ${styles.helpIcon}`}
              />
              <img
                src={Favorite}
                alt="Notifications"
                className={`${styles.icon} ${styles.favouriteicon}`}
                onClick={() => handleNavigation("/favorites")}
              />
              <nav className={styles.secondaryNav}>
                <a
                  onClick={() => handleNavigation("/blog-list")}
                  className={`${styles.navLink} ${isActive("/blog-list") ? styles.navItemActive : ""
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
            {isAuthenticated ? (
              <div className={styles.userMenuContainer} ref={userMenuRef}>
                <div className={styles.profileIconWrapper}>
                  <img
                    src={user?.profile_picture?.original ? user.profile_picture.original : ProfilePlaceholder}
                    alt="User Profile"
                    className={styles.userIcon}
                    onClick={handleUserIconClick}
                  />
                  {showUserMenu && <UserMenu onAction={handleActions} />}
                </div>
               
                
              </div>
            ) : (
              <button className={styles.btnLogin + " cta-button"} onClick={() => handleNavigation("/login")}>
                {t("login")}
              </button>
            )}
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
                {isAuthenticated &&
                  <li
                    className={`${styles.navButton} ${isActive("/my-trips") ? styles.navItemActive : ""
                      }`}
                    onClick={() => handleNavigation("/my-trips")}
                  >
                    My Trips
                  </li>
                }
                <li
                  className={`${styles.navButton} ${isActive("/blog-list") ? styles.navItemActive : ""
                    }`}
                  onClick={() => handleNavigation("/blog-list")}
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
    </>
  );
};

export default Header;
