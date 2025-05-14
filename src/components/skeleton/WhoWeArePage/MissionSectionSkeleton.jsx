import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const MissionSectionSkeleton = () => {
  return (
    <div className={styles.missionContainer}>
      <h2 className={styles.missionTitle}><Skeleton width={180} /></h2>
      <p className={styles.missionDescription}>
        <Skeleton count={3} width={['100%', '100%', '80%']} />
      </p>
    </div>
  );
};

export default MissionSectionSkeleton;