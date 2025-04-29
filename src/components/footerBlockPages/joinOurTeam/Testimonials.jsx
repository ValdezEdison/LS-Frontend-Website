import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";

function Testimonials() {
  const testimonials = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5d7bb9ccd4c28a2b6763735918f97577c2c904a2?placeholderIfAbsent=true",
      imageClass: styles.testimonialAvatar,
      text: '"Desde el principio me ha parecido super sencillo utilizar Local Secrets. Además me he descargado la app para poder gestionar mi negocio desde cualquier lugar. Increible"',
      textClass: styles.testimonialText,
      columnClass: styles.testimonialColumn,
      bgClass: styles.testimonialCard,
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c9b431a587a9df8e73c2f5686acfd4a48f5620d4?placeholderIfAbsent=true",
      imageClass: styles.testimonialAvatar,
      text: '"Simplemente la mejor web. Lo recomiendo sobre todo para negocios que están empezando y no saben como hacerse ver"',
      textClass: styles.testimonialText,
      columnClass: styles.testimonialColumn,
      bgClass: styles.testimonialCard,
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/164e45e55fb8202175efd993a673dfe5ae08c781?placeholderIfAbsent=true",
      imageClass: styles.testimonialAvatar,
      text: '"Súper atentos. En todo momento han respondido a mis dudas super rápido y mi local ha tenido más visitas desde que estamos en Local Secrets. Muchas gracias"',
      textClass: styles.testimonialText,
      columnClass: styles.testimonialColumn,
      bgClass: styles.testimonialCard,
    },
  ];

  return (
    <section className={styles.testimonialSection}>
      <h2 className={styles.testimonialSectionTitle}>
        ¿Qué dicen los empleados de nosotros?
      </h2>
      <p className={styles.testimonialSectionDescription}>
        Echa un vistazo lo que dicen nuestros trabajadores sobre el portal de
        Local Secrets. Nuestro objetivo es brindar la máxima calidad para todos
        los públicos.
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
                  alt="Employee portrait"
                  className={
                    styles[`testimonialAvatar${index + 1}`] ||
                    testimonial.imageClass
                  }
                />
                <blockquote
                  className={
                    styles[`testimonialText${index + 1}`] ||
                    testimonial.textClass
                  }
                >
                  {testimonial.text}
                </blockquote>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
