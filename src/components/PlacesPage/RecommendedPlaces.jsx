import React from "react";
import styles from "./MainContent.module.css";
import { useTranslation } from "react-i18next";

const RecommendedPlaces = () => {

  const { t } = useTranslation("Places");

  return (
    <div className={styles.recommendedPlaces}>
      <h2 className={styles.recommendedTitle}>
      {t("recommendedPlaces.title")}
      </h2>
      <div className={styles.recommendedList}>
        <div className={styles.recommendedItem}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5938d0b4d4193a56f68ffb5518fec1a8326c7bcd870b04aeb66449ed43927fb9?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Washington monument"
            className={styles.recommendedImage}
          />
          <p className={styles.recommendedName}>Washington monument</p>
        </div>
        <div className={styles.recommendedItem}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1aec48f7f81b79e406dbb0201fa9f9891f7e9d5f9980b3ea4dc28f2d8976d585?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Mercado central"
            className={styles.recommendedImage}
          />
          <p className={styles.recommendedName}>Mercado central</p>
        </div>
        <div className={styles.recommendedItem}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/feec33879aaca35113c8b86af0b809d0797b174ce644681dde9705fd23762df1?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="La sagrada familia"
            className={styles.recommendedImage}
          />
          <p className={styles.recommendedName}>La sagrada familia</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPlaces;