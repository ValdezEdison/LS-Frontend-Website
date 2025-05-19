import React from "react";
import styles from "./Newsletter.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Newsletter = () => {

  // const { t } = useTranslation("Newsletter");

  const { newsLetterBlocks, newsLetterLoading, newsLetterError } = useSelector((state) => state.cms.blocks);


const createMarkup = (html) => {
  return { __html: html };
};

if (newsLetterLoading) {
  return (
    <section className={styles.newsletter} style={{ backgroundColor:"#dfdbdb" }} >
      <Skeleton height={30} width={200} className={styles.newsletterTitle} />
      <Skeleton count={2} className={styles.newsletterDescription} />
      <form className={styles.newsletterForm}>
        <Skeleton height={40} width={300} className={styles.emailInput} />
        <Skeleton height={40} width={100} className={styles.subscribeButton} style={{ backgroundColor:"#dfdbdb" }}/>
      </form>
      <Skeleton count={2} className={styles.privacyNotice} />
    </section>
  );
}

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
