import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const Footer = () => {
  const { t } = useTranslation('Login');

  return (
    <footer className={styles.footer}>
      <hr className={styles.footerDivider} />
      <p className={styles.footerText}>
        {t('footer.agreement')}{" "}
        <a href="#" className={styles.footerLink}>
          {t('footer.terms')}
        </a>{" "}
        {t('and')}{" "}
        <a href="#" className={styles.footerLink}>
          {t('footer.privacy')}
        </a>
        <br />
        {t('footer.rights')}
        <br />
        {t('footer.copyright')}
      </p>
    </footer>
  );
};

export default Footer;