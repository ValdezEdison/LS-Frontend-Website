import React from "react";
import styles from "../../../pages/footerBlockPages/lifeAtLocalSecret/LifeAtLocalSecrets.module.css";
import { useTranslation } from "react-i18next";

function HeroSection() {

  const { t } = useTranslation("LifeAtLocalSecrets");

  return (
    <section className={styles.heroSection}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/2124061c05427ac118e09826cc3aa33e8ad3bba5?placeholderIfAbsent=true"
        alt={t('hero.altText')}
        className={styles.heroImage}
      />
      <p className={styles.heroDescription}>
      {t('hero.description')}
      </p>
    </section>
  );
}

export default HeroSection;
