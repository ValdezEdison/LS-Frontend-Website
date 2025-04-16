import React from "react";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

const Footer = () => {

  const { t } = useTranslation('Registration');
  return (
    <footer className={styles.footer}>
      <div className={styles.termsAndPolicy}>
        <p>
        {t("footer.termsText")}{" "}
          <a href="#" className={styles.link}>
          {t("footer.termsLink")}
          </a>
          {" "}
          {t("footer.privacyText")}{" "}
          <a href="#" className={styles.link}>
          {t("footer.privacyLink")}{" "}
          </a>
        </p>
      </div>
      <div className={styles.copyright}>
      {t("footer.copyright")}
      </div>
      <div className={styles.businessSignup}>
        <p>{t("footer.businessQuestion")}</p>
        <a href="#" className={styles.link}>
        {t("footer.businessLink")}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
