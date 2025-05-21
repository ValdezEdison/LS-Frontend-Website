import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";
import { useTranslation } from "react-i18next";

const TeamStats = ({ stats }) => {

  const { t } = useTranslation("WhoWeAre");

  return (
    <>
      <h2 className={styles.teamStatsTitle}>{t('team.title')}</h2>
      <div className={styles.teamStatsContainer}>
        {stats.map((stat, index) => (
          <div className={styles.teamStatItem} key={index}>
            <div className={styles.teamStatNumber}>{stat.count}</div>
            <div className={styles.teamStatLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamStats;