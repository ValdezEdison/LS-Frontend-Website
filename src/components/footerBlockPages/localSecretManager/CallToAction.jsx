"use client";
import React from "react";
import styles from "./CallToAction.module.css";

function CallToAction() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          Crea una cuenta o inicia sesión como LS manager
        </h2>
        <p className={styles.ctaDescription}>
          Para más información escribe tu correo o llama al teléfono de
          contacto, te responderemos con la mayor brevedad posible.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.ctaButton}>Regístrate o inicia sesión</button>
      </div>
    </section>
  );
}

export default CallToAction;
