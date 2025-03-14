import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../PlacesPage/MainContent.module.css";

const PromotionalBannerSkeleton = () => {
  return (
    <div className={styles.promotionalBanner}>
      <Skeleton height={300} />
      <div className={styles.promotionalContent}>
        <h2 className={styles.promotionalTitle}><Skeleton width={200} /></h2>
        <p className={styles.promotionalText}>
          <Skeleton count={3} />
        </p>
        <Skeleton height={40} width={100} />
      </div>
    </div>
  );
};

export default PromotionalBannerSkeleton;