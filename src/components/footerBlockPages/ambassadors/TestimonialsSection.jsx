import React from "react";
import TestimonialCard from "./TestimonialCard";
import styles from "./TestimonialsSection.module.css";
import { useTranslation } from "react-i18next";

function TestimonialsSection() {

  const { t } = useTranslation("Ambassadors");
  // const testimonials = [
  //   {
  //     id: 1,
  //     avatar:
  //       "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5d7bb9ccd4c28a2b6763735918f97577c2c904a2?placeholderIfAbsent=true",
  //     text: '"Desde el principio me ha parecido super sencillo utilizar Local Secrets. Además me he descargado la app para poder gestionar mi negocio desde cualquier lugar. Increible"',
  //   },
  //   {
  //     id: 2,
  //     avatar:
  //       "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c9b431a587a9df8e73c2f5686acfd4a48f5620d4?placeholderIfAbsent=true",
  //     text: '"Simplemente la mejor web. Lo recomiendo sobre todo para negocios que están empezando y no saben como hacerse ver"',
  //   },
  //   {
  //     id: 3,
  //     avatar:
  //       "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/164e45e55fb8202175efd993a673dfe5ae08c781?placeholderIfAbsent=true",
  //     text: '"Súper atentos. En todo momento han respondido a mis dudas super rápido y mi local ha tenido más visitas desde que estamos en Local Secrets. Muchas gracias"',
  //   },
  // ];


  const testimonials = [0, 1, 2].map(index => ({
    id: index + 1,
    avatar: t(`testimonials.items.${index}.avatar`),
    text: t(`testimonials.items.${index}.text`)
  }));

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('testimonials.title')}</h2>
        <p className={styles.subtitle}>
        {t('testimonials.subtitle')}
        </p>
        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              avatar={testimonial.avatar}
              text={testimonial.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
