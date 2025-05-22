import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import { useTranslation } from 'react-i18next';

const TopicCard = ({ icon, title, className }) => {
    const { t } = useTranslation("HelpCenter");
    
    const iconElement = <img src={icon} alt={title} className={styles.cardIcon} />;
  
    return (
      <article className={className}>
        {iconElement}
        <h3 className={styles.textWrapper}>{t(`helpCenter.topics.${title}`)}</h3>
      </article>
    );
  };


export default TopicCard