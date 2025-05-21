import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";
import { useTranslation } from "react-i18next";

const VisionSection = ({ vision }) => {

  const { t } = useTranslation("WhoWeAre");

  return (
    <div className={styles.visionContainer}>
      <h2 className={styles.visionTitle}>{t('vision.title')}</h2>
      <p className={styles.visionDescription}>
        {vision}
      </p>
    </div>
  );
};

export default VisionSection;