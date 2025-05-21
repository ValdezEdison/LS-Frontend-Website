import React from "react";
import styles from "../../pages/contact/Contacto.module.css";
import { useTranslation } from "react-i18next";

function ContactPressRoom({ title, phone, email, contactPerson }) {

  const { t } = useTranslation("Contact");
  return (
    <article className={styles.pressRoomSection}>
      <h2 className={styles.pressRoomTitle}>{title}</h2>
      <div className={styles.pressRoomInfo}>
        <div className={styles.pressPhoneRow}>
          <div className={styles.pressPhoneLabel}>{t('contact.phone')}:</div>
          <div className={styles.pressPhoneNumber}>{phone}</div>
        </div>
        <div className={styles.pressEmailRow}>
          <div className={styles.pressEmailLabel}>{t('contact.email')}:</div>
          <div className={styles.pressEmailAddress}>{email}</div>
        </div>
        <div className={styles.pressEmailRow}>
          <div className={styles.pressEmailLabel}>{t('contact.responsible')}:</div>
          <div className={styles.pressEmailAddress}>{contactPerson}</div>
        </div>
      </div>
    </article>
  );
}

export default ContactPressRoom;