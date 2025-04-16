import React from "react";
import styles from "./AppPromotion.module.css";
import { useTranslation } from "react-i18next";

const History = ({
  title,
  description,
  buttonText,
  imageSrc,
}) => {

  const { t } = useTranslation("History");

  return (
    <section className={styles.appPromotion}>
      <div className="page-center">
      <div className={styles.promotionContent}>
        <div className={styles.promotionContentInner}>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={t("title")}
              className={styles.promotionImage}
            />
          )}
          <h2 className={styles.promotionTitle}>{t("title")}</h2>
          <p className={styles.promotionDescription}>{t("description")}</p>
          {buttonText && (
            <button className={styles.promotionButton}>{t("buttonText")}</button>
          )}
        </div>
       
      </div>
      </div>
    </section>
  );
};

export default History;
