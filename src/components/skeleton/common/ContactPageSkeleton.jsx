// components/ContactPage/ContactSkeletons.js
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../../pages/contact/Contacto.module.css";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";

export const ContactOfficeSkeleton = ({ containerClass }) => (
  <article className={containerClass}>
    <div className={styles.officeInfo}>
      <h2 className={styles.officeTitle}><Skeleton width={150} /></h2>
      <div className={styles.pressRoomInfo}>
        <div className={styles.pressPhoneRow}>
          <div className={styles.pressPhoneLabel}><Skeleton width={60} /></div>
          <div className={styles.pressPhoneNumber}><Skeleton width={120} /></div>
        </div>
        <div className={styles.pressEmailRow}>
          <div className={styles.pressEmailLabel}><Skeleton width={100} /></div>
          <div className={styles.pressEmailAddress}><Skeleton width={180} /></div>
        </div>
        <div className={styles.pressEmailRow}>
          <div className={styles.pressEmailLabel}><Skeleton width={60} /></div>
          <div className={styles.pressEmailAddress}><Skeleton width={200} /></div>
        </div>
      </div>
    </div>
    <Skeleton className={styles.officeImage} height={200} />
  </article>
);

export const ContactPressRoomSkeleton = () => (
  <article className={styles.pressRoomSection}>
    <h2 className={styles.pressRoomTitle}><Skeleton width={150} /></h2>
    <div className={styles.pressRoomInfo}>
      <div className={styles.pressPhoneRow}>
        <div className={styles.pressPhoneLabel}><Skeleton width={60} /></div>
        <div className={styles.pressPhoneNumber}><Skeleton width={120} /></div>
      </div>
      <div className={styles.pressEmailRow}>
        <div className={styles.pressEmailLabel}><Skeleton width={100} /></div>
        <div className={styles.pressEmailAddress}><Skeleton width={180} /></div>
      </div>
      <div className={styles.pressEmailRow}>
        <div className={styles.pressEmailLabel}><Skeleton width={80} /></div>
        <div className={styles.pressEmailAddress}><Skeleton width={150} /></div>
      </div>
    </div>
  </article>
);

export const ContactPageSkeleton = () => (
  <div className={styles.contactPage}>
    <div className={styles.pageContainer}>
      <Header />
      <main className="page-center">
        <h1 className={styles.pageTitle}><Skeleton width={200} /></h1>
        <p className={styles.pageSubtitle}><Skeleton width={300} /></p>
        
        <section className={styles.contactSections}>
          <ContactOfficeSkeleton containerClass={styles.officeSection} />
          <ContactOfficeSkeleton containerClass={styles.spainOfficeSection} />
          <ContactPressRoomSkeleton />
        </section>
      </main>
      <Footer />
    </div>
  </div>
);