import React from "react";
import ContactForm from "./ContactForm";
import styles from "./ContactSection.module.css";
import { useTranslation } from "react-i18next";``

function ContactSection() {

  const { t } = useTranslation("Ambassadors");

  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <div className="page-center">
          <div className={styles.bannerWrapper}>
             <h2 className={styles.bannerTitle}>
              {t('contact.title')}
              </h2>
              <div className={styles.contactInfo}>
                <p className={styles.contactPrompt}>
                {t('contact.prompt')}
                </p>
                <address className={styles.contactAddress}>
                {t('contact.address')}
                </address>
              </div>
          </div>
          
        </div>
       
      </div>

      
        <div className="page-center">
          <div className={styles.formSection}>
          <h2 className={styles.formTitle}>
          {t('contact.formTitle')}
        </h2>
        <div className={styles.formContainer}>
          <div className={styles.formColumn}>
            <ContactForm />
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/6e26227600d035344805d60952cd9f349aa95910?placeholderIfAbsent=true"
            alt={t('contact.imageAlt')}
            className={styles.contactImage}
          />
        </div>
        </div>
        
      </div>
    </section>
  );
}

export default ContactSection;
