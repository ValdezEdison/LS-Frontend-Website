import React from "react";
import TripCard from "./TripCard";
import styles from "./TripList.module.css";

const TripList = ({ title, trips, isPast, handleActions }) => {
  console.log("trips", trips)
  return (
    <section className={styles.tripListSection}>
      <h2 className={styles.tripListTitle}>{title}</h2>
      <div className={styles.tripListContainer}>
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} isPast={isPast} handleActions={handleActions} />
        ))}
      </div>
    </section>
  );
};

export default TripList;