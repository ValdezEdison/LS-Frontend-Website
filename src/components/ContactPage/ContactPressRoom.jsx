import React from "react";
import styles from "../../pages/contact/Contacto.module.css";

function ContactPressRoom({ title, phone, email, contactPerson }) {
  return (
    <article className={styles.pressRoomSection}>
      <h2 className={styles.pressRoomTitle}>{title}</h2>
      <div className={styles.pressRoomInfo}>
        <div className={styles.pressPhoneRow}>
          <div className={styles.pressPhoneLabel}>Teléfono:</div>
          <div className={styles.pressPhoneNumber}>{phone}</div>
        </div>
        <div className={styles.pressEmailRow}>
          <div className={styles.pressEmailLabel}>Correo electrónico:</div>
          <div className={styles.pressEmailAddress}>{email}</div>
        </div>
        <div className={styles.pressEmailRow}>
          <div className={styles.pressEmailLabel}>Responsable:</div>
          <div className={styles.pressEmailAddress}>{contactPerson}</div>
        </div>
      </div>
    </article>
  );
}

export default ContactPressRoom;