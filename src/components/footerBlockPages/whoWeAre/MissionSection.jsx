import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const MissionSection = ({ mission }) => {
  return (
    <div className={styles.missionContainer}>
      <h2 className={styles.missionTitle}>Nuestra misión</h2>
      <p className={styles.missionDescription}>
        {mission}
      </p>
    </div>
  );
};

export default MissionSection;