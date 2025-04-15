import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/ProfileSection/Sidebar";
import PersonalDetails from "../../components/ProfileSection/PersonalDetails";
import Footer from "../../components/layouts/Footer";
import styles from "./ProfilePage.module.css";
import PreferencesForm from "../../components/ProfileSection/PreferencesForm";
import SecurityContent from "../../components/ProfileSection/SecurityContent";
import NotificationForm from "../../components/ProfileSection/NotificationForm";
import PrivacyContent from "../../components/ProfileSection/PrivacyContent";

const ProfilePage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  const handleTabChange = (newTab) => {
    navigate(`/profile/${newTab}`);
  };

  const renderContent = () => {
    switch (tab) {
      case "personal":
        return <PersonalDetails />;
      case "preferences":
        return <PreferencesForm />;
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