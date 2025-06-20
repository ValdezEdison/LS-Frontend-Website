"use client";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";

// Local component/hook/action imports (assuming paths are correct in your project)
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/footerBlockPages/common/Sidebar";
import JobSearch from "../../components/footerBlockPages/joinOurTeam/JobSearch";
import DepartmentSection from "../../components/footerBlockPages/joinOurTeam/DepartmentSection";
import CompanyStats from "../../components/footerBlockPages/joinOurTeam/CompanyStats";
import Testimonials from "../../components/footerBlockPages/joinOurTeam/Testimonials";
import Footer from "../../components/layouts/Footer";
import { fetchWorkWithUs } from "../../features/cms/Pages/PagesAction";
import { submitContactForm } from "../../features/common/contactUs/ContactUsAction"; // Assuming path for the action
import { LanguageContext } from "../../context/LanguageContext";
import styles from "./WorkWithUs.module.css";
import { toast } from "react-toastify"; // Make sure toast is configured in your app
import PopupForm from "../../components/popup/common/PopupForm";

// --- Self-Contained NewsletterBanner Component ---
// This component is ready to be used.
const NewsletterBanner = ({ title, buttonText, onButtonClick }) => {
  return (
    <section className={styles.newsletterBanner}>
      <div>
        <h2 className={styles.newsletterTitle}>{title}</h2>
        <button onClick={() => onButtonClick("popupForm", true)} className={styles.discoverButton}>{buttonText}</button>
      </div>
    </section>
  );
};

// --- Self-Contained PopupForm Component ---
// This component is now updated to use your Redux logic and imports correctly.
// const PopupForm = ({ onClose }) => {
//   const { t } = useTranslation("Ambassadors");  
//   const dispatch = useDispatch(); // Using the real useDispatch from react-redux

//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", linkedin: "", email: "", message: "",
//   });
//   const [isConsented, setIsConsented] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleConsentChange = (e) => setIsConsented(e.target.checked);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation checks
//     if (!isConsented) {
//       toast.error(t("contactForm.validation.consentRequired"));
//       return;
//     }
//     if (Object.values(formData).some((field) => !field.trim())) {
//       toast.error(t("contactForm.validation.allFieldsRequired"));
//       return;
//     }

//     setSubmitting(true);
//     try {
//       // Dispatching the async thunk action
//       const response = await dispatch(
//         submitContactForm({ ...formData, consent: isConsented })
//       );
      
//       // Handling the response based on the action type
//       if (response.type === "contactUs/sendContactUs/fulfilled") {
//         toast.success(response.payload.message || t("contactForm.successMessage"));
//         setFormData({ firstName: "", lastName: "", linkedin: "", email: "", message: "" });
//         setIsConsented(false);
//         setTimeout(() => onClose(), 2000); // Close popup on success
//       } else if (response.type === "contactUs/sendContactUs/rejected") {
//         toast.error(response.payload.error_description || t("contactForm.errorMessage"));
//       } else {
//         // Fallback for unexpected response types
//         throw new Error(t("contactForm.errorMessage"));
//       }
//     } catch (error) {
//       toast.error(error.message || t("contactForm.errorMessage"));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className={styles.popupBackdrop} onClick={onClose}>
//       <div className={styles.popupModal} onClick={(e) => e.stopPropagation()}>
//         <button onClick={onClose} className={styles.closeButton} aria-label="Close" disabled={submitting}>
//           <svg width="100%" height="100%" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//         </button>

//         <h3 className={styles.formTitle}>{t('contactForm.title')}</h3>
//         <p className={styles.formSubtitle}>{t('contactForm.subtitle')}</p>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.formFieldRow}>
//             <div className={styles.formField} style={{flex: 1}}>
//               <label htmlFor="firstName" className={styles.formLabel}>{t("contactForm.firstName")}</label>
//               <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} className={styles.formInput} />
//             </div>
//             <div className={styles.formField} style={{flex: 1}}>
//               <label htmlFor="lastName" className={styles.formLabel}>{t("contactForm.lastName")}</label>
//               <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} className={styles.formInput} />
//             </div>
//           </div>
//           <div className={styles.formField}>
//             <label htmlFor="email" className={styles.formLabel}>{t("contactForm.email")}</label>
//             <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={styles.formInput} />
//           </div>
//           <div className={styles.formField}>
//             <label htmlFor="linkedin" className={styles.formLabel}>{t("contactForm.linkedin")}</label>
//             <input type="text" id="linkedin" name="linkedin" required value={formData.linkedin} onChange={handleChange} className={styles.formInput} />
//           </div>
//           <div className={styles.formField}>
//             <label htmlFor="message" className={styles.formLabel}>{t("contactForm.message")}</label>
//             <textarea id="message" name="message" rows="4" required value={formData.message} onChange={handleChange} className={styles.formTextarea}></textarea>
//           </div>
//           <div className={styles.consentField}>
//             <input type="checkbox" id="consent" checked={isConsented} onChange={handleConsentChange} required />
//             <label htmlFor="consent">{t("contactForm.consent.text")} {t("contactForm.consent.link")} </label>
//           </div>
//           <div className={styles.submitButtonContainer}>
//             <button type="submit" className={styles.submitButton} disabled={submitting}>
//               {submitting ? "..." : t("contactForm.submit")}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


function WorkWithUs() {
  const { t } = useTranslation("WorkWithUs");
  const { language, languageId } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.popup);
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const showPopup = () => setIsPopupVisible(true);
  const hidePopup = () => setIsPopupVisible(false);

  useEffect(() => {
    dispatch(fetchWorkWithUs(languageId));
  }, [dispatch, language, languageId]);

  const [popupState, setPopupState] = useState({
    popupForm: false
  });

  const togglePopup = (name, state) => {
      setPopupState(prev => ({ ...prev, [name]: state }));
      state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  return (
    <div className={styles.trabajaconnosotros}>
      <Header />
      <div className="page-center">
        <main className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <Sidebar />
            <JobSearch />
          </div>
          <h2 className={styles.sectionTitle}>{t('departmentSection.title')}</h2>
          <DepartmentSection />
          <button className={styles.viewAllButton}>{t('departmentSection.viewAll')}</button>
        </main>
      </div>
      <CompanyStats />
      <div className="page-center">
        <Testimonials />
      </div>

      <NewsletterBanner 
        title={t('newsletter.title')}
        buttonText={t('newsletter.buttonText')}
        onButtonClick={togglePopup}
      />
      
      {isOpen && popupState.popupForm && <PopupForm onClose={() => { togglePopup("popupForm", false)}} />}
      
      <Footer />
    </div>
  );
}

export default WorkWithUs;
