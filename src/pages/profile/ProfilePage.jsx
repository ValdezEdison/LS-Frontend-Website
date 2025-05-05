import React, { useEffect } from "react";
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
import { getProfile } from "../../features/authentication/AuthActions";
import { useDispatch, useSelector } from "react-redux";


const ProfilePage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  console.log( user, 'profile');

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleTabChange = (newTab) => {
    navigate(`/profile/${newTab}`);
  };

  const renderContent = () => {
    switch (tab) {
      case "personal":
        return <PersonalDetails user={user}/>;
      case "preferences":
        return <PreferencesForm user={user}/>;
      case "security":
        return <SecurityContent />;
      case "privacy":
        return <PrivacyContent />;
      case "notifications":
        return <NotificationForm />;
      default:
        // Redirect to personal if invalid tab
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
    </div>
  );
};

export default ProfilePage;