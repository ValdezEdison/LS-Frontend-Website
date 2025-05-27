
"use client";
import { useEffect, useState, useContext } from "react";
import styles from "./Contacto.module.css";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchContactUs } from "../../features/cms/Pages/PagesAction";
import { useDispatch, useSelector } from "react-redux";
import { ContactPageSkeleton } from "../../components/skeleton/common/ContactPageSkeleton";
function Contacto() {
  const { t: tCommon } = useTranslation("Common");
  const { t } = useTranslation("Contact");
  // const [contactData, setContactData] = useState(null);
  const dispatch = useDispatch();
  const { language, languageId } = useContext(LanguageContext);
  const { contactUs, contactUsLoading, error } = useSelector((state) => state.cms.pages);
  
  useEffect(() => {
    dispatch(fetchContactUs(languageId));
  }, [dispatch, language]);

  if (contactUsLoading) {
    return <ContactPageSkeleton />;
  }

  if (!contactUs[0]?.headquarters?.length) {
    return <div className={styles.error}>{tCommon("noResult") || "No contact data available"}</div>;
  }
  const contactData = contactUs[0];
  return (
    <div className={styles.contactPage}>
      <div className={styles.pageContainer}>
        <Header />
        <main className="page-center">
          <h1 className={styles.pageTitle}>{contactData.title}</h1>
          {contactData.subtitle && (
            <p className={styles.pageSubtitle}>{contactData.subtitle}</p>
          )}

          <section className={styles.contactSections}>
            {contactData.headquarters.map((office) => (
              <>
                <div
                  key={office.id}
                  className={`${styles.officeSection} ${styles.contactCard}`}
                  data-office-id={office.id}
                  data-office-type={office.office_type_details.code}
                >
                  <div className={styles.contactInfo}>
                    <h2>{office.location_name}</h2>
            
                    {office.email && (
                      <p>
                        <strong>{t("contact.email") || "Email"}:</strong>{" "}
                         
                          {office.email}
                         
                      </p>
                    )}
            
                    {office.address && (
                      <address>
                        {office.address.split("\n").map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </address>
                    )}
            
                    {office.phone_number && (
                      <p>
                        <strong>{t("contact.phone") || "Phone"}:</strong>{" "}
                        {office.phone_number}
                      </p>
                    )}
                  </div>
            
                  {office.image_url && office.image_url.url && (
                    <img
                      src={office.image_url.url}
                      alt={office.image_url.alt || office.location_name}
                      className={styles.officeImage}
                    />
                  )}
                </div>
                <br />
                <div key={`divider-${office.id}`} className={styles.divider} />
              </>
            ))}
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Contacto;

