import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";
import { useTranslation } from "react-i18next";

function CompanyStats() {

  const { t } = useTranslation("WorkWithUs");
  const stats = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/06ae8f17fc1d700a099574b4f386c2ef078b9fcf?placeholderIfAbsent=true",
      imageClass: styles.statIcon,
      text: t('companyStats.users'),
      textClass: styles.statText,
      columnClass: styles.statColumn,
      divClass: styles.statContainer,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/010d201cd4ac62a9fea33111b88cbc0dfd323322?placeholderIfAbsent=true",
      imageClass: styles.statIcon,
      text:  t('companyStats.reviews'),
      textClass: styles.statText,
      columnClass: styles.statColumn,
      divClass: styles.statContainer,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/ffdd666f1c602859e45526bc96800fdaebcf2fb6?placeholderIfAbsent=true",
      imageClass: styles.statIcon,
      text: t('companyStats.countries'),
      textClass: styles.statText,
      columnClass: styles.statColumn,
      divClass: styles.statContainer,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/d7dee23ecf290fb521434ed8ddb2c73ed51d7f8b?placeholderIfAbsent=true",
      imageClass: styles.statIcon,
      text: t('companyStats.businesses'),
      textClass: styles.statText,
      columnClass: styles.statColumn,
      divClass: styles.statContainer,
    },
  ];

  return (
    <section className={styles.statsSection}>
      <div className="page-center">
      <div className={styles.statsSectionContent}>
        <h2 className={styles.statsSectionTitle}>{t('companyStats.title')}</h2>
        <p className={styles.statsSectionDescription}>
        {t('companyStats.description')}
        </p>
        <div className={styles.statsWrapper}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={styles[`statColumn${index + 1}`] || stat.columnClass}
              >
                <div
                  className={
                    styles[`statContainer${index + 1}`] || stat.divClass
                  }
                >
                  <img
                    src={stat.image}
                    alt={stat.text}
                    className={
                      styles[`statIcon${index + 1}`] || stat.imageClass
                    }
                  />
                  <p
                    className={styles[`statText${index + 1}`] || stat.textClass}
                  >
                    {stat.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      
    </section>
  );
}

export default CompanyStats;
