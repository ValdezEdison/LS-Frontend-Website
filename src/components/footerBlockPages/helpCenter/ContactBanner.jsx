import React from "react";
import styles from "./ContactBanner.module.css";

const ContactBanner = () => {
  return (
    <div className={styles.contactBanner}>
      <div className={styles.contactContent}>
        <div className={styles.contactTitle}>Contacta con nosotros</div>
        <div className={styles.contactDescription}>
          Para más información escribe tu correo o llama al teléfono de
          contacto, te responderemos con la mayor brevedad posible.
        </div>
      </div>
      <div className={styles.contactButtonWrapper}>
        <div className={styles.contactButton}>Contacto</div>
      </div>
    </div>
  );
};

export default ContactBanner;
