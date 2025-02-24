import React from "react";
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/PlacesPage/Sidebar";
import MainContent from "../../components/PlacesPage/MainContent";
import Footer from "../../components/layouts/Footer";
import styles from "./PlacesPage.module.css";

const PlacesPage = () => {
  return (
    <div className={styles.placesPage}>
      <Header />
      <div className="page-center">
        <div className={styles.content}>
          <Sidebar />
          <MainContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlacesPage;
