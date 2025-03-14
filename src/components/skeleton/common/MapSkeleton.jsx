import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../PlacesPage/Sidebar.module.css";
import { PlaceHolderImg2 } from "../../common/Images";

const MapSkeleton = () => {
  return (
    <div className={styles.mapContainer}>
      <img src={PlaceHolderImg2} alt="" />
      <Skeleton height={40} width={100} />
    </div>
  );
};

export default MapSkeleton;