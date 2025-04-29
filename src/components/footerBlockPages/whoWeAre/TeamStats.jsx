import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const TeamStats = () => {
  return (
    <>
      <h2 className={styles.teamStatsTitle}>Nuestro equipo</h2>
      <div className={styles.teamStatsContainer}>
        <div className={styles.teamStatItem}>
          <div className={styles.teamStatNumber}>260</div>
          <div className={styles.teamStatLabel}>Empleados</div>
        </div>
        <div className={styles.teamStatItem}>
          <div className={styles.teamStatNumber}>5+</div>
          <div className={styles.teamStatLabel}>Países</div>
        </div>
        <div className={styles.teamStatItem}>
          <div className={styles.teamStatNumber}>12</div>
          <div className={styles.teamStatLabel}>Nacionalidades</div>
        </div>
      </div>
    </>
  );
};

export default TeamStats;
