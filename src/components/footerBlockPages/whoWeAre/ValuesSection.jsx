import React from "react";
import styles from "../../../pages/whoWrAre/WhoWeAre.module.css";
import { People } from "../../common/Images";

const ValuesSection = () => {
  return (
    <>
      <h2 className={styles.valuesTitle}>Nuestros valores</h2>
      <div className={styles.valuesContainer}>
        <div className={styles.valueItem}>
          <div className={styles.valueIcon}>
            <img src={People}/>
          </div>
          <div className={styles.valueText}>Intercultural</div>
          </div>
        <div className={styles.valueItem}>
          <div className={`${styles.valueIcon} ${styles.grey}`} />
          <div className={styles.valueText}>Valor 2</div>
        </div>
        <div className={styles.valueItem}>
          <div className={`${styles.valueIcon} ${styles.grey}`} />
          <div className={styles.valueText}>Valor 3</div>
        </div>
      </div>
    </>
  );
};

export default ValuesSection;
