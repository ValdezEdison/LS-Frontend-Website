import React from "react";
import styles from "./Newsletter.module.css";
import { useTranslation } from "react-i18next";

const Newsletter = () => {

  const { t } = useTranslation("Newsletter");

  return (
    <section className={styles.newsletter}>
      <h2 className={styles.newsletterTitle}>
        {t("title")}
      </h2>
      <p className={styles.newsletterDescription}>
        {t("description")}
      </p>
      <form className={styles.newsletterForm}>
        <label htmlFor="emailInput" className={styles.visuallyHidden}>
          {t("placeholder")}
        </label>
        <input
          type="email"
          id="emailInput"
          placeholder={t("placeholder")}
          className={styles.emailInput}
          required
        />
        <button type="submit" className={styles.subscribeButton}>
          {t("buttonText")}
        </button>
      </form>
      <p className={styles.privacyNotice}>
        {t("privacyNotice")}{" "}
        <a href="#privacy-policy" className={styles.privacyLink}>
          {t("privacyPolicy")}
        </a>
        .
      </p>
    </section>
  );
};

export default Newsletter;
