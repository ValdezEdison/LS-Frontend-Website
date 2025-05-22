import React, { useState } from 'react';
import styles from "../../../pages/footerBlockPages/helpCenter/HelpCenter.module.css";
import { useTranslation } from 'react-i18next';
import FAQItem from "./FAQItem";

const FAQSection = ({ faqBlock }) => {
    const [openFAQ, setOpenFAQ] = useState(null);
  
    if (!faqBlock || !faqBlock.questions) return null;
  
    return (
      <section className={styles.faqSection}>
        <div className={styles.sectionDivider} />
        <div className={styles.faqContainer}>
          <h2 className={styles.faqSectionTitle}>{faqBlock.title}</h2>
          <div className={styles.faqList}>
            {faqBlock.questions.map((item, index) => (
              <FAQItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === index}
                toggleOpen={() => setOpenFAQ(openFAQ === index ? null : index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default FAQSection;