import React from "react";
import styles from "../../pages/Blog/BlogPage.module.css";

function Newsletter() {
  return (
    <section className={styles.newsletterSection}>
      <div className={styles.newsletterContainer}>
        <div className={styles.newsletterBanner}>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>
              ¡Suscríbete a nuestra newsletter!
            </h2>
            <p className={styles.newsletterDescription}>
              Descubre rincones secretos, recibe recomendaciones de viaje
              exclusivas y no te pierdas ningún evento.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Tu dirección de email"
                className={styles.emailInput}
              />
              <button type="submit" className={styles.subscribeButton}>
                SUSCRÍBETE
              </button>
            </form>
            <p className={styles.privacyText}>
              Al introducir tu dirección de correo, consientes recibir
              propuestas comerciales personalizadas elaboradas automáticamente,
              incluidas las propuestas de lugares y eventos, consulta nuestra{" "}
              <a href="#" className={styles.privacyLink}>
                Política de privacidad.
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
