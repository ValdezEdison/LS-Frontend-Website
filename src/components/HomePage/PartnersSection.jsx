import React from "react";
import styles from "./PartnersSection.module.css";
import { useTranslation } from "react-i18next";

const PartnersSection = () => {

  const { t } = useTranslation("PartnersSection");

  return (
    <section className={styles.partnersSection}>
      <h2 className={styles.sectionTitle}>{t("title")}</h2>
      <div className={styles.partnersSlider}>
        <button className={styles.sliderButton} aria-label="Previous partner">
          <span className={styles.arrowLeft}></span>
        </button>
        <div className={styles.partnerLogos}>
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={styles.partnerLogo}
              aria-label={`Partner logo ${index}`}
            ></div>
          ))}
        </div>
        <button className={styles.sliderButton} aria-label="Next partner">
          <span className={styles.arrowRight}></span>
        </button>
      </div>
    </section>
  );
};

export default PartnersSection;
