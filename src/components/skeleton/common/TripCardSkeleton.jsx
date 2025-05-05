import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "../../../components/TravelComponents/TripCard.module.css";

const TripCardSkeleton = () => {
  return (
    <div className={styles.tripCard}>
      <div className={styles.tripInfo}>
        <Skeleton className={styles.tripImage} height={120} width={120} />
        <div className={styles.tripDetails}>
          <h3 className={styles.tripTitle}>
            <Skeleton width={180} />
          </h3>
          <p className={styles.tripSites}>
            <Skeleton width={100} />
          </p>
          <p className={styles.tripDates}>
            <Skeleton width={150} />
          </p>
        </div>
      </div>
      <Skeleton className={styles.tripActions} style={{backgroundImage: 'none'}}>
        <div className={styles.tripActionsDropdown}>
          <Skeleton width={40} height={20} />
          <Skeleton width={50} height={20} />
        </div>
      </Skeleton>
    </div>
  );
};

export default TripCardSkeleton;