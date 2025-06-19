import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const NewsletterBanner = ({ title, buttonText, onButtonClick }) => {
 
  return (
    <section className={styles.newsletterBanner}>
    <div
      className={styles.newsletterContent}
        style={{
          flexDirection: "column",
          alignItems: "stretch",
          width: "877px",
          maxWidth: "100%",
          display: "flex",
          textAlign: "center"
        }}
      >
        <h2 className={styles.newsletterTitle}>
          {title}
        </h2>
        <button onClick={onButtonClick}  className={styles.discoverButton} >{buttonText}</button>
      </div>
    </section>
  );
};

export default NewsletterBanner;
