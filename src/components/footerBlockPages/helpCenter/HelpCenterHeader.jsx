import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import { useTranslation } from 'react-i18next';
const HelpCenterHeader = () => {
    const { t } = useTranslation("HelpCenter");
    
    return (
      <header className={styles.headerSection}>
        <h1 className={styles.helpCenterTitle}>{t('helpCenter.title')}</h1>
      </header>
    );
  };

  export default HelpCenterHeader