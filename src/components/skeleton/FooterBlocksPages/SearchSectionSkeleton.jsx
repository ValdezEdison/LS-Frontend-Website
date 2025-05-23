import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SearchSectionSkeleton = () => {
  return (
    <section className={styles.searchSection}>
      <Skeleton height={300} containerClassName={styles.backgroundImageSkeleton} />
      <Skeleton height={40} width={250} style={{ margin: '20px 0' }} />
      <div className={styles.searchBar}>
        <Skeleton circle width={24} height={24} />
        <Skeleton height={40} width="80%" />
      </div>
    </section>
  );
};

export default SearchSectionSkeleton;