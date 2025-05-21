import React from "react";
import styles from "../../pages/contact/Contacto.module.css";
import { useTranslation } from "react-i18next";

function ContactOffice({
  title,
  phone,
  email,
  address,
  imageSrc,
  containerClass,
}) {

  const { t } = useTranslation("Contact");
  return (
    <article className={containerClass}>
      <div className={styles.officeInfo}>
        <h2 className={styles.officeTitle}>{title}</h2>
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
            <div className={styles.pressEmailLabel}>{t('contact.address')}:</div>
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