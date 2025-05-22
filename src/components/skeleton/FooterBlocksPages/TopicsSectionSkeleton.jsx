import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TopicsSectionSkeleton = () => {
  return (
    <section className={styles.topicsSection}>
      <div className={styles.topicsHeader}>
        <div className={styles.leftDivider} />
        <Skeleton width={200} height={30} />
        <div className={styles.rightDivider} />
      </div>
      <div className={styles.topicsGrid}>
        <div className={styles.topicsCardContainer}>
          {[...Array(8)].map((_, index) => (
            <div key={index} className={styles.topicCardSkeleton}>
              <Skeleton circle width={60} height={60} />
              <Skeleton width={80} height={20} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSectionSkeleton;