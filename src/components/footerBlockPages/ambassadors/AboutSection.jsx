import React from "react";
import styles from "./AboutSection.module.css";
import { useTranslation } from "react-i18next";

function AboutSection() {

  const { t } = useTranslation("Ambassadors");
  return (
    <section className={styles.aboutSection}>
      <article className={styles.content}>
        {[0, 1, 2, 3].map((index) => (
          <p key={index}>{t(`about.paragraphs.${index}`)}</p>
        ))}
      </article>
    </section>
  );
 
}

export default AboutSection;

