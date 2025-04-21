import React from "react";
import styles from "./Newsletter.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Newsletter = () => {

  const { t } = useTranslation("Newsletter");

  const { newsLetterBlocks } = useSelector((state) => state.cms.blocks);
console.log(newsLetterBlocks, 'newsLetterBlocks')

const createMarkup = (html) => {
  return { __html: html };
};

  return (
    <section className={styles.newsletter}>
      <h2 className={styles.newsletterTitle}>
      {newsLetterBlocks[0]?.title}
      </h2>
      <p className={styles.newsletterDescription} dangerouslySetInnerHTML={createMarkup(newsLetterBlocks[0]?.description)}>
      {/* {newsLetterBlocks[0]?.description} */}
      </p>
      <form className={styles.newsletterForm}>
        <label htmlFor="emailInput" className={styles.visuallyHidden}>
          {newsLetterBlocks[0]?.email_placeholder}
        </label>
        <input
          type="email"
          id="emailInput"
          placeholder={newsLetterBlocks[0]?.email_placeholder}
          className={styles.emailInput}
          required
        />
        <button type="submit" className={styles.subscribeButton}>
          {newsLetterBlocks[0]?.submit_button_text}
        </button>
      </form>
      <p className={styles.privacyNotice}>
        {newsLetterBlocks[0]?.additional_description}
        <a href={newsLetterBlocks[0]?.privacy_policy_url} className={styles.privacyLink}>
          {/* {t("privacyPolicy")} */}
        </a>
        .
      </p>
    </section>
  );
};

export default Newsletter;
