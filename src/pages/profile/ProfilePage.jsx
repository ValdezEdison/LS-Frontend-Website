import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/ProfileSection/Sidebar";
import PersonalDetails from "../../components/ProfileSection/PersonalDetails";
import Footer from "../../components/layouts/Footer";
import styles from "./ProfilePage.module.css";
import PreferencesForm from "../../components/ProfileSection/PreferencesForm";
import SecurityContent from "../../components/ProfileSection/SecurityContent";
import NotificationForm from "../../components/ProfileSection/NotificationForm";
import PrivacyContent from "../../components/ProfileSection/PrivacyContent";
import { getProfile, updateProfile, updateProfilePicture } from "../../features/authentication/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesPhonecodes } from "../../features/common/countries/CountryAction";
import Modal from "../../components/modal/Modal";
import ProfilePhotoPopup from "../../components/popup/ProfileImage/ProfilePhotoModal";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);
  const { phoneCodes } = useSelector((state) => state.countries);
  const { isOpen } = useSelector((state) => state.popup);

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
  const [popupState, setPopupState] = useState({

    alert: false,
    comment: false,
    deleteConfirm: false,
    success: false,
    warning: false,
    profileImage: false
  });

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
    }
  }, [user]);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(fetchCountriesPhonecodes());
  }, [dispatch]);

  const handleTabChange = (newTab) => {
    navigate(`/profile/${newTab}`);
  };

  const handlePersonalDetailsChange = (field, value) => {
    setPersonalDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    const updatedData = {
      first_name: personalDetails.firstName,
      last_name: personalDetails.lastName,
      email: personalDetails.email,
      // birth_date: personalDetails.birthDate ? personalDetails.birthDate.toISOString() : null,
      phone_prefix: personalDetails.phonePrefix,
      phone: personalDetails.phone,
      // nationality: personalDetails.nationality,
      // gender: personalDetails.gender,
      // address: personalDetails.address
    };

    try {
      await dispatch(updateProfile(updatedData));
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleProfilePhotoClick = () => {
    togglePopup("profileImage", true);
  };

  const handleProfilePhotoUpdate = async (file) => {
    try {

      // Dispatch the update action and handle the response
      dispatch(updateProfilePicture(file)).then((result) => {
      
      
      if (result.type === "auth/updateProfilePicture/fulfilled") {
        if (result.payload?.detail) {
          toast.success(result.payload.detail);
          dispatch(getProfile());
        }
        // You might want to refresh user data here
        // dispatch(fetchUserData());
      } else if (result.type === "auth/updateProfilePicture/rejected") {
        const errorMessage = result.payload?.detail || result.error?.message || "Failed to update profile picture";
        toast.error(errorMessage);
      }

      // Close the popup regardless of success/failure
      togglePopup("profileImage", false);
    })
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      toast.error("An unexpected error occurred while updating your profile picture");
      togglePopup("profileImage", false);
    }
  };

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
        return <PreferencesForm user={user} />;
      case "security":
        return <SecurityContent />;
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
        <Modal title="Update Profile Photo" customClass="modalSmTypeOne" onClose={() => togglePopup("profileImage", false)}>
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