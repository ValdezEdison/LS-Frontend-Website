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
import { updateLocation, fetchLocationSettings } from "../../features/location/LocationAction";
import useSubNavDataCleanup from "../../hooks/useSubNavDataCleanup";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import AlertPopup from "../popup/Alert/AlertPopup";
import Modal from "../modal/Modal";
import { Helmet } from "react-helmet";

import LocationService from "../../services/LocationService";
 

const Header = () => {

  const { t, i18n } = useTranslation("Header");
  const { t: tCommon } = useTranslation("Common");
  const { language, setLanguage, languageId } = useContext(LanguageContext); // Use context to manage language
  const [showNavBar, setShownavBar] = useState(false);
  const [showLanguageOption, setShowLanguageOption] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const languagesRef = useRef(null);
  const mobNavRef = useRef(null);
  const userMenuRef = useRef(null);
  const locationUpdatedRef = useRef(false);

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const { languages } = useSelector((state) => state.languages);
  const { isOpen } = useSelector((state) => state.popup);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isProfilePage = location.pathname.startsWith("/profile");
  const isFavoritesPage = location.pathname.startsWith("/favorites");
  const isHomepage = location.pathname === "/";
  const isTripEditPage = location.pathname === '/my-trips/edit';

  useSubNavDataCleanup();

   const [popupState, setPopupState] = useState({
      map: false,
      gallery: false,
      reviewDrawer: false,
      alert: false,
      comment: false,
      deleteConfirm: false,
      success: false,
      addTrip: false
    });

    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");


   const togglePopup = (name, state) => {
      setPopupState(prev => ({ ...prev, [name]: state }));
      state ? dispatch(openPopup()) : dispatch(closePopup());
    };

  const handleNavigation = (path) => {
    if (path === "/login") {
      // Pass the current location as state when navigating to /login
      navigate(path, { state: { from: location } });
    }else if(path === "/favorites") {
      if(isAuthenticated){
        navigate(path);
      }else{
        togglePopup("alert", true);
        setAlertTitle(tCommon('authAlert.favorites.title'));
        setAlertMessage(tCommon('authAlert.favorites.description'));
      }

    } else {
      navigate(path);
    }
  };
  const [seoSettings, setSeoSettings] = useState(null);
  // Effect hook to fetch SEO settings on component mount
  useEffect(() => {
    const fetchSEOSettings = async () => {
      try {
        const response = await BlocksService.getSEOSettingsList("en"); // Pass desired locale dynamically
        const seoData = response?.data?.results?.[0];
        setSeoSettings(seoData); // Update state with fetched SEO settings
      } catch (error) {
        console.error("Error fetching SEO settings: ", error);
      }
    };
    fetchSEOSettings();
  }, []);

  useEffect(() => {
    dispatch(fetchLanguages());
    dispatch(fetchImages());
    dispatch(fetchHeaderBlocks());
    dispatch(fetchFooterBlocks(languageId));
    if(!isAuthenticated){
      dispatch(fetchNewsLetterBlocks(languageId));  
    }else{
      dispatch(getProfile());
      dispatch(fetchLocationSettings());
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


useEffect(() => {
  const initializeLanguageForGuest = async () => {
    if (!isAuthenticated) {
      try {
        let detectedLanguageCode = navigator.language.split("-")[0]; // e.g., "fr" from "fr-FR"
        // Use geolocation service to determine the country
        const position = await LocationService.startLocationTracking(); // Use location service
        // Call reverse geocoding or an external location API to get the country and map it to language codes
        const locationData = await fetchLocationData(); // Hypothetical helper function
        if (locationData?.countryCode) {
          if (locationData.countryCode === "FR") {
            detectedLanguageCode = "fr";
          } else if (locationData.countryCode === "RU") {
            detectedLanguageCode = "en"; // Default to English if Russian is unavailable
          }
          // Add more mappings if needed
        }
        // Match detected code with available languages
        const availableLanguage = languagesList.find(
          (lang) => lang.code === detectedLanguageCode
        );
        // Fallback to English if detected language isn't available
        const selectedLanguage = availableLanguage || languagesList.find((lang) => lang.code === "en");
        setLanguage(
          selectedLanguage.id,
          selectedLanguage.code,
          flagImages[selectedLanguage.code],
          selectedLanguage.name
        );
        i18n.changeLanguage(selectedLanguage.code);
      } catch (error) {
        console.error("Failed to initialize language for guest:", error);
        // Fallback to English on error
        const defaultLang = languagesList.find((lang) => lang.code === "en");
        setLanguage(
          defaultLang.id,
          defaultLang.code,
          flagImages[defaultLang.code],
          defaultLang.name
        );
        i18n.changeLanguage("en");
      }
    }
  };
  initializeLanguageForGuest();
}, [isAuthenticated, setLanguage, i18n]);

  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };


  const handleLanguageChange = (id, code, flag, name) => {
  const selectedLang = languagesList.find((lang) => lang.code === code);

  i18n.changeLanguage(code); // Change i18n language
  setLanguage(selectedLang.id, code, flag, name); // Update context and localStorage
  
  // Dispatch action to save the language preference
  dispatch(updateUserLanguage(id)).then((result) => {
    if (result.type === "auth/updateUserLanguage/fulfilled") {
      if (result.payload?.detail) {
        toast.success(result.payload.detail); // Show success toast
        dispatch(getProfile()).then((profileResult) => {
          if (profileResult.type === "auth/getProfile/fulfilled") {
            const profileLanguage = profileResult.payload?.language;
            if (profileLanguage) {
              const { code: updatedCode, name: updatedName } = profileLanguage;
              const updatedLang = languagesList.find((lang) => lang.code === updatedCode);
              setLanguage(
                updatedLang.id,
                updatedCode,
                flagImages[updatedCode],
                updatedName
              ); // Ensure context matches updated language
              i18n.changeLanguage(updatedCode); // Sync i18n language
            }
          }
        });
      }
    } else {
      const errorMessage =
        result.payload?.detail ||
        result.error?.message ||
        t("Failed to update language preference");
      toast.error(errorMessage); // Show error toast
    }
  });
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

  const hasSetPreferredLanguage = localStorage.getItem('hasSetPreferredLanguage');
  useEffect(() => {
  
    if(user && user.language !== null && hasSetPreferredLanguage !== 'true'){
      const selectedLang = languagesList.find(lang => lang.code === user.language.code);
      setLanguage(selectedLang.id, user.language.code, flagImages[user.language.code] , user.language.name);
      localStorage.setItem('hasSetPreferredLanguage', true);
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
         
          if (result.type === "auth/logout/fulfilled") {
            toast.success(result.payload?.detail);
            dispatch(clearLocation())
            resetLocationAccess();
            localStorage.removeItem('locationUpdated');
            if(isProfilePage || isFavoritesPage || isTripEditPage){
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
    // place the secret key from the scratch/encryptedSecretKey file
    setSecretKey("23a28f8270fd7bef759d20500101040b1f54fdc4cc2622e65c0954ca8de85663")
    
  },[])

  // Helper function to reset location access
const resetLocationAccess = () => {
  try {
    // 1. Clear any stored coordinates in your app state
    // (handled by your clearLocation() action)
    
    // 2. Try to revoke geolocation permission if browser supports it
    if (navigator.permissions?.revoke) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(permissionStatus => {
          if (permissionStatus.state === 'granted') {
            return navigator.permissions.revoke({ name: 'geolocation' });
          }
        })
        .then(() => console.log('Geolocation permission revoked'))
        .catch(err => console.warn('Error revoking location:', err));
    }
    
    // 3. Clear any cached position
    if (navigator.geolocation?.clearWatch) {
      // If you have any active watchers, you'd need to store their IDs
      // and call clearWatch() for each
    }
    
    console.log('Location access has been reset');
  } catch (error) {
    console.warn('Error resetting location access:', error);
  }
};


useEffect(() => {
  const LOCATION_UPDATE_KEY = 'locationUpdated';
  
  const updateUserLocation = async () => {
    
    // Skip if not authenticated or already updated
    if (!isAuthenticated || localStorage.getItem(LOCATION_UPDATE_KEY) === 'true') {
      return;
    }

    try {
      // Check geolocation support
      if (!('geolocation' in navigator)) {
        console.log("Geolocation not supported");
        localStorage.setItem(LOCATION_UPDATE_KEY, 'true');
        return;
      }

      // Check permission state
      let permissionGranted = true;
      if (navigator.permissions?.query) {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        permissionGranted = permissionStatus.state === 'granted';
        
        if (permissionStatus.state === 'denied') {
          localStorage.setItem(LOCATION_UPDATE_KEY, 'true');
          return;
        }
      }

      // Only proceed if permission is granted
      if (permissionGranted) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const payload = {
              location_mode: 'current',
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              city_id: null
            };
            if(isAuthenticated){
              await dispatch(updateLocation(payload));
              localStorage.setItem(LOCATION_UPDATE_KEY, 'true');
            }
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              localStorage.setItem(LOCATION_UPDATE_KEY, 'true');
            }
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      }
    } catch (error) {
      console.error("Location check error:", error);
    }
  };

  updateUserLocation();


}, [isAuthenticated, dispatch]);

const handleNavigateToLogin = () => {
  navigate('/login', { state: { from: location } });
};

  return (
    <>
      <Helmet>
        {seoSettings && (
          <>
            {/* Dynamically add meta-tags */}
            <title>{seoSettings.meta_tags.find(tag => tag.tag === "title")?.content || "Default Title"}</title>
            <meta name="description" content={seoSettings.meta_description || "Default description"} />
            <meta name="keywords" content={seoSettings.meta_keywords || "default,keywords"} />
            <meta property="og:title" content={seoSettings.og_title || ""} />
            <meta property="og:description" content={seoSettings.og_description || ""} />
            <meta property="og:image" content={seoSettings.og_image || ""} />
            <meta property="og:url" content={seoSettings.canonical_url || window.location.href} />
            <meta name="robots" content={seoSettings.robots_settings || "index,follow"} />
          </>
        )}
      </Helmet>
      

  {isOpen && popupState.alert && (
      <Modal onClose={() => togglePopup("alert", false)} customClass="modalSmTypeOne">
        <AlertPopup
          handleNavigateToLogin={handleNavigateToLogin}
          title={alertTitle}
          description={alertMessage}
          buttonText={tCommon('authAlert.favorites.button')}
        />
      </Modal>
    )}

   {loading && location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/password-recovery"  && location.pathname !== "/register/email-confirmation" && !location.pathname.includes("/profile") && <div className="fullPageOverlay">
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
                  {t("nav.my_trips")}
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
                  onError={(e) => { e.target.onerror = null; e.target.src = "/images/language.png"; }}
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
                    {t("nav.my_trips")}
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
