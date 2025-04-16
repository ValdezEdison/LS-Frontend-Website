import React from "react";
import styles from "./PreferencesContent.module.css";

const PreferencesContent = () => {
  return (
    <main className={styles.preferencesContent}>
      <h1 className={styles.title}>Preferencias</h1>
      <p className={styles.description}>
        Cambia tu idioma y haz sugerencias sobre lugares y eventos
      </p>
      <hr className={styles.separator} />

      <div className={styles.preferenceSection}>
        <div className={styles.preferenceHeader}>
          <h2 className={styles.sectionTitle}>Idioma</h2>
          <div className={styles.languageSelection}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/3f466d28741c2d9d319c5b274602a0fa3dc4f8a1?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt="Spanish flag"
              className={styles.flagIcon}
            />
            <span>Español</span>
          </div>
        </div>
        <button className={styles.editButton}>Editar</button>
      </div>

      <hr className={styles.separator} />

      <div className={styles.preferenceSection}>
        <div className={styles.preferenceHeader}>
          <h2 className={styles.sectionTitle}>Sugerencias</h2>
          <span className={styles.sectionDescription}>
            Escribe una sugerencia
          </span>
        </div>
        <button className={styles.editButton}>Editar</button>
      </div>

      <hr className={styles.separator} />
    </main>
  );
};

export default PreferencesContent;
