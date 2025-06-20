
import React, { useState, useEffect } from "react";
import styles from "./Newsletter.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { subscribe } from "../../features/common/newsLetter/NewsLetterAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Newsletter = () => {
  // State for form handling
  const [email, setEmail] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const { t } = useTranslation("Newsletter");
  const { newsLetterBlocks, newsLetterLoading, newsLetterError } = useSelector((state) => state.cms.blocks);

  const dispatch = useDispatch();

  const createMarkup = (html) => {
    return { __html: html };
  };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setStatus({ type: null, message: "" }); // Reset status

//   if (!email.trim()) {
//     setStatus({ type: "error", message: "Please enter your email address" });
//     return;
//   }

//   if (newsLetterBlocks[0]?.gdpr_checkbox_required && !gdprConsent) {
//     setStatus({ type: "error", message: "Please agree to the privacy policy" });
//     return;
//   }

//   setSubmitting(true);
//   try {
//     const csrftoken = document.cookie.split('; ')
//         .find(row => row.startsWith('csrftoken'))
//         ?.split('=')[1];

//     const response = await fetch("https://localsecrets-staging.rudo.es/newsletter/subscribe/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "X-CSRFToken": csrftoken, // Include the CSRF token
//         },
//         body: JSON.stringify({ email: email, gdpr_consent: gdprConsent }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.error || "Failed to subscribe");
//     }

//     setStatus({
//       type: "success",
//       message: newsLetterBlocks[0]?.success_message || "Thank you for subscribing!",
//     });
//     setEmail("");
//     setGdprConsent(false);
//   } catch (error) {
//     setStatus({
//       type: "error",
//       message: error.message || "An error occurred. Please try again.",
//     });
//   } finally {
//     setSubmitting(false);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus({ type: null, message: "" }); // Reset status

  if (!email.trim()) {
    setStatus({ type: "error", message: t("emailRequired") });
    return;
  }

  if (newsLetterBlocks[0]?.gdpr_checkbox_required && !gdprConsent) {
    setStatus({ type: "error", message:  t("gdprRequired") });
    return;
  }

  setSubmitting(true);
  try {
    const resultAction = await dispatch(subscribe({ email, gdpr_consent: gdprConsent })).then((response) => {
      if (response.type === "newsletter/subscribe/fulfilled") {
          toast.success(response.payload?.detail || t("successMessage"));
      }else if (response.type === "newsletter/subscribe/rejected") {
          toast.error(response.payload?.error_description || t("errorMessage"));
      }
    });
   
  } catch (error) {
    setStatus({
      type: "error",
      message: error.message || t("errorMessage"),
    });
  } finally {
    setSubmitting(false);
  }
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
      
      {status.type && (
        <div className={`${styles.statusMessage} ${styles[status.type]}`}>
          {status.message}
        </div>
      )}

      <form  className={styles.newsletterFormOuter} onSubmit={handleSubmit}>
      <div className={styles.newsletterForm}>
        <div className={styles.newsletterFormWrapper}>
          <label htmlFor="emailInput" className={styles.visuallyHidden}>
          {newsLetterBlocks[0]?.email_placeholder}
          </label>
          <input
            type="email"
            id="emailInput"
            placeholder={newsLetterBlocks[0]?.email_placeholder}
            className={styles.emailInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
          />
           <button 
          type="submit" 
          className={styles.subscribeButton}
          disabled={submitting}
        >
          {submitting ? "..." : newsLetterBlocks[0]?.submit_button_text}
        </button>
        </div>
        
       
        
      {/* Conditionally render GDPR checkbox if required */}
      {newsLetterBlocks[0]?.gdpr_checkbox_required && (
       
       
       <div className={styles.gdprRow}>
          <input
            type="checkbox"
            id="gdprConsent"
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            className={styles.gdprCheckbox}
            disabled={submitting}
          />
          <label htmlFor="gdprConsent" className={styles.gdprLabel}>
            {newsLetterBlocks[0]?.gdpr_checkbox_text || "I agree to receive marketing emails and accept the privacy policy."}
          </label>
        </div>
      )}
      </div>
      </form>
      
      <p className={styles.privacyNotice}>
        {newsLetterBlocks[0]?.additional_description}
        {newsLetterBlocks[0]?.privacy_policy_url && (
          <>
            {" "}
            <a href={newsLetterBlocks[0]?.privacy_policy_url} className={styles.privacyLink}>
              {t("privacyPolicy")}
              {/* Privacy Policy */}
            </a>
            .
          </>
        )}
      </p>
    </section>
  );
};

export default Newsletter;

