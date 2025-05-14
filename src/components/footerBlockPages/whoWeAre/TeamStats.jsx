import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const TeamStats = ({ stats }) => {
  return (
    <>
      <h2 className={styles.teamStatsTitle}>Nuestro equipo</h2>
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