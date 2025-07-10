import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";
import { useTranslation } from "react-i18next";

function Testimonials() {

  const { t } = useTranslation("WorkWithUs");

  const testimonials = [
    {
      image: "https://businesses.nyc3.digitaloceanspaces.com/media/images/javialvarez.max-165x165.jpg",
      imageClass: styles.testimonialAvatar,
      text: t('testimonials.quotes.0'),
      textClass: styles.testimonialText,
      columnClass: styles.testimonialColumn,
      bgClass: styles.testimonialCard,
    },
    {
      image: "https://businesses.nyc3.digitaloceanspaces.com/media/images/carlosfreire.max-165x165.jpg",
      imageClass: styles.testimonialAvatar,
      text: t('testimonials.quotes.1'),
      textClass: styles.testimonialText,
      columnClass: styles.testimonialColumn,
      bgClass: styles.testimonialCard,
    },
    {
      image: "https://businesses.nyc3.digitaloceanspaces.com/media/images/Foto_-_Gia_Orellana.max-165x165.png",
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
