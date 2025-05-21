import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";
import { useTranslation } from "react-i18next";

function Testimonials() {

  const { t } = useTranslation("WorkWithUs");

  const testimonials = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5d7bb9ccd4c28a2b6763735918f97577c2c904a2?placeholderIfAbsent=true",
      imageClass: styles.testimonialAvatar,
      text: t('testimonials.quotes.0'),
      textClass: styles.testimonialText,
      columnClass: styles.testimonialColumn,
      bgClass: styles.testimonialCard,
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c9b431a587a9df8e73c2f5686acfd4a48f5620d4?placeholderIfAbsent=true",
      imageClass: styles.testimonialAvatar,
      text: t('testimonials.quotes.1'),
      textClass: styles.testimonialText,
      columnClass: styles.testimonialColumn,
      bgClass: styles.testimonialCard,
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/164e45e55fb8202175efd993a673dfe5ae08c781?placeholderIfAbsent=true",
      imageClass: styles.testimonialAvatar,
      text: t('testimonials.quotes.2'),
      textClass: styles.testimonialText,
      columnClass: styles.testimonialColumn,
      bgClass: styles.testimonialCard,
    },
  ];

  return (
    <section className={styles.testimonialSection}>
      <h2 className={styles.testimonialSectionTitle}>
      {t('testimonials.title')}
      </h2>
      <p className={styles.testimonialSectionDescription}>
      {t('testimonials.description')}
      </p>
      <div className={styles.testimonialContainer}>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={
                styles[`testimonialColumn${index + 1}`] ||
                testimonial.columnClass
              }
            >
              <article
                className={
                  styles[`testimonialCard${index + 1}`] || testimonial.bgClass
                }
              >
                <img
                  src={testimonial.image}
                  alt={t('testimonials.avatarAlt')}
                  className={
                    styles[`testimonialAvatar${index + 1}`] ||
                    testimonial.imageClass
                  }
                />
                <div
                  className={
                    styles[`testimonialText${index + 1}`] ||
                    testimonial.textClass
                  }
                >
                  {testimonial.text}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
