import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const CompanyStats = () => {
  return (
    <>
      <h2 className={styles.companyStatsTitle}>Nuestra empresa</h2>
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>43</div>
          <div className={styles.statLabel}>Países</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>+100</div>
          <div className={styles.statLabel}>Destinos</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>+20</div>
          <div className={styles.statLabel}>Idiomas</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>1.250</div>
          <div className={styles.statLabel}>Local secrets</div>
        </div>
      </div>
    </>
  );
};

export default CompanyStats;
