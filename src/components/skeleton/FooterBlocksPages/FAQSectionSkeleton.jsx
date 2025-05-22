import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FAQSectionSkeleton = () => {
  return (
    <section className={styles.faqSection}>
      <div className={styles.sectionDivider} />
      <div className={styles.faqContainer}>
        <Skeleton height={40} width={200} />
        <div className={styles.faqList}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className={styles.faqItemSkeleton}>
              <Skeleton height={30} width="80%" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSectionSkeleton;