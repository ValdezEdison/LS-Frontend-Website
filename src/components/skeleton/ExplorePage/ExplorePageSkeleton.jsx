import React from "react";
import styles from "../../../pages/ExplorePage/ExplorePage.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DestinationCardSkeleton from "../common/DestinationCardSkeleton"
import destinationGridStyles from "../../../components/exoplore/DestinationGrid.module.css";

const ExplorePageSkeleton = () => {
    return (
        <main className="page-center">
            <h1 className={styles.pageTitle}>
                <Skeleton width={'30%'} />
            </h1>

            {/* SearchBar Skeleton */}
            <div className={styles.searchBarSkeleton}>
                <Skeleton height={40} width={"50%"} />
            </div>

            <h2 className={styles.sectionTitle}>
                <Skeleton width={180} />
            </h2>
            <p className={styles.sectionSubtitle}>
                <Skeleton width={120} />
            </p>

            {/* Continent Navigation Skeleton */}
            <nav className={styles.continentNav}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        width={80}
                        height={36}
                        style={{ marginRight: '16px' }}
                    />
                ))}
            </nav>
            {/* <hr className={styles.sectionDivider} /> */}
            <div className={destinationGridStyles.destinationGrid}>
                {/* Destination Grid Skeleton */}
                {Array.from({ length: 12 }).map((_, index) => (
                    <DestinationCardSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
            {/* Show More Button Skeleton */}
            {/* <div className={styles.showMoreButton}>
        <Skeleton width={100} height={36} />
      </div> */}
        </main>
    );
};

export default ExplorePageSkeleton;