import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";
import { useTranslation } from "react-i18next";

const CompanyStats = ({ stats }) => {

  const { t } = useTranslation("WhoWeAre");
  return (
    <>
      <h2 className={styles.companyStatsTitle}>{t('company.title')}</h2>
      <div className={styles.statsContainer}>
        {stats.map((stat, index) => (
          <div className={styles.statItem} key={index}>
            <div className={styles.statNumber}>{stat.count}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CompanyStats;