import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const AboutContentSkeleton = () => {
  return (
    <article className={styles.aboutContentContainer}>
      <h1 className={styles.aboutTitle}><Skeleton width={200} /></h1>
      {[...Array(5)].map((_, i) => (
        <p key={i} className={styles.aboutDescription}>
          <Skeleton width={i % 2 === 0 ? '100%' : '90%'} />
        </p>
      ))}
    </article>
  );
};

export default AboutContentSkeleton;