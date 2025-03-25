import React from "react";
import Header from "../../components/layouts/Header";
import RecoveryForm from "../../components/PasswordRecovery/RecoveryForm";
import styles from "./PasswordRecoveryPage.module.css";
import HeroSection from "../../components/PasswordRecovery/HeroSection";

function PasswordRecoveryPage() {
  return (
    <div className={`${styles.pageContainer}  ${styles.authPage}`}>
      <Header />
      <main className={styles.mainContent}>
        <HeroSection />
        <div className={styles.formWrapper}>
          <RecoveryForm />
        </div>
      </main>
    </div>
  );
}

export default PasswordRecoveryPage;
