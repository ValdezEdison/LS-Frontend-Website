import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const ValuesSectionSkeleton = () => {
  return (
    <>
      <h2 className={styles.valuesTitle}><Skeleton width={180} /></h2>
      <div className={styles.valuesContainer}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.valueItem}>
            <div className={styles.valueIcon}><Skeleton circle width={40} height={40} /></div>
            <div className={styles.valueText}><Skeleton width={80} /></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ValuesSectionSkeleton;