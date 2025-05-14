import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const VisionSection = ({ vision }) => {
  return (
    <div className={styles.visionContainer}>
      <h2 className={styles.visionTitle}>Nuestra visión</h2>
      <p className={styles.visionDescription}>
        {vision}
      </p>
    </div>
  );
};

export default VisionSection;