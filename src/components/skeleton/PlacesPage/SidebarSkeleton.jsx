import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../PlacesPage/Sidebar.module.css";
import { PlaceHolderImg2 } from "../../common/Images";

const SidebarSkeleton = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.mapContainer}>
        {/* <Skeleton height={157} /> */}
        <img src={PlaceHolderImg2} alt="" />
        <Skeleton height={40} width={100} />
      </div>
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
    </aside>
  );
};

export default SidebarSkeleton;