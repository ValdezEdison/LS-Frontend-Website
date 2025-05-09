import React from "react";
import styles from "./NotificationForm.module.css";

const NotificationForm = ({ user }) => {
  return (
    <form className={styles.notificationForm}>
      <h1 className={styles.title}>Notificaciones</h1>
      <p className={styles.description}>
        Decide tus notificaciones y date de baja en lo que no desees.
      </p>
      <div className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Preferencias de email</h2>
        <p className={styles.email}>{user.email}</p>
      </div>
      <div className={styles.toggleSection}>
        <div className={styles.toggleLabel}>Promociones y novedades</div>
        <div className={styles.toggleRightWrapper}>
          <label className={styles.switch}>
            <input type="checkbox" disabled />
            <span className={styles.slider}></span>
          </label>
          <span className={`${styles.toggleAction} ${styles.checkedd}`}>Darme de baja</span>
        </div>
      </div>
      <div className={styles.divider} />

      <div className={styles.toggleSection}>
        <div className={styles.toggleLabel}>Recomendar a un amigo</div>
        <div className={styles.toggleRightWrapper}>
          <label className={styles.switch}>
            <input type="checkbox" disabled />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.toggleAction}>Suscribirme</span>
        </div>
      </div>
      <div className={styles.divider} />

      <div className={styles.toggleSection}>
        <div className={styles.toggleLabel}>Descubrimiento semanal</div>
        <div className={styles.toggleRightWrapper}>
          <label className={styles.switch}>
            <input type="checkbox" disabled />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.toggleAction}>Suscribirme</span>
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <button type="submit" className={styles.saveButton} disabled>
          Guardar
        </button>
      </div>
      <div className={styles.divider} />
    </form>
  );
};

export default NotificationForm;