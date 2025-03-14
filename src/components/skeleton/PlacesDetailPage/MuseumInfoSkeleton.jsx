import React from "react";
import styles from "../../PlacesDetailPage/MuseumInfo.module.css";
import Skeleton from "react-loading-skeleton";

const MuseumInfoSkeleton = () => {
  return (
    <div className={styles.museumInfo}>
      <div className={styles.museumInfoLeft}>
        <h1 className={styles.museumName}>
          <Skeleton width={200} /> {/* Placeholder for the museum name */}
        </h1>
        <div className={styles.location}>
          <Skeleton circle width={20} height={20} /> {/* Placeholder for the location icon */}
          <Skeleton width={150} /> {/* Placeholder for the address */}
        </div>
      </div>
      <div className={styles.museumInfoRight}>
        <div className={styles.contactInfo}>
          <Skeleton circle width={20} height={20} /> {/* Placeholder for the web icon */}
          <Skeleton width={100} /> {/* Placeholder for the website button */}
        </div>
        <p className={styles.phoneNumber}>
          <Skeleton width={120} /> {/* Placeholder for the phone number */}
        </p>
      </div>
    </div>
  );
};

export default MuseumInfoSkeleton;