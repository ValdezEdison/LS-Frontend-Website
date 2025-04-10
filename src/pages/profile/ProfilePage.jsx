import React from "react";
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/ProfileSection/Sidebar";
import PersonalDetails from "../../components/ProfileSection/PersonalDetails";
import Footer from "../../components/layouts/Footer";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.profilePage}>
      <Header />
      <main className="page-center">
        <div className={styles.profilePageMain}>
          <Sidebar />
          <PersonalDetails />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
