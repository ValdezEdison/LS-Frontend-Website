import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const AboutContent = ({ title, description }) => {
  return (
    <article className={styles.aboutContentContainer}>
      <h1 className={styles.aboutTitle}>{title}</h1>
      <p className={styles.aboutDescription}>
        {description.split('\r\n\r\n').map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}
            <br /><br />
          </React.Fragment>
        ))}
      </p>
    </article>
  );
};

export default AboutContent;