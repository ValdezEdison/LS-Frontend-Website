"use client";
import React from "react";
import styles from "./LocalSecretManager.module.css";
import Header from "../../../components/layouts/Header";
import HeroSection from "../../../components/footerBlockPages/localSecretManager/HeroSection";
import InfoSection from "../../../components/footerBlockPages/localSecretManager/InfoSection";
import ThreeStepsSection from "../../../components/footerBlockPages/localSecretManager/ThreeStepsSection";
import TestimonialsSection from "../../../components/footerBlockPages/localSecretManager/TestimonialsSection";
import CallToAction from "../../../components/footerBlockPages/localSecretManager/CallToAction";
import Footer from "../../../components/layouts/Footer";

function LocalSecretManager() {
  return (
    <>
    <div className="page-center">
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <Header />
          <HeroSection />
          <InfoSection />
        </div>
        <ThreeStepsSection />
      </div>
      <div className={styles.bottomSections}>
        <TestimonialsSection />
       
      </div>
    </div>
     <div className={styles.footerWrapper}>
     <CallToAction />
     <Footer />
   </div>
   </>
  );
}

export default LocalSecretManager;
