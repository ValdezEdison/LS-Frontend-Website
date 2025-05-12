import React from "react";
import styles from "./SeeMoreButton.module.css";
import { useTranslation } from "react-i18next";

const SeeMoreButton = ({ onClick, loading, next, translate }) => {

  const { t } =  useTranslation("Common")
  return (
    <div className={styles.seeMoreContainer}>
      {next && (
        <button
          className={styles.showMoreButton}
          onClick={onClick}
          disabled={loading}
        >
          {loading ? translate('loading') : t("showMore")}
        </button>
      )}
    </div>
  );
};

export default SeeMoreButton;