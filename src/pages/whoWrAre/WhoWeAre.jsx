"use client";
import React from "react";
import styles from "./WhoWeAre.module.css";
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/footerBlockPages/common/Sidebar";
import AboutContent from "../../components/footerBlockPages/whoWeAre/AboutContent";
import MissionSection from "../../components/footerBlockPages/whoWeAre/MissionSection";
import ValuesSection from "../../components/footerBlockPages/whoWeAre/ValuesSection";
import VisionSection from "../../components/footerBlockPages/whoWeAre/VisionSection";
import CompanyStats from "../../components/footerBlockPages/whoWeAre/CompanyStats";
import TeamStats from "../../components/footerBlockPages/whoWeAre/TeamStats";
import NewsLetterBanner from "../../components/footerBlockPages/common/NewsLetterBanner";
import Footer from "../../components/layouts/Footer";

function WhoWeAre() {
  return (
    <main className={styles.pageContainer}>
      <Header />
      <section className={styles.contentWrapper}>
        <Sidebar />
        <AboutContent />
      </section>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8576e220dbf77a89b0b6ab392ef453118d077c2e?placeholderIfAbsent=true"
        alt="Company image"
        className={styles.companyImage}
      />
      <section className={styles.infoSectionsContainer}>
        <MissionSection />
        <hr className={styles.sectionDivider} />
        <ValuesSection />
        <hr className={styles.sectionDivider} />
        <hr className={styles.sectionDivider} />
        <VisionSection />
        <hr className={styles.sectionDivider} />
        <CompanyStats />
        <hr className={styles.sectionDivider} />
        <TeamStats />
      </section>
      <NewsLetterBanner title="¿Quieres conocer más sobre la vida en Local Secrets?" buttonText="Descubrir más"/>
      <Footer />
    </main>
  );
}

export default WhoWeAre;
