import React from "react";
import styles from "./FAQItem.module.css";

const FAQItem = ({ question, expandIcon }) => {
  return (
    <div className={styles.faqItem}>
      <div className={styles.faqQuestion}>
        <div className={styles.questionText}>{question}</div>
        <img src={expandIcon} className={styles.expandIcon} alt="Expand" />
      </div>
      <div className={styles.questionDivider} />
    </div>
  );
};

export default FAQItem;
