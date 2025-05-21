"use client";
import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";
import { useTranslation } from "react-i18next";

function JobSearch() {

  const { t } = useTranslation("WorkWithUs");

  return (
    <section className={styles.heroSection}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/ebc71e4391e9dfda0805c60511805e8c227a05b6?placeholderIfAbsent=true"
        alt={t('jobSearch.backgroundAlt')}
        className={styles.heroBackground}
      />
      <div className={styles.searchContainer}>
        <h1 className={styles.heroTitle}>{t('jobSearch.title')}</h1>
        <div className={styles.searchBox}>
          <img src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/fe2ecee8a7f73c71620770be14a276a46e4b7cbd?placeholderIfAbsent=true" alt={t('jobSearch.searchIconAlt')}  className={styles.searchIcon} />
          <input
            type="text"
            placeholder={t('jobSearch.placeholder')}
            className={styles.searchInput}
          />
        </div>
      </div>
    </section>
  );
}

export default JobSearch;

