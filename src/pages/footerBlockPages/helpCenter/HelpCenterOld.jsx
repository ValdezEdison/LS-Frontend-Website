import React from "react";
import styles from "./HelpCenter.module.css";
import Header from "../../../components/layouts/Header";
import SearchBanner from "../../../components/footerBlockPages/helpCenter/SearchBanner";
import TopicsSection from "../../../components/footerBlockPages/helpCenter/TopicsSection";
import ContactBanner from "../../../components/footerBlockPages/helpCenter/ContactBanner";
import Footer from "../../../components/layouts/Footer";

function HelpCenter() {
  return (
    <>
    <div className="page-center">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <Header />
          <SearchBanner />
        </div>
        <TopicsSection />
      </div>
      <div className={styles.contactSection}>
      
      </div>
    </div>
      <ContactBanner />
      <Footer />
      </>
  );
}

export default HelpCenter;
