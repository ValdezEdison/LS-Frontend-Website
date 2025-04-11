import React from "react";
import styles from "../../../components/exoplore/DestinationCard.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DestinationCardSkeleton = () => {
  return (
    <div className={styles.destinationCard}>
      <Skeleton 
        height={180} 
        className={styles.destinationImage}
        containerClassName={styles.skeletonImageContainer}
      />
      
      <div className={styles.destinationInfo}>
        <h3 className={styles.destinationName}>
          <Skeleton width="80%" />
        </h3>
        <p className={styles.destinationResults}>
          <Skeleton width="60%" />
        </p>
      </div>
    </div>
  );
};

export default DestinationCardSkeleton;