import React from "react";
import styles from "../../pages/contact/Contacto.module.css";

function ContactOffice({
  title,
  phone,
  email,
  address,
  imageSrc,
  containerClass,
}) {
  return (
    <article className={containerClass}>
      <div className={styles.officeInfo}>
        <h2 className={styles.officeTitle}>{title}</h2>
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
            <div className={styles.pressEmailLabel}>Dirección:</div>
            <div className={styles.pressEmailAddress}>{address}</div>
          </div>
        </div>
      </div>
      <img
        src={imageSrc}
        alt={`${title} office`}
        className={styles.officeImage}
      />
    </article>
  );
}

export default ContactOffice;