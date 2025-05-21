"use client";
import React from "react";
import styles from "./HeroSection.module.css";

function HeroSection() {
  return (
    <div className="page-center">
       <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Local secret manager</h1>
        <div className={styles.bannerContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1b0cf33549e7a4a5182cbcfa45ae5da81449ce41?placeholderIfAbsent=true"
            alt="Background"
            className={styles.backgroundImage}
          />
          <p className={styles.bannerText}>
            ¡Haz crecer tu negocio con Local Secrets!
          </p>
        </div>
      </div>
    </section>
    </div>
   
  );
}

export default HeroSection;
