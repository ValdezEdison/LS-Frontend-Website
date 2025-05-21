"use client";
import React from "react";
import styles from "./ThreeStepsSection.module.css";
import { useTranslation } from "react-i18next";

function ThreeStepsSection() {

  const { t } = useTranslation("LocalSecretManager");

  return (
    <section className={styles.stepsSection}>
      <div className={styles.iconsContainer}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconBox}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/78a9d86ed056133b8ec86e645a85b9bc2e9f67cf?placeholderIfAbsent=true"
              alt="Step 1 Icon"
              className={styles.stepIcon}
            />
            <div className={styles.verticalLine} />
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/04d4996a9e15f0f57336988426049cf187a6c153?placeholderIfAbsent=true"
            alt="Arrow"
            className={styles.arrowIcon}
          />
          <div className={styles.iconBox}>
            <div className={styles.verticalLine} />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/98d65d63a5ca7536b4f312423addf266f11314be?placeholderIfAbsent=true"
              alt="Step 3 Icon"
              className={styles.stepIcon}
            />
          </div>
        </div>
      </div>
      <div className={styles.stepsContent}>
        <h2 className={styles.mainTitle}>{t('steps.mainTitle')}</h2>
        <div className={styles.stepsContainer}>
          <div className={styles.stepsWrapper}>
            <div className={styles.stepBlock}>
              <h3 className={styles.stepTitle}>{t('steps.step1.title')}</h3>
              <h4 className={styles.stepSubtitle}>
              {t('steps.step1.subtitle')}
              </h4>
              <p className={styles.stepDescription}>
              {t('steps.step1.description')}
              </p>
            </div>
            <div className={styles.stepBlock}>
              <h3 className={styles.stepTitle}>{t('steps.step2.title')}</h3>
              <h4 className={styles.stepSubtitle}>{t('steps.step2.subtitle')}</h4>
              <p className={styles.stepDescription}>
              {t('steps.step2.description')}
              </p>
            </div>
          </div>
          <div className={styles.stepBlock}>
            <h3 className={styles.stepTitle}>{t('steps.step3.title')}</h3>
            <h4 className={styles.stepSubtitle}>
            {t('steps.step3.subtitle')}
            </h4>
            <p className={styles.stepDescription}>
            {t('steps.step3.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreeStepsSection;
