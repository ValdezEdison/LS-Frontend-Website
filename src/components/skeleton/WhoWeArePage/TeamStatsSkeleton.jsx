import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const TeamStatsSkeleton = () => {
  return (
    <>
      <h2 className={styles.teamStatsTitle}><Skeleton width={180} /></h2>
      <div className={styles.teamStatsContainer}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.teamStatItem}>
            <div className={styles.teamStatNumber}><Skeleton width={50} height={40} /></div>
            <div className={styles.teamStatLabel}><Skeleton width={100} /></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamStatsSkeleton;