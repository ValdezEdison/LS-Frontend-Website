import React from "react";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";
import { LSLogo2, FacebookWhite, InstagramWhite, LinkedinWhite } from "../common/Images";

const Footer = () => {

  const { t } = useTranslation("Footer");

  return (
    <footer className={styles.footer}>
      <div className="page-center">
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <img
            src={ LSLogo2 }
            alt="Local Secrets Logo"
            className={styles.logo}
          />
          <button className={styles.appDownloadButton}>
             {t("downloadApp")}
          </button>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>{t("sections.aboutUs")}</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="#about-us">{t("sections.whoWeAre")}</a>
              </li>
              <li>
                <a href="#careers">{t("sections.careers")}</a>
              </li>
              <li>
                <a href="#life-at-local-secrets">{t("sections.lifeAtLS")}</a>
              </li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>{t("sections.partners")}</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="#ambassadors">{t("sections.ambassadors")}</a>
              </li>
              <li>
                <a href="#local-secret-managers">{t("sections.lsManagers")}</a>
              </li>
            </ul>
            {/* Continuing from where we left off: */}
          </div>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>{t("sections.resources")}</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="#contact">{t("sections.contact")}</a>
              </li>
              <li>
                <a href="#help-center">{t("sections.helpCenter")}</a>
              </li>
              <li>
                <a href="#ls-managers-login">{t("sections.lsManagersLogin")}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
     
      <div className={styles.footerBottom}>
        <hr className={styles.footerDivider} />
        <div className="page-center" >
          <div className={styles.footerInfo}>
            <div className={styles.copyrightLinks}>
            <span className={styles.copyright}>
            {t("copyright")}
            </span>
            <span className={styles.dot}>·</span>
            <a href="#terms" className={styles.legalLink}>
            {t("legal.terms")}
            </a>
            <span className={styles.dot}>·</span>
            <a href="#privacy" className={styles.legalLink}>
            {t("legal.privacy")}
            </a>
            <span className={styles.dot}>·</span>
            <a href="#cookies" className={styles.legalLink}>
            {t("legal.cookies")}
            </a>
          </div>
          <div className={styles.socialLinks}>
            
            <a href="#twitter" aria-label="Twitter">
              <img
                src={LinkedinWhite}
                alt=""
                className={styles.socialIcon}
              />
            </a>
            <a href="#facebook" aria-label="Facebook">
              <img
                src={FacebookWhite}
                alt=""
                className={styles.socialIcon}
              />
            </a>
            <a href="#instagram" aria-label="Instagram">
              <img
                src={InstagramWhite}
                alt=""
                className={styles.socialIcon}
              />
            </a>
          </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
