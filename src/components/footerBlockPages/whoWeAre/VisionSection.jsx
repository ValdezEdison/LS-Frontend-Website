import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const VisionSection = () => {
  return (
    <div className={styles.visionContainer}>
      <h2 className={styles.visionTitle}>Nuestra visión</h2>
      <p className={styles.visionDescription}>
        Convertirnos en la herramienta de referencia para planificar cualquier
        viaje, ya sea en grupo, familiar o de negocios.
      </p>
    </div>
  );
};

export default VisionSection;
