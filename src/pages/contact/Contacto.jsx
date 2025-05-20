"use client";
import React, { useEffect, useContext } from "react";
import styles from "./Contacto.module.css";
import Header from "../../components/layouts/Header";
import ContactOffice from "../../components/ContactPage/ContactOffice";
import ContactPressRoom from "../../components/ContactPage/ContactPressRoom";
import Footer from "../../components/layouts/Footer";
import { fetchContactUs } from "../../features/cms/Pages/PagesAction";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";
import config from "../../config";
import { PlaceHolderImg2 } from "../../components/common/Images";
import { ContactPageSkeleton } from "../../components/skeleton/common/ContactPageSkeleton";

function Contacto() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { language, languageId } = useContext(LanguageContext);
  const { contactUs, contactUsLoading, error } = useSelector((state) => state.cms.pages);

  useEffect(() => {
    dispatch(fetchContactUs(languageId));
  }, [dispatch, language]);

  if (contactUsLoading) {
    return <ContactPageSkeleton />;
  }
  
  // Find the first active contact item in the array
  const contactData = Array.isArray(contactUs) ? contactUs.find(item => item.is_active) : null;
  if (!contactData) return null;

  // Find specific offices
  const headquarters = contactData.headquarters?.find(office => office.location_name === "Headquarters USA");
  const spainOffice = contactData.headquarters?.find(office => office.location_name === "Spain Offices");
  const pressRoom = contactData.headquarters?.find(office => office.location_name === "Conference Press");

  return (
    <div className={styles.contactPage}>
      <div className={styles.pageContainer}>
        <Header />
        <main className="page-center">
          <h1 className={styles.pageTitle}>{contactData.title || "Contact"}</h1>
          <p className={styles.pageSubtitle}>{contactData.subtitle || ""}</p>
          
          <section className={styles.contactSections}>
            {headquarters && (
              <ContactOffice
                title={headquarters.location_name}
                phone={headquarters.phone_number}
                email={headquarters.email}
                address={headquarters.address}
                imageSrc={headquarters?.image_url?.url ? `${config.api.cmsBaseUrl}${headquarters.image_url.url}` : PlaceHolderImg2}
                containerClass={styles.officeSection}
              />
            )}

            {spainOffice && (
              <ContactOffice
                title={spainOffice.location_name}
                phone={spainOffice.phone_number}
                email={spainOffice.email}
                address={spainOffice.address}
                imageSrc={spainOffice?.image_url?.url ? `${config.api.cmsBaseUrl}${spainOffice.image_url.url}` : PlaceHolderImg2}
                containerClass={styles.spainOfficeSection}
              />
            )}

            {pressRoom && (
              <ContactPressRoom 
                title={pressRoom.location_name}
                phone={pressRoom.phone_number}
                email={pressRoom.email}
                contactPerson={pressRoom.address}
              />
            )}
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Contacto;