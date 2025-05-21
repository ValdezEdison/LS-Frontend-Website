"use client";
import React from "react";
import styles from "./InfoSection.module.css";

function InfoSection() {
  return (
    <div className="page-center">
      <section className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>
          ¿Qué significa ser local secret manager?
        </h2>
        <p className={styles.sectionDescription}>
          Local Secret Manager es el propietario de un anuncio en Local Secrets.
          Puede crear y gestionar los anuncios de su local secret o evento desde
          la plataforma web o la aplicación movil, a través de los cuales podrá
          aumentar la visibilidad de su establecimiento y conocer las opiniones de
          los clientes.
        </p>
      </section>
    </div>
    
  );
}

export default InfoSection;
