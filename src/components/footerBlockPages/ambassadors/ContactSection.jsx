import React, { useState } from "react";
import SendContactForm from "./SendContactForm";
import styles from "./ContactSection.module.css";
import { useTranslation } from "react-i18next";

// Modify the function signature to accept props
function ContactSection({ title, description, images }) {
  const { t } = useTranslation("Ambassadors");

  // Initialize fieldStates in component state
  const [fieldStates, setFieldStates] = useState({
    name: { error: null, touched: false },
    email: { error: null, touched: false },
    message: { error: null, touched: false },
  });

// Updated handleInputChange Function
const handleInputChange = (field, value) => {
  if (typeof value !== 'string' || value === null || value === undefined) {
    setFieldStates((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        error: "Invalid input",
        touched: true,
      },
    }));
    return;
  }

  setFieldStates((prevState) => ({
    ...prevState,
    [field]: {
      ...prevState[field],
      error: value.trim() === "" ? "Field is required" : null,
      touched: true,
    },
  }));
};

  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <div className="page-center">
          <div className={styles.bannerWrapper}>
            {/* Use the 'title' prop for the banner title */}
            <h2 className={styles.bannerTitle}>
              {title || t('contact.title')} {/* Fallback to translation if prop is not available */}
            </h2>
            <div className={styles.contactInfo}>
              {/* Use the 'description' prop for the contact prompt/description */}
              {description && (
                <div
                  className={styles.contactPrompt}
                  dangerouslySetInnerHTML={{ __html: description }} style={{ color: 'white' }}
                />
              )}
            
            </div>
          </div>
        </div>
      </div>

      <div className="page-center" id="page-center">
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>
            {t('contact.formTitle')}
          </h2>
          <div className={styles.formContainer}>
            <div className={styles.formColumn}>
              <SendContactForm
                fieldStates={fieldStates}
                handleInputChange={(field, value) =>
                  handleInputChange(field, value)
                }
                formData={{}} // Logic for formData as required
                handleSubmit={() => {}}
                handleFocus={() => {}}
                handleBlur={() => {}}
                isFormValid={
                  !Object.values(fieldStates).some((field) => field.error)
                }
              />
            </div>
            {/* Use the 'images' prop for the contact image if available */}
            {images && images.length > 0 && (
              <img
                src={images[0].image.url} // Assuming images is an array with an 'image' object and 'url' property
                alt={images[0].image.alt || t('contact.imageAlt')}
                className={styles.contactImage}
              />
            )}
            {/* Fallback to the hardcoded image if no images prop */}
            {(!images || images.length === 0) && (
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/6e26227600d035344805d60952cd9f349aa95910?placeholderIfAbsent=true"
                alt={t('contact.imageAlt')}
                className={styles.contactImage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;