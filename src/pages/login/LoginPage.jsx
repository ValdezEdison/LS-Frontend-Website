import React from "react";
import Header from "../../components/layouts/Header";
import LoginForm from "../../components/LoginPage/LoginForm";
import SocialLogin from "../../components/LoginPage/SocialLogin";
import Footer from "../../components/LoginPage/Footer";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={`${styles.loginPage} ${styles.authPage}`}>
      <Header />
      <div className="login-page-center">
      <div className={styles.contentWrapper}>
        <div className={styles.imageContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/49bebf84406b700c1b9c1bb3a9744dbf366034f8?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Login page decorative image"
            className={styles.decorativeImage}
          />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <h1 className={styles.formTitle}>
              Inicia sesión o crea una cuenta
            </h1>
            <LoginForm />
            <SocialLogin />
            <Footer />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
