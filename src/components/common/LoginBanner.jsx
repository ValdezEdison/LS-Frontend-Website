import React from "react";
import { useTranslation } from "react-i18next";

const LoginBanner = ({handleNavigateToLogin, styles}) => {

  const { t } = useTranslation("Places");

  return (
    <div className={styles.loginBanner}>
      <div className={styles.loginBannerLeft}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/6736a24d7d0736b0250a7acc032c30914b57137164b9ebd63add28325fe87921?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt={t("loginBanner.imageAlt")}
          className={styles.loginIcon}
        />
        <p className={styles.loginMessage}>
        {t("loginBanner.message")}
        </p>
      </div>
      <button className={styles.loginButton} onClick={handleNavigateToLogin}>{t("loginBanner.button")}</button>
    </div>
  );
};

export default LoginBanner;