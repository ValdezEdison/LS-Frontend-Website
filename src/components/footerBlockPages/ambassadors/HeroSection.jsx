import React from "react";
import styles from "./HeroSection.module.css";
import { useTranslation } from "react-i18next";

function HeroSection() {

  const { t } = useTranslation("Ambassadors");

  return (
    <section className={styles.heroSection}>
      <h1 className={styles.title}>{t('hero.title')}</h1>
      <div className={styles.banner}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/fd84dbde5ea44dcc455deaf1fbdf51a2493b13fd?placeholderIfAbsent=true"
          alt={t('hero.bannerAlt')}
          className={styles.bannerImage}
        />
        <h2 className={styles.bannerTitle}>
        {t('hero.bannerTitle')}
        </h2>
      </div>
    </section>
  );
}

export default HeroSection;
