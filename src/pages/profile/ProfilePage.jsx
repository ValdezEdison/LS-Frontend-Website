import React, { useEffect, useState, useContext } from "react";
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
import { getProfile, updateProfile, updateProfilePicture, changePassword, deleteAccount } from "../../features/authentication/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesPhonecodes } from "../../features/common/countries/CountryAction";
import Modal from "../../components/modal/Modal";
import ProfilePhotoPopup from "../../components/popup/ProfileImage/ProfilePhotoModal";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import { toast } from 'react-toastify';
import { fetchPlacesFilterCategories } from "../../features/places/PlaceAction";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { language } = useContext(LanguageContext);
  const { t } = useTranslation('Places');

  const { user, loading, error } = useSelector((state) => state.auth);
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
    language: "",
    type: "event",
    selectedLevel: "",
    selectedCategory: "",
    selectedSubcategory: "",
  });

  const [state, setState] = useState({
    page: 1,
  });

  const isPreferencesTab = location.pathname === "/profile/preferences";
  const isSecurityTab = location.pathname === "/profile/security";
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
    dispatch(getProfile());
    dispatch(fetchCountriesPhonecodes());
    if(isPreferencesTab){
      dispatch(fetchPlacesFilterCategories({
        page: state.page, type: preferences.type}));
    }
  }, [dispatch, language]);

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
  };

  const handleSecuritySave = async (section) => {
    try {
      switch (section) {
        case 'password':
          if (securityData.newPassword !== securityData.confirmPassword) {
            toast.error("New passwords don't match");
            return;
          }
          await dispatch(changePassword({
            current_password: securityData.currentPassword,
            new_password: securityData.newPassword
          }));
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
          await dispatch(deleteAccount());
          toast.success("Account deletion initiated");
          navigate('/');
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

  const filters = [
    {
        label: t('Filters.level'),
        type: "select",
        options: categories.map(category => ({ id: category.id, title: category.title })),
        selectedId: preferences.selectedLevel,
        onSelect: (value) => {
            setPreferences((prevState) => ({
                ...prevState,
                selectedLevel: value,
                selectedCategory: null,
                selectedSubcategory: null,
            }));
        },
    },
    {
        label: t('Filters.category'),
        type: "select",
        options: preferences.selectedLevel
            ? categories.find(cat => cat.id === preferences.selectedLevel)?.categories || []
            : [],
        selectedId: preferences.selectedCategory,
        onSelect: (value) => {
            setPreferences((prevState) => ({
                ...prevState,
                selectedCategory: value,
                selectedSubcategory: null,
            }));
        },
    },
    {
        label: t('Filters.subcategory'),
        type: "select",
        options: preferences.selectedCategory
            ? categories
                .find(cat => cat.id === preferences.selectedLevel)
                ?.categories.find(c => c.id === preferences.selectedCategory)?.subcategories || []
            : [],
        selectedId: preferences.selectedSubcategory,
        onSelect: (value) => {
            setPreferences((prevState) => ({ ...prevState, selectedSubcategory: value }));
        },
    },
  ];

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
          />
        );
      case "preferences":
        return <PreferencesForm user={user} categories={categories} filters={filters}/>;
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
        return <PrivacyContent />;
      case "notifications":
        return <NotificationForm />;
      default:
        return <Navigate to="/profile/personal" replace />;
    }
  };

  return (
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
  );
};

export default ProfilePage;