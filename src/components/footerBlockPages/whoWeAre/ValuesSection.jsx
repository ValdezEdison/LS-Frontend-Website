import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";

const ValuesSection = () => {
  return (
    <>
      <h2 className={styles.valuesTitle}>Nuestros valores</h2>
      <div className={styles.valuesContainer}>
        <div className={styles.valueItem}>Intercultural</div>
        <div className={styles.valueItem}>
          <div className={styles.valueIcon} />
          <div className={styles.valueText}>Valor 2</div>
        </div>
        <div className={styles.valueItem}>
          <div className={styles.valueIcon} />
          <div className={styles.valueText}>Valor 3</div>
        </div>
      </div>
    </>
  );
};

export default ValuesSection;
