import React from "react";
import styles from "../../../pages/footerBlockPages/lifeAtLocalSecret/LifeAtLocalSecrets.module.css";
import { Beach, FirstAid, Grapes, Leaf, Verify } from "../../common/Images";
import { useTranslation } from "react-i18next";

function BenefitsSection() {

  const { t } = useTranslation("LifeAtLocalSecrets");

  return (
    <div className={styles.topSection}>
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsContainer}>
          <h2 className={styles.benefitsTitle}>
            {t('benefits.title')}
          </h2>
          <p className={styles.benefitsSubtitle}>
            {t('benefits.subtitle')}
          </p>
          <div className={styles.benefitsList}>
            {[0, 1, 2, 3, 4].map((index) => (
              <article key={index} className={styles.benefitItem}>
                <div className={styles.benefitItemIn}>
                  <img
                    src={[Leaf, FirstAid, Verify, Grapes, Beach][index]}
                    alt={t(`benefits.items.${index}.alt`)}
                    className={styles.benefitIcon}
                  />
                  <h3 className={styles.benefitFlexibility}>
                    {t(`benefits.items.${index}.title`)}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BenefitsSection;
