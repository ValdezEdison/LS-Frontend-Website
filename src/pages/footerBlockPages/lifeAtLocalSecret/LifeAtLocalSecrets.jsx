"use client";
import React, { useState } from "react";
import styles from "./LifeAtLocalSecrets.module.css";
import HeroSection from "../../../components/footerBlockPages/lifeAtLocalSecret/HeroSection";
import WorkPhilosophySection from "../../../components/footerBlockPages/lifeAtLocalSecret/WorkPhilosophySection";
import BenefitsSection from "../../../components/footerBlockPages/lifeAtLocalSecret/BenefitsSection";
import FaqSection from "../../../components/footerBlockPages/lifeAtLocalSecret/FaqSection";
import Sidebar from "../../../components/footerBlockPages/common/Sidebar";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import { useTranslation } from "react-i18next";

function LifeAtLocalSecrets() {

  const { t } = useTranslation("LifeAtLocalSecrets");
  return (
    <>
    <Header />
    <main>
      <div className={styles.contentWrapper}>
        <div className="page-center">
          <div className={styles.topSection}>
            <Sidebar />
            <div className={styles.contentRight}>
              <HeroSection />
              <WorkPhilosophySection
                imageUrl="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/3a828e75aae7d6413b581f349f0ae00b3cf84ea2?placeholderIfAbsent=true"
                title={t('philosophy.projectWork.title')}
                description={t('philosophy.projectWork.description')}
                imageLeft={true}
                containerClassName={styles.sectionProjects}
              />
              <WorkPhilosophySection
              imageUrl="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b13848e15dd1ae6cc23fc6eaa977313bef2d10a5?placeholderIfAbsent=true"
              title={t('philosophy.travelers.title')}
              description={t('philosophy.travelers.description')}
              imageLeft={false}
              containerClassName={styles.sectionTravelers}
            />
             <WorkPhilosophySection
            imageUrl="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/04abb9152241148c9d7dff53b38a569e6f87cead?placeholderIfAbsent=true"
            title={t('philosophy.activityBased.title')}
            description={t('philosophy.activityBased.description')}
            imageLeft={true}
            containerClassName={styles.sectionActivities}
          />
            </div>
          
          </div>
        </div>
      </div>

      <BenefitsSection />
      <div className="page-center">
        <FaqSection />
      </div> 
    </main>
    <Footer />
    </>
  );
}

export default LifeAtLocalSecrets;
