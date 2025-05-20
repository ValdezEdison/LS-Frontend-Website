"use client";
import React from "react";
import styles from "./TestimonialsSection.module.css";
import TestimonialCard from "./TestimonialCard";

function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.sectionTitle}>Qué opinan nuestros viajeros</h2>
      <p className={styles.sectionDescription}>
        Echa un vistazo lo que dicen nuestros trabajadores sobre el portal de
        Local Secrets. Nuestro objetivo es brindar la máxima calidad para todos
        los públicos.
      </p>
      <div className={styles.cardsContainer}>
        <div className={styles.cardsWrapper}>
          <TestimonialCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5d7bb9ccd4c28a2b6763735918f97577c2c904a2?placeholderIfAbsent=true"
            text={`"Desde el principio me ha parecido super sencillo utilizar Local Secrets. Además me he descargado la app para poder gestionar mi negocio desde cualquier lugar. Increible"`}
            className={styles.firstCard}
          />
          <TestimonialCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c9b431a587a9df8e73c2f5686acfd4a48f5620d4?placeholderIfAbsent=true"
            text={`"Simplemente la mejor web. Lo recomiendo sobre todo para negocios que están empezando y no saben como hacerse ver"`}
            className={styles.middleCard}
          />
          <TestimonialCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/164e45e55fb8202175efd993a673dfe5ae08c781?placeholderIfAbsent=true"
            text={`"Súper atentos. En todo momento han respondido a mis dudas super rápido y mi local ha tenido más visitas desde que estamos en Local Secrets. Muchas gracias"`}
            className={styles.lastCard}
          />
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
