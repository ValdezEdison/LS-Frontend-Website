import React from "react";
import TripCard from "./TripCard";
import styles from "./TripList.module.css";
import TripCardSkeleton from "../../components/skeleton/common/TripCardSkeleton";
import Skeleton from "react-loading-skeleton";

const TripList = ({ title, trips, isPast, handleActions, isLoading }) => {

  const skeletonCount = 3;
  
  return (
    <section className={styles.tripListSection}>
      {isLoading ? (
        <Skeleton height={40} width={200} className={styles.tripListTitle}/>
      ) : (
        <h2 className={styles.tripListTitle}>{title}</h2>
      )}
     
      <div className={styles.tripListContainer}>
      {isLoading ? (
          Array(skeletonCount).fill(0).map((_, index) => (
            <TripCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          trips.map((trip) => (
            <TripCard 
              key={trip.id} 
              trip={trip} 
              isPast={isPast} 
              handleActions={handleActions} 
            />
          ))
        )}
      </div>
    </section>
  );
};

export default TripList;