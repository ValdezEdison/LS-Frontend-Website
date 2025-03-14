import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../PlacesPage/Sidebar.module.css";

const FilterSkeleton = () => {
  return (
    <div className={styles.filters}>
      <h2 className={styles.filterTitle}><Skeleton width={100} /></h2>
      <div className={styles.categoryFilters}>
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} height={20} width={150} />
        ))}
      </div>
      <h3 className={styles.ratingTitle}><Skeleton width={100} /></h3>
      <div className={styles.ratingFilters}>
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} height={20} width={150} />
        ))}
      </div>
    </div>
  );
};

export default FilterSkeleton;