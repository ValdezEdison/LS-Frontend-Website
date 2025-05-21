"use client";
import React, { useEffect, useState, useContext } from "react";
import styles from "./WorkWithUs.module.css";
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/footerBlockPages/common/Sidebar";
import JobSearch from "../../components/footerBlockPages/joinOurTeam/JobSearch";
import DepartmentSection from "../../components/footerBlockPages/joinOurTeam/DepartmentSection";
import CompanyStats from "../../components/footerBlockPages/joinOurTeam/CompanyStats";
import Testimonials from "../../components/footerBlockPages/joinOurTeam/Testimonials";
import ContactCTA from "../../components/footerBlockPages/joinOurTeam/ContactCTA";
import Footer from "../../components/layouts/Footer";
import NewsletterBanner from "../../components/footerBlockPages/common/NewsLetterBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkWithUs } from "../../features/cms/Pages/PagesAction";
import { LanguageContext } from "../../context/LanguageContext";


function WorkWithUs() {

const { language, languageId } = useContext(LanguageContext);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWorkWithUs(language));
  }, [dispatch, language, languageId]);

  return (
    <div className={styles.trabajaconnosotros}>
      <Header />
      <div className="page-center">
        <main className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <Sidebar />
            <JobSearch />
          </div>
          <h2 className={styles.sectionTitle}>
            Explora posiciones abiertas por departamento
          </h2>
          <DepartmentSection />
          <button className={styles.viewAllButton}>Ver todo</button>
        </main>
        
      </div>
      <CompanyStats />
      <div className="page-center">
        <Testimonials />
        
      </div>
      <NewsletterBanner title="Si no encuentras la posición que buscas, puedes ponerte en contacto
          con nosotros" buttonText="Contactar"/>
     
      <Footer />
    </div>
  );
}

export default WorkWithUs;
