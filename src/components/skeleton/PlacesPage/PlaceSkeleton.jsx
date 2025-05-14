import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../PlacesPage/MainContent.module.css";
import styles2 from "../../common/PlaceCard.module.css";
import { PlaceHolderImg2 } from "../../common/Images";

const PlaceCardSkeleton = () => {
  return (
    <div className={styles2.placeCard}>
      <div className={styles2.placeImageContainer}>
        <Skeleton className={styles.tripImage} height={120} width={140} />
      </div>
      <div className={styles2.placeInfo}>
        <Skeleton height={20} width={`80%`} />
        <Skeleton height={20} width={`60%`} />
        <Skeleton height={20} width={`40%`} />
        <Skeleton height={30} width={`50%`} />
      </div>
      <div className={styles2.placeActions}>
        <Skeleton height={40} width={`45%`} />
        <Skeleton height={40} width={`45%`} />
      </div>
    </div>
  );
};

const RecommendedPlacesSkeleton = () => {
  return (
    <div className={styles.recommendedPlaces}>
      <h2 className={styles.recommendedTitle}><Skeleton width={200} /></h2>
      <div className={styles.recommendedList}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className={styles.recommendedItem}>
            <Skeleton height={150} />
            <Skeleton height={20} width={`70%`} />
          </div>
        ))}
      </div>
    </div>
  );
};

const MainContentSkeleton = () => {
  return (
    <main className={styles.mainContent}>
      <div className={styles.header}>
        <h1 className={styles.title}><Skeleton width={300} /></h1>
      </div>
      <div className={styles.placesList}>
        {[...Array(10)].map((_, index) => (
          <PlaceCardSkeleton key={index} />
        ))}
      </div>
      <RecommendedPlacesSkeleton />
    </main>
  );
};

export { MainContentSkeleton, PlaceCardSkeleton, RecommendedPlacesSkeleton }; 


