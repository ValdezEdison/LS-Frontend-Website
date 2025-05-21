import React from "react";
import styles from "./ContactForm.module.css";
import { useTranslation } from "react-i18next";

function ContactForm() {
  const { t } = useTranslation("Ambassadors");
  return (
    <form className={styles.form}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <input
            type="text"
            placeholder={t('contactForm.firstName')}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            type="text"
            placeholder={t('contactForm.lastName')}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            type="text"
            placeholder={t('contactForm.linkedin')}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            type="email"
            placeholder={t('contactForm.email')}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <textarea
            placeholder={t('contactForm.message')}
            className={styles.textarea}
            required
          ></textarea>
        </div>
      </div>
      <p className={styles.disclaimer}>
      {t('contactForm.disclaimer')}
      </p>
      <p className={styles.privacy}>
      {t('contactForm.privacy.text')}{" "}
        <a href="#" className={styles.privacyLink}>
        {t('contactForm.privacy.link')}
        </a>
        {t('contactForm.privacy.optOut')}
      </p>
      <button type="submit" className={styles.submitButton}>
      {t('contactForm.submit')}
      </button>
    </form>
  );
}

export default ContactForm;
