import React from "react";
import styles from "./NotificationForm.module.css";

const NotificationForm = () => {
  return (
    <form className={styles.notificationForm}>
      <h1 className={styles.title}>Notificaciones</h1>
      <p className={styles.description}>
        Decide tus notificaciones y date de baja en lo que no desees.
      </p>
      <div className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Preferencias de email</h2>
        <p className={styles.email}>pablop@gmail.com</p>
      </div>
      <div className={styles.divider} />

      <div className={styles.toggleSection}>
        <div className={styles.toggleLabel}>Promociones y novedades</div>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.toggleAction}>Darme de baja</span>
      </div>
      <div className={styles.divider} />

      <div className={styles.toggleSection}>
        <div className={styles.toggleLabel}>Recomendar a un amigo</div>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.toggleAction}>Suscribirme</span>
      </div>
      <div className={styles.divider} />

      <div className={styles.toggleSection}>
        <div className={styles.toggleLabel}>Descubrimiento semanal</div>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.toggleAction}>Suscribirme</span>
      </div>

      <button type="submit" className={styles.saveButton}>
        Guardar
      </button>
    </form>
  );
};

export default NotificationForm;
