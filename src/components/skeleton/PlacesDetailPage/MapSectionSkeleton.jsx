import React from "react";
import styles from "../../PlacesDetailPage/MapSection.module.css";
import Skeleton from "react-loading-skeleton"; // Assuming you're using react-loading-skeleton
import MapSkeleton from "../common/MapSkeleton";

const MapSectionSkeleton = () => {
  return (
    <div className={styles.mapSection}>
      <MapSkeleton />
      <div className={styles.openingHours}>
        <h3 className={styles.openingHoursTitle}>
          <Skeleton width={150} /> {/* Placeholder for the title */}
        </h3>
        <ul className={styles.hoursList}>
          {[...Array(3)].map((_, index) => (
            <li key={index} className={styles.hoursItem}>
              <Skeleton width={100} /> {/* Placeholder for the day */}
              <Skeleton width={120} /> {/* Placeholder for the hours */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapSectionSkeleton;