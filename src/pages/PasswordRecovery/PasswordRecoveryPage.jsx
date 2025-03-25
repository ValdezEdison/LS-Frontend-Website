import React from "react";
import Header from "../../components/layouts/Header";
import RecoveryForm from "../../components/PasswordRecovery/RecoveryForm";
import styles from "./PasswordRecoveryPage.module.css";
import HeroSection from "../../components/PasswordRecovery/HeroSection";

function PasswordRecoveryPage() {
  return (
    <div className={`${styles.pageContainer}  ${styles.authPage}`}>
      <Header />
      <div className={styles.loginPageOuter}>
      <main className={styles.mainContent}>
        <div className={styles.imageContainerWide}></div>
        <div className="login-page-center">
          <HeroSection />
          <div className={styles.formWrapper}>
            <RecoveryForm />
          </div>
        </div>
       
      </main>
      </div>
    </div>
  );
}

export default PasswordRecoveryPage;
