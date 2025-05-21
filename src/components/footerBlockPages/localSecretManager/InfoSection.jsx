"use client";
import React from "react";
import styles from "./InfoSection.module.css";
import { useTranslation } from "react-i18next";

function InfoSection() {

  const { t } = useTranslation("LocalSecretManager");
  return (
    <div className="page-center">
      <section className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>
        {t('info.title')}
        </h2>
        <p className={styles.sectionDescription}>
        {t('info.description')}
        </p>
      </section>
    </div>
    
  );
}

export default InfoSection;
