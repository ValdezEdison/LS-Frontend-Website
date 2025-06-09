import React, { useState } from "react";
import styles from "./ContactForm.module.css"; // Your styles here
import { useTranslation } from "react-i18next";

function ContactForm() {
  const { t } = useTranslation("Ambassadors");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    linkedin: "",
    email: "",
    message: "",
  });

  const [isConsented, setIsConsented] = useState(false); // New state for consent checkbox
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConsentChange = (e) => {
    setIsConsented(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    // Validate Consent
    if (!isConsented) {
      setStatus({ type: "error", message: "You must agree to the terms to submit the form." });
      return;
    }

    // Basic validation
    if (Object.values(formData).some((field) => !field.trim())) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("https://localsecrets-staging.rudo.es/contact-form/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send the message");
      }

      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({
        firstName: "",
        lastName: "",
        linkedin: "",
        email: "",
        message: "",
      });
      setIsConsented(false); // Reset consent
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <input
            type="text"
            name="firstName"
            placeholder={t("contactForm.firstName")}
            className={styles.input}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            type="text"
            name="lastName"
            placeholder={t("contactForm.lastName")}
            className={styles.input}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            type="text"
            name="linkedin"
            placeholder={t("contactForm.linkedin")}
            className={styles.input}
            value={formData.linkedin}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            type="email"
            name="email"
            placeholder={t("contactForm.email")}
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <textarea
            name="message"
            placeholder={t("contactForm.message")}
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </div>

      {/* Add consent checkbox */}
      <div className={styles.consentField}>
        <input
          type="checkbox"
          id="consent"
          checked={isConsented}
          onChange={handleConsentChange}
          required
        />
        <label htmlFor="consent">{t("contactForm.consent.text")} <a href="#">{t("contactForm.consent.link")}</a></label>
      </div>

      <p className={styles.disclaimer}>{t("contactForm.disclaimer")}</p>
      <p className={styles.privacy}>
        {t("contactForm.privacy.text")}
        <a href="#" className={styles.privacyLink}>
          {t("contactForm.privacy.link")}
        </a>
        {t("contactForm.privacy.optOut")}
      </p>

      {status.type && (
        <div className={`${styles.statusMessage} ${styles[status.type]}`}>
          {status.message}
        </div>
      )}

      <button type="submit" className={styles.submitButton} disabled={submitting}>
        {submitting ? "..." : t("contactForm.submit")}
      </button>
    </form>
  );
}

export default ContactForm;