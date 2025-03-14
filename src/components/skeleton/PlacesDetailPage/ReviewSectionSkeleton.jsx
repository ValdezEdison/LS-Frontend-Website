import React from "react";
import styles from "../../PlacesDetailPage/ReviewSection.module.css";
import Skeleton from "react-loading-skeleton";

const ReviewSectionSkeleton = () => {
  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewHeader}>
        <div>
          <h2 className={styles.reviewTitle}>
            <Skeleton width={200} /> {/* Placeholder for the title */}
          </h2>
          <div className={styles.ratingBlock}>
            <Skeleton width={30} /> {/* Placeholder for the rating score */}
            <Skeleton width={100} /> {/* Placeholder for the stars */}
            <Skeleton width={80} /> {/* Placeholder for the review count */}
          </div>
        </div>
        <Skeleton height={40} width={150} /> {/* Placeholder for the "Add Review" button */}
      </div>
      <div className={styles.tagContainer}>
        <Skeleton width={80} /> {/* Placeholder for the tag */}
      </div>
      <div className={styles.reviewList}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <Skeleton circle width={40} height={40} /> {/* Placeholder for the avatar */}
              <div>
                <Skeleton width={100} /> {/* Placeholder for the reviewer name */}
                <Skeleton width={80} /> {/* Placeholder for the review date */}
              </div>
            </div>
            <Skeleton count={3} /> {/* Placeholder for the review content */}
          </div>
        ))}
      </div>
      <Skeleton height={40} width={150} /> {/* Placeholder for the "View All" button */}
    </section>
  );
};

export default ReviewSectionSkeleton;