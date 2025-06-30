import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
    const { t } = useTranslation("HelpCenter");
    
    const handleContactClick = () => {
      window.location.href = "/contact";
    };

    return (
      <footer className={styles.contactWrapper}>
      <section className={styles.contactSection}>
        <div className="page-center">
        <div className={styles.contactContent}>
          <h2 className={styles.contactTitle}>{t('helpCenter.contactTitle')}</h2>
          <p className={styles.contactDescription}>
          {t('helpCenter.contactDescription')}
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <button
          className={styles.contactButton}
          onClick={handleContactClick}
          >
          {t('helpCenter.contactButton')}
          </button>
        </div>
        </div>
      </section>
      </footer>
    );
  };


export default ContactSection