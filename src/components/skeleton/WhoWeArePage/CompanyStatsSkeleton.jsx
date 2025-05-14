import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const CompanyStatsSkeleton = () => {
  return (
    <>
      <h2 className={styles.companyStatsTitle}><Skeleton width={180} /></h2>
      <div className={styles.statsContainer}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.statItem}>
            <div className={styles.statNumber}><Skeleton width={60} height={40} /></div>
            <div className={styles.statLabel}><Skeleton width={100} /></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CompanyStatsSkeleton;