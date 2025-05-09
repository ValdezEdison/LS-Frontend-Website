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
        <div className={styles.contactInfoContainer}>
          <div className={styles.contactLabels}>
            <div>Teléfono:</div>
            <div className={styles.emailLabel}>Correo electrónico:</div>
            <div className={styles.addressLabel}>Dirección:</div>
          </div>
          <div className={styles.contactDetails}>
            <div className={styles.contactTextContainer}>
              <div className={styles.phoneNumber}>{phone}</div>
              <div className={styles.emailAddress}>{email}</div>
            </div>
            <address className={styles.physicalAddress}>
              {address.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < address.length - 1 && <br />}
                </React.Fragment>
              ))}
            </address>
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
