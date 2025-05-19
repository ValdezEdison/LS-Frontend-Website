import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/ProfileSection/Sidebar";
import PersonalDetails from "../../components/ProfileSection/PersonalDetails";
import Footer from "../../components/layouts/Footer";
import styles from "./ProfilePage.module.css";
import PreferencesForm from "../../components/ProfileSection/PreferencesForm";
import SecurityContent from "../../components/ProfileSection/SecurityContent";
import NotificationForm from "../../components/ProfileSection/NotificationForm";
import PrivacyContent from "../../components/ProfileSection/PrivacyContent";
import { getProfile, updateProfile, updateProfilePicture, changePassword, deleteAccount, fetchUsersGroups, updateUserLanguage, saveSuggestions, logout } from "../../features/authentication/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesPhonecodes } from "../../features/common/countries/CountryAction";
import Modal from "../../components/modal/Modal";
import ProfilePhotoPopup from "../../components/popup/ProfileImage/ProfilePhotoModal";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import { toast } from 'react-toastify';
import { fetchPlacesFilterCategories } from "../../features/places/PlaceAction";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { fetchLanguages } from "../../features/common/languages/LanguageAction";
import LocationSettings from "../../components/ProfileSection/LocationSettings";
import { debounce } from "lodash";
import { fetchCities } from "../../features/common/cities/CityAction";
import ConfirmationPopup from "../../components/popup/Confirmation/ConfirmationPopup";

