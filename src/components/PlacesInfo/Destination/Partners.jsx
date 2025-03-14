import React from "react";
import styles from "./Partners.module.css";

const Partners = () => {
  return (
    <section className={styles.partners}>
      <h2 className={styles.title}>Nuestros partners</h2>
      <div className={styles.partnerSlider}>
        <button className={styles.sliderButton} aria-label="Previous partners">
          <div className={styles.arrowLeft} />
        </button>
        <div className={styles.partnerLogos}>
          <div className={styles.partnerLogo} />
          <div className={styles.partnerLogo} />
          <div className={styles.partnerLogo} />
          <div className={styles.partnerLogo} />
          <div className={styles.partnerLogo} />
        </div>
        <button className={styles.sliderButton} aria-label="Next partners">
          <div className={styles.arrowRight} />
        </button>
      </div>
    </section>
  );
};

export default Partners;
