import React, { useState } from "react";
import styles from "./TravelerRegistration.module.css";
import Header from "../../components/layouts/Header";
import RegistrationForm from "../../components/TravelerRegistration/RegistrationForm";
import SocialLogin from "../../components/TravelerRegistration/SocialLogin";
import Footer from "../../components/TravelerRegistration/Footer";

const TravelerRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${styles.registrationPage} ${styles.authPage}`}>
      <Header />
      

      
     
        <div className="login-page-center">
        <main className={styles.mainContent}>
        <div className={styles.bannerContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fac68f4a39f7382628bebc1d839fc16c2c5fef0"
            alt="Traveler by lake"
            className={styles.bannerImage}
          />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <h1 className={styles.formTitle}>Regístrate como viajero</h1>
            <RegistrationForm
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
            <SocialLogin />
            <Footer />
          </div>
        </div>
        </main>
        </div>
      
    </div>
  );
};

export default TravelerRegistration;
