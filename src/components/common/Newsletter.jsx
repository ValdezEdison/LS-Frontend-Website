import React, { useState } from "react";
import styles from "./Newsletter.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

// --- Mailgun Configuration ---
// These variables are read from your .env file using Vite's syntax.
const MAILGUN_API_KEY = import.meta.env.VITE_MAILGUN_API_KEY;
const MAILGUN_DOMAIN = import.meta.env.VITE_MAILGUN_DOMAIN;
const MAILGUN_LIST_ADDRESS = import.meta.env.VITE_MAILGUN_LIST_ADDRESS;  


const Newsletter = () => {
    // State for form handling
    const [email, setEmail] = useState("");
    const [gdprConsent, setGdprConsent] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const { t } = useTranslation("Newsletter");
    const { newsLetterBlocks, newsLetterLoading } = useSelector((state) => state.cms.blocks);

    const createMarkup = (html) => ({ __html: html });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error(t("emailRequired"));
            return;
        }

        if (newsLetterBlocks[0]?.gdpr_checkbox_required && !gdprConsent) {
            toast.error(t("gdprRequired"));
            return;
        }

        setSubmitting(true);

        // Mailgun API requires form-urlencoded data for adding list members
        const mailgunData = new URLSearchParams();
        mailgunData.append('subscribed', 'true');
        mailgunData.append('address', email);

        try {
            const response = await fetch(`https://api.mailgun.net/v3/lists/${MAILGUN_LIST_ADDRESS}/members`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa('api:' + MAILGUN_API_KEY),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: mailgunData.toString(),
            });

            const result = await response.json();

            if (!response.ok) {
                // Mailgun might return a useful message, e.g., if the user is already subscribed
                throw new Error(result.message || 'Failed to subscribe.');
            }

            toast.success(result.message || t("successMessage"));
            setEmail("");
            setGdprConsent(false);

        } catch (error) {
            toast.error(error.message || t("errorMessage"));
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
            <p className={styles.newsletterDescription} dangerouslySetInnerHTML={createMarkup(newsLetterBlocks[0]?.description)}></p>
            
            <form className={styles.newsletterFormOuter} onSubmit={handleSubmit}>
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
                        </a>
                        .
                    </>
                )}
            </p>
        </section>
    );
};

export default Newsletter;
