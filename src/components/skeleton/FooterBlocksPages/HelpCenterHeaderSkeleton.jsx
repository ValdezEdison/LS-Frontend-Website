import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HelpCenterHeaderSkeleton = () => {
  return (
    <header className={styles.headerSection}>
      <Skeleton height={60} width={300} />
    </header>
  );
};

export default HelpCenterHeaderSkeleton;