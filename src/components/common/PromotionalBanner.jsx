import React from "react";
// import styles from "./MainContent.module.css";

const PromotionalBanner = ({styles}) => {
  return (
    <div className={styles.promotionalBanner}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/74655b165160f8fd87012996cecf80d0d77ec4b9281b0c6c6de60b2eddc87f92?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
        alt="Discover Japan"
        className={styles.promotionalImage}
      />
      <div className={styles.promotionalContent}>
        <h2 className={styles.promotionalTitle}>Descubre Japón</h2>
        <p className={styles.promotionalText}>
          Explora la magia de Japón y déjate cautivar por su historia, su vida
          urbana y sus paisajes naturales. Desde la majestuosidad del Monte
          Fuji hasta la serenidad de los jardines zen, cada rincón de Japón te
          espera con una experiencia única
        </p>
        <button className={styles.exploreButton}>Explorar</button>
      </div>
    </div>
  );
};

export default PromotionalBanner;