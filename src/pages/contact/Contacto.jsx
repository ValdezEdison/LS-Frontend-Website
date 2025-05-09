"use client";
import React from "react";
import styles from "./Contacto.module.css";
import Header from "../../components/layouts/Header";
import ContactOffice from "../../components/ContactPage/ContactOffice";
import ContactPressRoom from "../../components/ContactPage/ContactPressRoom";
import Footer from "../../components/layouts/Footer";

function Contacto() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.pageContainer}>
        <Header />
        <main className="page-center">
          <h1 className={styles.pageTitle}>Contacto</h1>
          <section className={styles.contactSections}>
            <ContactOffice
              title="Headquarters USA"
              phone="+1 786 123 456 789"
              email="ejemplo@gmail.com"
              address={[
                "Local Secrets SL",
                "Calle Ejemplo 123",
                "416003 Miami, Florida, USA",
              ]}
              imageSrc="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/cc290e05ffe4762263127916771135748ce3aa5e?placeholderIfAbsent=true"
              containerClass={styles.officeSection}
            />

            <ContactOffice
              title="Oficinas España"
              phone="+34 123 456 789"
              email="ejemplo@gmail.com"
              address={[
                "Local Secrets SL",
                "Calle Ejemplo 123",
                "46003 Valencia, España",
              ]}
              imageSrc="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/17cd7026506a402db8cff0db7e89a6ae80a96c61?placeholderIfAbsent=true"
              containerClass={styles.spainOfficeSection}
            />

            <ContactPressRoom />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Contacto;
