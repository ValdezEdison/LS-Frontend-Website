import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ContactForm.module.css";  

// --- Mock Components and Functions to remove external dependencies ---

// Mock Loader component
const Loader = () => <span>Sending...</span>;

// Mock t function for translations
const translations = {
    "SendContactForm.title": "Contact Us",
    "SendContactForm.description": "Fill out this form to send us a message.",
    "SendContactForm.form.firstName.label": "First Name",
    "SendContactForm.form.lastName.label": "Last Name",
    "SendContactForm.form.linkedin.label": "LinkedIn Profile",
    "SendContactForm.form.email.label": "Email Address",
    "SendContactForm.form.message.label": "Message",
    "contactForm.consent.text": "I agree to the processing of my personal data in accordance with the ",
    "contactForm.consent.link": "Privacy Policy",
    "contactForm.submit": "Submit",
    "SendContactForm.form.helpText": "We will get back to you as soon as possible.",
    "contactForm.successMessage": "Message sent successfully!",
    "contactForm.errorMessage": "An error occurred. Please try again.",
    "contactForm.validation.consentRequired": "You must agree to the terms to submit the form.",
    "SendContactForm.form.firstName.errors.required": "Please enter your first name.",
    "SendContactForm.form.lastName.errors.required": "Please enter your last name.",
    "SendContactForm.form.linkedin.errors.required": "Please enter your LinkedIn profile URL.",
    "SendContactForm.form.email.errors.required": "Please enter your email address.",
    "SendContactForm.form.message.errors.required": "Please enter your message.",
    "SendContactForm.form.email.errors.invalid": "The email address you entered is invalid.",
    "SendContactForm.form.linkedin.errors.invalid": "The LinkedIn profile URL is invalid.",
};
const t = (key) => translations[key] || key;


// --- Mailgun Configuration ---
// These variables are now read from your .env file using Vite's syntax.
// Make sure your .env file has VITE_MAILGUN_API_KEY and VITE_MAILGUN_DOMAIN.
const MAILGUN_API_KEY = import.meta.env.VITE_MAILGUN_API_KEY;
const MAILGUN_DOMAIN = import.meta.env.VITE_MAILGUN_DOMAIN;
const MAIL_TO = "recipient@yourdomain.com"; // Replace with the email address that will receive the form submissions

function SendContactForm({
  initialData = { firstName: "", lastName: "", linkedin: "", email: "", message: "" },
}) {
  
  // Local state for loading, as we are bypassing Redux for submission
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // State Initialization
  const [formData, setFormData] = useState(initialData);
  const [isConsented, setIsConsented] = useState(false);
  const [fieldStates, setFieldStates] = useState({
    firstName: { error: "", touched: false },
    lastName: { error: "", touched: false },
    linkedin: { error: "", touched: false },
    email: { error: "", touched: false },
    message: { error: "", touched: false },
  });

  // Reset form state after submission
  const resetForm = () => {
    setFormData(initialData);
    setIsConsented(false);
    setFieldStates({
        firstName: { error: "", touched: false },
        lastName: { error: "", touched: false },
        linkedin: { error: "", touched: false },
        email: { error: "", touched: false },
        message: { error: "", touched: false },
    });
  };

  // Validation Function
  const validateField = (name, value) => {
    if (!value.trim()) return t(`SendContactForm.form.${name}.errors.required`);
    if (name === "email" && !/\S+@\S+\.\S+/.test(value))
      return t(`SendContactForm.form.email.errors.invalid`);
    if (name === "linkedin" && !/^https?:\/\/(?:www\.)?linkedin\.com/.test(value))
      return t(`SendContactForm.form.linkedin.errors.invalid`);
    return "";
  };

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldStates[name].touched) {
        setFieldStates((prev) => ({
          ...prev,
          [name]: { ...prev[name], error: validateField(name, value) },
        }));
    }
  };
  
  // Blur Handler to mark fields as touched
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFieldStates((prev) => ({
        ...prev,
        [name]: { touched: true, error: validateField(name, value) },
    }));
  };

  // Consent Handler
  const handleConsentChange = (e) => {
    setIsConsented(e.target.checked);
  };

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const newFieldStates = {};
    let isFormValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      newFieldStates[field] = { error, touched: true };
      if (error) isFormValid = false;
    });

    setFieldStates(newFieldStates);

    if (!isFormValid) return;
    if (!isConsented) {
        alert(t("contactForm.validation.consentRequired"));
        return;
    }

    setIsSending(true);

    const mailgunData = new FormData();
    mailgunData.append('from', `Contact Form <mailgun@${MAILGUN_DOMAIN}>`);
    mailgunData.append('to', MAIL_TO);
    mailgunData.append('subject', 'New Contact Form Submission');
    mailgunData.append('text', `
        New message from: ${formData.firstName} ${formData.lastName}
        Email: ${formData.email}
        LinkedIn: ${formData.linkedin || 'Not provided'}
        
        Message:
        ${formData.message}
    `);

    try {
        const response = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa('api:' + MAILGUN_API_KEY),
            },
            body: mailgunData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send message.');
        }

        setSuccess(true);
        alert(t("contactForm.successMessage"));
        resetForm();

    } catch (err) {
        setError(err.message);
        alert(`${t("contactForm.errorMessage")}: ${err.message}`);
    } finally {
        setIsSending(false);
    }
  };

  // NOTE: The 'styles' object from the CSS module has been removed.
  // You can apply inline styles or use regular CSS classes if needed.
  return (
        <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>{t("SendContactForm.title")}</h1>
      <p className={styles.formDescription}>{t("SendContactForm.description")}</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.fields}>
          {["firstName", "lastName", "linkedin", "email"].map((field) => (
            <div key={field} className={styles.field}>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={t(`SendContactForm.form.${field}.label`)}
                className={styles.input}
                value={formData[field]}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {fieldStates[field]?.touched && fieldStates[field]?.error && (
                <div style={{color: 'red'}}>{fieldStates[field].error}</div>
              )}
            </div>
          ))}
           <div key="message" className={styles.field}>
                <textarea
                  name="message"
                  placeholder={t(`SendContactForm.form.message.label`)}
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                ></textarea>
                {fieldStates.message?.touched && fieldStates.message?.error && (
                    <div style={{color: 'red'}}>{fieldStates.message.error}</div>
                )}
            </div>
        </div>

        <div className={styles.consentField}>
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={isConsented}
            onChange={handleConsentChange}
          />
          <label htmlFor="consent">
            {t("contactForm.consent.text")}{" "}
            <a href="/privacy-policy">{t("contactForm.consent.link")}</a>
          </label>
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSending}>
          {isSending ? <Loader /> : t("contactForm.submit")}
        </button>
      </form>
      <p className={styles.helpText}>{t("SendContactForm.form.helpText")}</p>
    </div>
  );
}

export default SendContactForm;
