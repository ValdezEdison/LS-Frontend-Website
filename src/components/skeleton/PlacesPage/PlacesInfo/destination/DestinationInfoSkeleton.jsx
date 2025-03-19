import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS
import styles from "../../../../PlacesInfo/Destination/DestinationInfo.module.css";
import SubNavMenu from "../../../../common/SubNavMenu";

const DestinationInfoSkeleton = () => {
  return (
    <section className={styles.destinationInfo}>
      <div className="page-center">
        {/* Title Skeleton */}
        <Skeleton className={styles.title} height={40} width="60%" />

        <SubNavMenu activeLink="destino" />

        {/* Image Gallery Skeleton */}
        <div className={styles.imageGallery}>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className={styles.galleryImage} height={200} />
          ))}
        </div>

        {/* View More Button Skeleton */}
        <Skeleton className={styles.viewMoreButton} height={30} width={100} />

        {/* Info Section Skeleton */}
        <div className={styles.infoSection}>
          <Skeleton className={styles.infoTitle} height={30} width="50%" />
          <Skeleton className=""  height={40} width={120} />
        </div>

        {/* Description Skeleton */}
        <Skeleton className={styles.description} height={100} />

        {/* Coordinates Skeleton */}
        <div className={styles.coordinates}>
          <Skeleton height={20} width="40%" />
        </div>
      </div>
    </section>
  );
};

export default DestinationInfoSkeleton;