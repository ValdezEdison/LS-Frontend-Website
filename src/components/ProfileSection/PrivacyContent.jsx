import React from "react";
import styles from "./PrivacySettings.module.css";

const PrivacyContent = () => {
  return (
    <section className={styles.mainSection}>
      <div className={styles.privacyContent}>
        <h1 className={styles.sectionTitle}>Privacidad</h1>
        <p className={styles.sectionDescription}>
          Gestiona tu configuración de privacidad y datos utilizados por
          terceros.
        </p>
        <hr className={styles.separator} />
        <div className={styles.privacySettings}>
          <div className={styles.settingsGroup}>
            <h2 className={styles.settingsTitle}>Ajustes de privacidad</h2>
            <div className={styles.settingsDetails}>
              <p className={styles.userEmail}>pablop@gmail.com</p>
              <p className={styles.settingsDescription}>
                Selecciona 'Gestionar' para cambiar los ajustes de privacidad y
                datos utilizados por terceros.
              </p>
            </div>
          </div>
          <button className={styles.manageButton}>Gestionar</button>
        </div>
        <hr className={styles.separator} />
      </div>
    </section>
  );
};

export default PrivacyContent;
