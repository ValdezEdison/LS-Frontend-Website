import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";

function ContactCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>
          Si no encuentras la posición que buscas, puedes ponerte en contacto
          con nosotros
        </h2>
        <button className={styles.ctaButton}>Contactar</button>
      </div>
    </section>
  );
}

export default ContactCTA;
