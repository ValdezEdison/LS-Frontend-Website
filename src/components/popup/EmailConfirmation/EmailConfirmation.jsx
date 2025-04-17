import React from "react";
import styles from "./EmailConfirmation.module.css";
import Logo from "./Logo";
import UserIcon from "./UserIcon";
import CloseButton from "./CloseButton";
import ConfirmationImage from "./ConfirmationImage";
import { useTranslation } from "react-i18next";

function EmailConfirmation({ email, onClose, onResend }) {

  const { t } = useTranslation('Registration');
  return (
    <div className={styles.modalInner}>
      <div className={styles.confirmationContent}>
        <div className={styles.confirmationBox}>
          <ConfirmationImage />
          <div className={styles.textContent}>
            <h2 className={styles.title}>{t('emailConfirmation.title')}</h2>
            {/* <p className={styles.description}>
              Hemos enviado un email a <strong>{email}</strong> para confirmar
              que la dirección de correo electrónico es correcta. Al
              recibir el email, haz click en el link para completar el
              registro.
            </p> */}
             <p 
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: t('emailConfirmation.description', { email: `<strong>${email}</strong>` })
              }}
            />
          </div>
        </div>
        <div className={styles.divider} />
      </div>
      <p className={styles.resendText}>
        <span className={styles.resendNormal}>
        {t('emailConfirmation.resendText.normal')}{" "}
        </span>
        <span
          className={styles.resendLink}
          onClick={onResend}
        >
          {t('emailConfirmation.resendText.link')}
        </span>
      </p>
    </div>
  );
}

export default EmailConfirmation;