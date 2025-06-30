"use client";
import React from "react";
import styles from "./CallToAction.module.css";
import { useTranslation } from "react-i18next";

function CallToAction() {

  const { t } = useTranslation("LocalSecretManager");

  const handleClick = () => {
    window.location.href = "/ambassadors/#page-center";
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          {t('cta.title')}
        </h2>
        <p className={styles.ctaDescription}>
          {t('cta.description')}
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.ctaButton} onClick={handleClick}>
          {t('cta.buttonText')}
        </button>
      </div>
    </section>
  );
}

export default CallToAction;