const ProfilePage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { language } = useContext(LanguageContext);
  const { t } = useTranslation('Places');
  const { t: tProfileSection } = useTranslation('ProfileSection');

  const { user,  loading: mainLoading, userLoading, error, isAuthenticated, groups, groupsLoading } = useSelector((state) => state.auth);
  const loading = userLoading || mainLoading;
  const { phoneCodes } = useSelector((state) => state.countries);
  const { isOpen } = useSelector((state) => state.popup);
  const { categories } = useSelector((state) => state.places);

  // State for personal details form
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: null,
    phonePrefix: "",
    phone: "",
    nationality: "",
    gender: "",
    address: ""
  });

  // State for security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    accountDeletionConfirmed: false
  });

  const [editingSecurityField, setEditingSecurityField] = useState(null);

  const [popupState, setPopupState] = useState({
    alert: false,
    comment: false,
    deleteConfirm: false,
    success: false,
    warning: false,
    profileImage: false
  });

  const [preferences, setPreferences] = useState({
    language: user && user.language ? user.language.id : null,
    languageCode: user && user.language ? user.language.code : "",
    type: "event",
    levelId: null,     
    categoryId: null,  
    subcategoryId: null
  });

  const [state, setState] = useState({
    page: 1,
  });

  const [locationState, setLocationState] = useState({
    geolocation_enabled: false,
    last_known_latitude: null,
    last_known_longitude: null,
    default_latitude: null,
    default_longitude: null,
    default_radius: 5000,
    destinationSearchQuery: "",
    selectedDestinationId: null,
  })

  const isPreferencesTab = location.pathname === "/profile/preferences";
  const isSecurityTab = location.pathname === "/profile/security";
  const isLocationTab = location.pathname === "/profile/location";
  const isNotificationTab = location.pathname === "/profile/notifications";
  const isPrivacyTab = location.pathname === "/profile/privacy";

  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  // Update personal details state when user data loads
  useEffect(() => {
    if (user) {
      setPersonalDetails({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        birthDate: user.birth_date ? new Date(user.birth_date) : null,
        phonePrefix: user.phone_prefix || "",
        phone: user.phone || "",
        nationality: user.nationality || "",
        gender: user.gender || "",
        address: user.address || ""
      });

      setSecurityData(prev => ({
        ...prev,
        twoFactorEnabled: user.two_factor_enabled || false
      }));
    }
  }, [user]);

  useEffect(() => {
    if(isAuthenticated){
      dispatch(getProfile());
      dispatch(fetchCountriesPhonecodes());
      dispatch(fetchUsersGroups());
      if(isPreferencesTab){
        dispatch(fetchPlacesFilterCategories({
          page: state.page, type: preferences.type}));
        dispatch(fetchLanguages());
      } else if(isLocationTab){
        dispatch(fetchCities({}));
      }
    }
   
  }, [dispatch, language, isAuthenticated, isLocationTab, isPreferencesTab]);

  const handleTabChange = (newTab) => {
    navigate(`/profile/${newTab}`);
  };

  const handlePersonalDetailsChange = (field, value) => {
    setPersonalDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecurityDataChange = (field, value) => {
    setSecurityData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleSaveProfile = async () => {
    const updatedData = {
      first_name: personalDetails.firstName,
      last_name: personalDetails.lastName,
      email: personalDetails.email,
      phone_prefix: personalDetails.phonePrefix,
      phone: personalDetails.phone,
    };

    try {
      await dispatch(updateProfile(updatedData));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Failed to update profile:", error);
    }
  };

  const handleSecurityEdit = (section) => {
    setEditingSecurityField(section);
    if (section === 'delete') {
      togglePopup('deleteConfirm', true);
    }
  };

  const handleSecuritySave = async (section) => {
    try {
      switch (section) {
        case 'password':
          if (securityData.newPassword !== securityData.confirmPassword) {
            toast.error("New passwords don't match");
            return;
          }
           dispatch(changePassword({
            old_password: securityData.currentPassword,
            new_password: securityData.newPassword
          })).then((result) => {
            if (result.type === "auth/changePassword/fulfilled") {
              if (result.payload?.detail) {
                toast.success(result.payload.detail);
              }
            } else if (result.type === "auth/changePassword/rejected") {
              const errorMessage = result.payload?.detail || result.error?.message || "Failed to update profile picture";
              toast.error(errorMessage);
            }
          });
          toast.success("Password changed successfully");
          break;
        
        case 'twoFactor':
          // await dispatch(enableTwoFactor(securityData.twoFactorEnabled));
          toast.success(`Two-factor authentication ${securityData.twoFactorEnabled ? 'enabled' : 'disabled'}`);
          break;
        
        case 'sessions':
          // await dispatch(logoutAllSessions());
          toast.success("Logged out from all other sessions");
          break;
        
        case 'delete':
          if (!securityData.accountDeletionConfirmed) {
            toast.error("Please confirm account deletion");
            return;
          }
          await dispatch(deleteAccount()).then((result) => {
            if (result.type === "auth/deleteAccount/fulfilled") {
              if (result.payload?.detail) {
                toast.success(result.payload.detail);
                dispatch(logout());
              }
            } else if (result.type === "auth/deleteAccount/rejected") {
              const errorMessage = result.payload?.detail || result.error?.message || "Failed to update profile picture";
              toast.error(errorMessage);
            }
          });
          toast.success("Account deletion initiated");
          // navigate('/');
          break;
        
        default:
          break;
      }
      
      setEditingSecurityField(null);
      // Reset password fields after saving
      if (section === 'password') {
        setSecurityData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }));
      }
    } catch (error) {
      toast.error(`Failed to update ${section}`);
      console.error(`Failed to update ${section}:`, error);
    }
  };

  const handleSecurityCancel = () => {
    setEditingSecurityField(null);
    // Reset security data to original values
    setSecurityData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: user?.two_factor_enabled || false,
      accountDeletionConfirmed: false
    }));
  };

  const handleProfilePhotoClick = () => {
    togglePopup("profileImage", true);
  };

  const handleProfilePhotoUpdate = async (file) => {
    try {
      dispatch(updateProfilePicture(file)).then((result) => {
        if (result.type === "auth/updateProfilePicture/fulfilled") {
          if (result.payload?.detail) {
            toast.success(result.payload.detail);
            dispatch(getProfile());
          }
        } else if (result.type === "auth/updateProfilePicture/rejected") {
          const errorMessage = result.payload?.detail || result.error?.message || "Failed to update profile picture";
          toast.error(errorMessage);
        }
        togglePopup("profileImage", false);
      });
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      toast.error("An unexpected error occurred while updating your profile picture");
      togglePopup("profileImage", false);
    }
  };


  const handleLevelChange = (levelId) => {
    setPreferences(prev => ({
      ...prev,
      levelId,
      categoryId: null,
      subcategoryId: null,
      page: 1
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setPreferences(prev => ({
      ...prev,
      categoryId,
      subcategoryId: null,
      page: 1
    }));
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setPreferences(prev => ({
      ...prev,
      subcategoryId,
      page: 1
    }));
  };



  const handleSaveLanguage = async () => {
    
    try {
       dispatch(updateUserLanguage(  preferences.language )).then((result) => {
        if (result.type === "auth/updateUserLanguage/fulfilled") {
          if (result.payload?.detail) {
            toast.success(result.payload.detail);
            dispatch(getProfile());
          }
        } else if (result.type === "auth/updateUserLanguage/rejected") {
          const errorMessage = result.payload?.detail || result.error?.message || "Failed to update profile picture";
          toast.error(errorMessage);
        }
       });
      // toast.success(t('Language preference updated successfully'));
      // setEditingField(null);
    } catch (error) {
      toast.error(t('Failed to update language preference'));
      console.error("Failed to update language:", error);
    }
  };
  
  const handleSaveSuggestion = async () => {
    try {
      await dispatch(saveSuggestions({
        title: preferences.suggestion.title,
        type: preferences.suggestion.type,
        levelId: preferences.suggestion.levelId,
        categoryId: preferences.suggestion.categoryId,
        subcategoryId: preferences.suggestion.subcategoryId
      }));
      
      toast.success(t('Suggestion submitted successfully'));
      // setEditingField(null);
      // Reset suggestion form
      setPreferences(prev => ({
        ...prev,
        suggestion: {
          title: "",
          type: "event",
          levelId: null,
          categoryId: null,
          subcategoryId: null
        }
      }));
    } catch (error) {
      toast.error(t('Failed to submit suggestion'));
      console.error("Failed to submit suggestion:", error);
    }
  };


    const debouncedFetchCities = useCallback(
      debounce((countryId, query) => {
        dispatch(fetchCities({ countryId, searchQuery: query }));
      }, 500),
      [dispatch]
    );
  
    useEffect(() => {
      // City search
      if (locationState.destinationSearchQuery.trim() !== "") {
        debouncedFetchCities(null, locationState.destinationSearchQuery);
      } else {
        dispatch(fetchCities({}));
      }
      return () => debouncedFetchCities.cancel();
    }, [locationState.destinationSearchQuery, debouncedFetchCities, dispatch]);

    const handleConfirmDelete = () => {
      togglePopup("deleteConfirm", false);
      setSecurityData(prev => ({
        ...prev,
        accountDeletionConfirmed: true
      }))

      setEditingSecurityField(null);
  
      handleSecuritySave("delete");
    }
  


  const renderContent = () => {
    switch (tab) {
      case "personal":
        return (
          <PersonalDetails
            user={user}
            phoneCodes={phoneCodes}
            personalDetails={personalDetails}
            onPersonalDetailsChange={handlePersonalDetailsChange}
            onSave={handleSaveProfile}
            onProfilePhotoClick={handleProfilePhotoClick}
            groups={groups}
          />
        );
      case "preferences":
        return <PreferencesForm user={user} state={preferences} setState={setPreferences} categories={categories}  handleLevelChange={handleLevelChange} handleCategoryChange={handleCategoryChange} handleSubcategoryChange={handleSubcategoryChange} onSaveLanguage={handleSaveLanguage} onSaveSuggestion={handleSaveSuggestion}/>;
      case "location":
        return <LocationSettings state={locationState} setState={setLocationState} />;
      case "security":
        return (
          <SecurityContent 
            user={user}
            securityData={securityData}
            editingField={editingSecurityField}
            onEdit={handleSecurityEdit}
            onSave={handleSecuritySave}
            onCancel={handleSecurityCancel}
            onChange={handleSecurityDataChange}
          />
        );
      case "privacy":
        return <PrivacyContent user={user} />;
      case "notifications":
        return <NotificationForm  user={user}/>;
      default:
        return <Navigate to="/profile/personal" replace />;
    }
  };

  return (
    <>
      {isOpen && popupState.deleteConfirm && (
        <Modal
          onClose={() => togglePopup("deleteConfirm", false)}
          customClass="modalSmTypeOne"
          hideCloseButton={true}
        >
          <ConfirmationPopup
            title={tProfileSection('security.sections.delete.title')}
            description={tProfileSection('security.sections.delete.description')}
            onCancel={() => {
              togglePopup("deleteConfirm", false)
              setEditingSecurityField(null);
             
            }}
            onConfirm={handleConfirmDelete}
          />
        </Modal>
      )}
    <div className={styles.profilePage}>
      <Header />
      <main className="page-center">
        <div className={styles.profilePageMain}>
          <Sidebar activeTab={tab} onTabChange={handleTabChange} />
          {renderContent()}
        </div>
      </main>
      <Footer />

      {popupState.profileImage && isOpen && (
        <Modal title="" customClass="modalSmTypeOne" onClose={() => togglePopup("profileImage", false)}>
          <ProfilePhotoPopup
            onSave={handleProfilePhotoUpdate}
            currentPhoto={user?.profile_picture?.original}
            loading={loading}
            error={error}
          />
        </Modal>
      )}
    </div>
    </>
  );
};

export default ProfilePage;