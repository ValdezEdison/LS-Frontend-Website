import React from "react";
import DestinationCard from "./DestinationCard";
import styles from "./DestinationGrid.module.css";
import { PlaceHolderImg2 } from "../common/Images";
import DestinationCardSkeleton from "../skeleton/common/DestinationCardSkeleton";


const DestinationGrid = ({ destinations, loading, handleActions }) => {
  return (
    <div className={styles.destinationGrid}>
      {loading ? (
        // Show skeleton cards while loading
        Array.from({ length: 12 }).map((_, index) => (
          <DestinationCardSkeleton key={`skeleton-${index}`} />
        ))
      ) : (
        // Show actual cards when data is loaded
        destinations.map((destination, index) => (
          <DestinationCard
            key={index}
            destinationId={destination.id}
            name={destination.name}
            results={destination.number_of_sites}
            image={destination.images[0]?.original || PlaceHolderImg2}
            handleActions={handleActions}
          />
        ))
      )}
    </div>
  );
};

export default DestinationGrid;
