import React from "react";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  return (
    <section className={styles.newsletter}>
      <h2 className={styles.newsletterTitle}>
        ¡Suscríbete a nuestra newsletter!
      </h2>
      <p className={styles.newsletterDescription}>
        Descubre rincones secretos, recibe recomendaciones de viaje exclusivas y
        no te pierdas ningún evento.
      </p>
      <form className={styles.subscribeForm}>
        <input
          type="email"
          placeholder="Tu dirección de email"
          className={styles.emailInput}
          aria-label="Tu dirección de email"
        />
        <button type="submit" className={styles.subscribeButton}>
          SUSCRÍBETE
        </button>
      </form>
      <p className={styles.privacyNote}>
        Al introducir tu dirección de correo, consientes recibir propuestas
        comerciales personalizadas elaboradas automáticamente, incluidas las
        propuestas de lugares y eventos, consulta nuestra{" "}
        <a href="#privacy-policy" className={styles.privacyLink}>
          Política de privacidad
        </a>
        .
      </p>
    </section>
  );
};

export default Newsletter;
