import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const VisionSectionSkeleton = () => {
  return (
    <div className={styles.visionContainer}>
      <h2 className={styles.visionTitle}><Skeleton width={180} /></h2>
      <p className={styles.visionDescription}>
        <Skeleton count={3} width={['100%', '100%', '70%']} />
      </p>
    </div>
  );
};

export default VisionSectionSkeleton;