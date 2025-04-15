import React from "react";
import styles from "./SecurityContent.module.css";

const SecurityContent = () => {
  return (
    <main className={styles.securityContent}>
      <h1 className={styles.title}>Seguridad</h1>
      <p className={styles.description}>
        Cambia tus ajustes de seguridad o elimina tu cuenta
      </p>
      <hr className={styles.divider} />

      <section className={styles.securitySection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Contraseña</h2>
          <p className={styles.sectionDescription}>
            Restaura tu contraseña para mantener la seguridad de tu cuenta
          </p>
        </div>
        <button className={styles.actionButton}>Editar</button>
      </section>
      <hr className={styles.divider} />

      <section className={styles.securitySection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Autentificación en dos pasos</h2>
          <p className={styles.sectionDescription}>
            Aumenta la seguridad de tu cuenta configurando la autentificación en
            dos pasos
          </p>
        </div>
        <button className={styles.actionButton}>Configurar</button>
      </section>
      <hr className={styles.divider} />

      <section className={styles.securitySection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Sesiones activas</h2>
          <p className={styles.sectionDescription}>
            Seleccionando 'Cerrar sesión' cerrarás las sesiones de todos los
            dispositivos excepto este. Esto puede tardar hasta 10 minutos.
          </p>
        </div>
        <button className={styles.actionButton}>Cerrar sesión</button>
      </section>
      <hr className={styles.divider} />

      <section className={styles.securitySection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Eliminar cuenta</h2>
          <p className={styles.sectionDescription}>
            Elimina de manera permanente tu cuenta en Local secrets
          </p>
        </div>
        <button className={styles.actionButton}>Eliminar</button>
      </section>
      <hr className={styles.divider} />
    </main>
  );
};

export default SecurityContent;
