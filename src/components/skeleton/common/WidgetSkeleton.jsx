import React from "react";
import styles from "../../common/Widget.module.css";
import Skeleton from "react-loading-skeleton";

const WigetSkeleton = () => {
  return (
    <section className={styles.nearbyPlaces}>
      <h2 className={styles.sectionTitle}>
        <Skeleton width={200} /> {/* Placeholder for the section title */}
      </h2>
      <div className={styles.placesList}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={styles.placeCard}>
            <Skeleton height={150} width="100%" /> {/* Placeholder for the place image */}
            <Skeleton width={120} /> {/* Placeholder for the place name */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WigetSkeleton;