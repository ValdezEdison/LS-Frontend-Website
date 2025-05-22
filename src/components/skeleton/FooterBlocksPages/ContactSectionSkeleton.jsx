import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ContactSectionSkeleton = () => {
  return (
    <footer className={styles.contactWrapper}>
      <section className={styles.contactSection}>
        <div className="page-center">
          <div className={styles.contactContent}>
            <Skeleton height={40} width={300} />
            <Skeleton count={2} />
          </div>
          <div className={styles.buttonWrapper}>
            <Skeleton height={50} width={200} />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default ContactSectionSkeleton;