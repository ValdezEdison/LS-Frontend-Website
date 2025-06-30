import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import { useTranslation } from 'react-i18next';

const SearchSection = () => {
    const { t } = useTranslation("HelpCenter");
    
    return (
      <section className={styles.searchSection}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/ea6293f033f08032d2882d828aba7d446ee18c7c?placeholderIfAbsent=true"
          alt={t('helpCenter.backgroundAlt')}
          className={styles.backgroundImage}
        />
        <h2 className={styles.searchTitle}>{t('helpCenter.searchTitle')}</h2>
 
      </section>
    );
  };
  
  export default SearchSection;