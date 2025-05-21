"use client";
import React from "react";
import styles from "./TestimonialsSection.module.css";
import TestimonialCard from "./TestimonialCard";
import { useTranslation } from "react-i18next";

function TestimonialsSection() {

  const { t } = useTranslation("LocalSecretManager");
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.sectionTitle}>{t('testimonials.title')}</h2>
      <p className={styles.sectionDescription}>
      {t('testimonials.description')}
      </p>
      <div className={styles.cardsContainer}>
        <div className={styles.cardsWrapper}>
        {[0, 1, 2].map(index => (
            <TestimonialCard
              key={index}
              imageSrc={t(`testimonials.items.${index}.image`)}
              text={t(`testimonials.items.${index}.text`)}
              className={[styles.firstCard, styles.middleCard, styles.lastCard][index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
