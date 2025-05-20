"use client";
import React from "react";
import Header from "../../../components/layouts/Header";
import HeroSection from "../../../components/footerBlockPages/ambassadors/HeroSection"
import AboutSection from "../../../components/footerBlockPages/ambassadors/AboutSection"
import BenefitsSection from "../../../components/footerBlockPages/ambassadors/BenefitsSection";
import TestimonialsSection from "../../../components/footerBlockPages/ambassadors/TestimonialsSection";
import ContactSection from "../../../components/footerBlockPages/ambassadors/ContactSection";
import Footer from "../../../components/layouts/Footer";
import styles from "./Ambassadors.module.css";

function Ambassadors() {
  return (
    <div className={styles.embajadores}>
      <div className={styles.container}>
        <Header />
        <main className="page-center">
          <HeroSection />
          <AboutSection />
          <BenefitsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Ambassadors;
