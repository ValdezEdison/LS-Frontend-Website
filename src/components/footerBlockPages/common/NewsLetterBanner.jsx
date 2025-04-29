import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const NewsletterBanner = ({title, buttonText}) => {
  return (
    <section className={styles.newsletterBanner}>
      <div className={styles.newsletterContent}>
        <h2 className={styles.newsletterTitle}>
          {title}
        </h2>
        <button className={styles.discoverButton}>{buttonText}</button>
      </div>
    </section>
  );
};

export default NewsletterBanner;
