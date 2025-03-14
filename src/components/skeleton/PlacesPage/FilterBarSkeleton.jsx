import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../PlacesPage/FilterBar.module.css";

const FilterBarSkeleton = () => {
  return (
    <div className={styles.destinationFilter}>
      {[...Array(3)].map((_, index) => (
        <div key={index} className={styles.dropdown}>
          <Skeleton height={40} width={200} />
        </div>
      ))}
    </div>
  );
};

export default FilterBarSkeleton;