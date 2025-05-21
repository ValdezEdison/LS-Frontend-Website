import React from "react";
import ContactForm from "./ContactForm";
import styles from "./ContactSection.module.css";

function ContactSection() {
  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <div className="page-center">
          <div className={styles.bannerWrapper}>
             <h2 className={styles.bannerTitle}>
              ¿Quieres formar parte de Local Secrets?
              </h2>
              <div className={styles.contactInfo}>
                <p className={styles.contactPrompt}>
                  Contacta con nuestro departamento comercial o rellena el formulario:
                </p>
                <address className={styles.contactAddress}>
                  Catalina Ederer
                  <br />
                  Key Account Manager
                  <br />
                  ejemplo@gmail.com
                </address>
              </div>
          </div>
          
        </div>
       
      </div>

      
        <div className="page-center">
          <div className={styles.formSection}>
          <h2 className={styles.formTitle}>
          Completa el formulario para contactar con nosotros
        </h2>
        <div className={styles.formContainer}>
          <div className={styles.formColumn}>
            <ContactForm />
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/6e26227600d035344805d60952cd9f349aa95910?placeholderIfAbsent=true"
            alt="Contact"
            className={styles.contactImage}
          />
        </div>
        </div>
        
      </div>
    </section>
  );
}

export default ContactSection;
