import React from "react";
import styles from "./AppPromotion.module.css";
import { useTranslation } from "react-i18next";

const History = ({
  h1Data,
  imageSrc,
}) => {
  const { t } = useTranslation("History");

  // Safely access the first item in h1Data array or use defaults
  const bannerData = h1Data?.[0] || {};
  
  // Parse the description HTML string to get clean text if needed
  const getDescriptionText = (htmlString) => {
    if (!htmlString) return t("description");
    const temp = document.createElement('div');
    temp.innerHTML = htmlString;
    return temp.textContent || temp.innerText || t("description");
  };

  return (
    <section className={styles.appPromotion}>
      <div className="page-center">
        <div className={styles.promotionContent}>
          <div className={styles.promotionContentInner}>
            {(bannerData.image_url || imageSrc) && (
              <img
                src={bannerData.image_url || imageSrc}
                alt={bannerData.title || t("title")}
                className={styles.promotionImage}
              />
            )}
            <h2 className={styles.promotionTitle}>
              {bannerData.title || t("title")}
            </h2>
            <div 
              className={styles.promotionDescription}
              dangerouslySetInnerHTML={{ 
                __html: bannerData.description || t("description") 
              }}
            />
            {bannerData.cta_text && (
              <a
                href={bannerData.cta_link}
                className={styles.promotionButton}
              >
                {bannerData.cta_text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;