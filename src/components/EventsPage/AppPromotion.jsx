import React from "react";
import styles from "./AppPromotion.module.css";

const AppPromotion = () => {
  return (
    <section className={styles.appPromotion}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1d81e791b0153be7fb9d18243c08ce224405fe3a?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
        alt="Discover Japan"
        className={styles.promotionImage}
      />
      <div className={styles.promotionContent}>
        <h2 className={styles.promotionTitle}>Descubre Japón</h2>
        <p className={styles.promotionDescription}>
          Explora la magia de Japón y déjate cautivar por su historia, su vida
          urbana y sus paisajes naturales. Desde la majestuosidad del Monte Fuji
          hasta la serenidad de los jardines zen, cada rincón de Japón te espera
          con una experiencia única
        </p>
        <button className={styles.exploreButton}>Explorar</button>
      </div>
      <div className={styles.pagination}>
        <span className={styles.paginationDot + " " + styles.active}></span>
        <span className={styles.paginationDot}></span>
        <span className={styles.paginationDot}></span>
      </div>
    </section>
  );
};

export default AppPromotion;
