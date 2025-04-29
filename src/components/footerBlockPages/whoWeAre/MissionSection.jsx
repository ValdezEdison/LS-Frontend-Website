import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const MissionSection = () => {
  return (
    <div className={styles.missionContainer}>
      <h2 className={styles.missionTitle}>Nuestra misión</h2>
      <p className={styles.missionDescription}>
        Preservar y ofrecer de forma clara y atractiva los mejores lugares y
        eventos de un destino, garantizando calidad y acceso a una verdadera
        inmersión local para el viajero.
      </p>
    </div>
  );
};

export default MissionSection;
