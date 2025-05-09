import React from "react";
import styles from "../../pages/contact/Contacto.module.css";

function ContactPressRoom() {
  return (
    <article className={styles.pressRoomSection}>
      <h2 className={styles.pressRoomTitle}>Sala de prensa</h2>
      <div className={styles.pressRoomInfo}>
        <div className={styles.pressPhoneRow}>
          <div className={styles.pressPhoneLabel}>Teléfono:</div>
          <div className={styles.pressPhoneNumber}>+1 786 123 456 789</div>
        </div>
        <div className={styles.pressEmailRow}>
          <div className={styles.pressEmailLabel}>Correo electrónico:</div>
          <div className={styles.pressEmailAddress}>ejemplo@gmail.com</div>
        </div>
        <div className={styles.pressEmailRow}>
          <div className={styles.pressEmailLabel}>Responsable:</div>
          <div className={styles.pressEmailAddress}>Pablo García</div>
        </div>
      </div>
    </article>
  );
}

export default ContactPressRoom;
