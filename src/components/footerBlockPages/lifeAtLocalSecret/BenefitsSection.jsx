import React from "react";
import styles from "../../../pages/footerBlockPages/lifeAtLocalSecret/LifeAtLocalSecrets.module.css";

function BenefitsSection() {
  return (
    <section className={styles.benefitsSection}>
      <div className={styles.benefitsContainer}>
        <h2 className={styles.benefitsTitle}>
          Beneficios de trabajar en Local Secrets
        </h2>
        <p className={styles.benefitsSubtitle}>
          Tu bienestar y felicidad es nuestra prioridad y nuestros beneficios lo
          respaldan. Es una de las principales razones por las que la gente
          elige trabajar aquí.
        </p>
        <div className={styles.benefitsList}>
          <article className={styles.benefitItem}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/0353d8fd7eef3419d7a287ce00ca0fb78bc01808?placeholderIfAbsent=true"
              alt="Icono de flexibilidad"
              className={styles.benefitIcon}
            />
            <h3 className={styles.benefitFlexibility}>
              Flexibilidad y tiempo libre
            </h3>
          </article>
          <article className={styles.benefitHealth}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/00cbe13a3a3c20a2e1271e0d0b999aafc7b47cfd?placeholderIfAbsent=true"
              alt="Icono de salud"
              className={styles.healthIcon}
            />
            <h3 className={styles.healthTitle}>Salud y bienestar</h3>
          </article>
          <article className={styles.benefitCoverage}>
            Cobertura más allá
          </article>
          <article className={styles.benefitFruit}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/795e18f4ef89bffd5fe1b96a4fe370d41095a845?placeholderIfAbsent=true"
              alt="Icono de fruta"
              className={styles.fruitIcon}
            />
            <h3 className={styles.fruitTitle}>Fruta en la oficina</h3>
          </article>
          <article className={styles.benefitVacation}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/821fd69fd1233090246dccbf1d12351e3bb4a6af?placeholderIfAbsent=true"
              alt="Icono de vacaciones"
              className={styles.vacationIcon}
            />
            <h3 className={styles.vacationTitle}>Comprar vacaciones</h3>
          </article>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
