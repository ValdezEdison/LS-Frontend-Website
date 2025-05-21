import React from "react";
import styles from "../../../pages/footerBlockPages/lifeAtLocalSecret/LifeAtLocalSecrets.module.css";
import { Beach, FirstAid, Grapes, Leaf, Verify } from "../../common/Images";

function BenefitsSection() {
  return (
    <div className={styles.topSection}>
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
            <div className={styles.benefitItemIn}>
              <img
              src={Leaf}
              alt="Icono de flexibilidad"
              className={styles.benefitIcon}
              />
              <h3 className={styles.benefitFlexibility}>
              Flexibilidad y tiempo libre
              </h3>
            </div>
          </article>
         <article className={styles.benefitItem}>
            <div className={styles.benefitItemIn}>
              <img
              src={FirstAid}
              alt="Icono de flexibilidad"
              className={styles.benefitIcon}
              />
              <h3 className={styles.benefitFlexibility}>
              Salud y bienestar
              </h3>
            </div>
          </article>
         <article className={styles.benefitItem}>
            <div className={styles.benefitItemIn}>
              <img
              src={Verify}
              className={styles.benefitIcon}
              />
              <h3 className={styles.benefitFlexibility}>
             Cobertura más allá
              </h3>
            </div>
          </article>
          <article className={styles.benefitItem}>
            <div className={styles.benefitItemIn}>
              <img
              src={Grapes}
              className={styles.benefitIcon}
              />
              <h3 className={styles.benefitFlexibility}>
             Fruta en la oficina
              </h3>
            </div>
          </article>
          <article className={styles.benefitItem}>
            <div className={styles.benefitItemIn}>
              <img
              src={Beach}
              className={styles.benefitIcon}
              />
              <h3 className={styles.benefitFlexibility}>
              Comprar vacaciones
              </h3>
            </div>
          </article>
        </div>
      </div>
    </section>
    </div>
   
  );
}

export default BenefitsSection;
