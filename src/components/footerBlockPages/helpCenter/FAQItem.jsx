
import React from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import { useTranslation } from 'react-i18next';

const FAQItem = ({ question, answer, isOpen, toggleOpen, index }) => {
    const { t } = useTranslation("HelpCenter");
    
    return (
      <article className={index === 0 ? styles.faqItem : styles[`faqItem${index + 1}`]}>
        <div className={styles.faqQuestionRow}>
          <h3 className={styles[index === 0 ? 'faqQuestion' : `faqQuestion${index + 1}`]}>{question}</h3>
          <button onClick={toggleOpen} aria-label={isOpen ? t('helpCenter.collapse') : t('helpCenter.expand')}>
            <img
              src={isOpen ? 
                "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f4ae355e883ee10a8a3ebd8615e6cd21de334a33?placeholderIfAbsent=true"
                 : 
                 "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/aa514361792df869be6beeb1c6e980b1fdeaf322?placeholderIfAbsent=true"
                }
              alt={isOpen ? t('helpCenter.collapse') : t('helpCenter.expand')}
              className={styles[index === 0 ? 'toggleIcon' : `toggleIcon${index + 1}`]}
            />
          </button>
        </div>
        <div className={styles[index === 0 ? 'faqDivider' : `faqDivider${index + 1}`]} />
        {isOpen && answer && (
          <p className={styles[index === 0 ? 'faqAnswer' : `faqAnswer${index + 1}`]}>{answer}</p>
        )}
      </article>
    );
  };

  export default FAQItem;