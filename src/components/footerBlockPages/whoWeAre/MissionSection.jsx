import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";
import { useTranslation } from "react-i18next";

const MissionSection = ({ mission }) => {

  const { t } = useTranslation("WhoWeAre");

  return (
    <div className={styles.missionContainer}>
      <h2 className={styles.missionTitle}>{t('mission.title')}</h2>
      <p className={styles.missionDescription}>
        {mission}
      </p>
    </div>
  );
};

export default MissionSection;