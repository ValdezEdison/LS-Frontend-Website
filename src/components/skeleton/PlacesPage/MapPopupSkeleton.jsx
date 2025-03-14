import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../PlacesPage/MapPopup.module.css";

const MapPopupSkeleton = () => {
  return (
    <div className={styles.mapPopup}>
      <Skeleton height={500} />
      <div className={styles.mapPopupContent}>
        <Skeleton height={40} width={200} />
        <Skeleton height={20} width={150} />
        <Skeleton height={40} width={100} />
      </div>
    </div>
  );
};

export default MapPopupSkeleton;