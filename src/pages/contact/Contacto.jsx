
"use client";
import { useEffect, useState, useContext } from "react";
import styles from "./Contacto.module.css";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";

function Contacto() {
  const { t: tCommon } = useTranslation("Common");
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const localeMap = {
          en: 1, // English
          es: 3, // Spanish
          gb: 6, // British English
          default: 1,
        };
        const userLocale = localeMap[language] || localeMap.default;

        const apiUrl = `https://cms-ls-yerpb.ondigitalocean.app/api/v2/contact-sections/?format=json&locale=${userLocale}`;

        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
            "Accept-Language": language,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setContactData(data.results[0]);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, [language]);

  if (loading) {
    return <div className={styles.loading}>{tCommon("loading") || "Loading..."}</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>{tCommon("error") || "Error"}</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!contactData?.headquarters?.length) {
    return <div className={styles.error}>{tCommon("no_data") || "No contact data available"}</div>;
  }

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
                        <strong>{tCommon("email") || "Email"}:</strong>{" "}
                         
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
                        <strong>{tCommon("phone") || "Phone"}:</strong>{" "}
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

