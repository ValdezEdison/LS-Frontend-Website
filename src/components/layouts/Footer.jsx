import React from "react";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";
import { LSLogo2, FacebookWhite, InstagramWhite, LinkedinWhite } from "../common/Images";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import config from "../../config";

const Footer = () => {
  const { t } = useTranslation("Footer");

  const { footerBlocks, footerLoading, footerError } = useSelector((state) => state.cms.blocks);
  
  // Extract footer data from API response
  const footerData = footerBlocks?.[0] || {};
  

  if (footerLoading) {
    return (
      <footer className={styles.footer}>
        <div className="page-center">
          <div className={styles.footerContent}>
            {/* Logo and App Download Button Skeleton */}
            <div className={styles.footerLogo}>
              <Skeleton width={150} height={50} className={styles.logo} />
              <Skeleton width={180} height={40} className={'styles.appDownloadButton'} />
            </div>
            
            {/* Links Columns Skeleton */}
            <div className={styles.footerLinks}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={styles.linkColumn}>
                  <Skeleton width={100} height={25} className={styles.columnTitle} />
                  <ul className={styles.linkList}>
                    {[...Array(i === 1 ? 2 : 3)].map((_, j) => (
                      <li key={j}>
                        <Skeleton width={120} height={20} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Section Skeleton */}
        <div className={styles.footerBottom}>
          <Skeleton height={1} className={styles.footerDivider} />
          <div className="page-center">
            <div className={styles.footerInfo}>
              <div className={styles.copyrightLinks}>
                <Skeleton width={200} height={20} />
                {[...Array(3)].map((_, i) => (
                  <React.Fragment key={i}>
                    <Skeleton width={1} height={20} className={styles.dot} />
                    <Skeleton width={80} height={20} className={styles.legalLink} />
                  </React.Fragment>
                ))}
              </div>
              <div className={styles.socialLinks}>
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} width={24} height={24} circle className={styles.socialIcon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerBlocks) return null;

  // Get social links from API
  const socialLinks = footerData.social_links || [];
  
  // Get link sections from API
  const linkSections = footerData.link_sections || [];

return (
  <footer
    className={styles.footer}
    style={{
      backgroundColor: footerData.background_color || "#FFFFFF",
      color: footerData.text_color || "#151820",
    }}
  >
    <div className="page-center">
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          {footerData.logo_url ? (
            <img
              src={config.api.cmsBaseUrl + footerData.logo_url}
              alt={footerData.logo_alt_text || "Local Secrets Logo"}
              className={styles.logo}
            />
          ) : (
            <img
              src={LSLogo2}
              alt="Local Secrets Logo"
              className={styles.logo}
            />
          )}

          {/* --- UPDATED BUTTON LOGIC START --- */}
          {/* This button is now driven by the API and will only render if enabled */}
          {footerData.mobile_cta_enabled && (
            <a
              href={footerData.mobile_cta_link}
              className={styles.appDownloadButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerData.mobile_cta_text || "Download App"}{" "}
              {/* Fallback text */}
            </a>
          )}
          {/* --- UPDATED BUTTON LOGIC END --- */}

        </div>

        <div className={styles.footerLinks}>
          {linkSections.map((section) => (
            <div key={section.id} className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>{section.title}</h3>
              {section.links && section.links.length > 0 && (
                <ul className={styles.linkList}>
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        target={link.open_in_new_tab ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className={styles.footerBottom}>
      <hr className={styles.footerDivider} />
      <div className="page-center">
        <div className={styles.footerInfo}>
          <div className={styles.copyrightLinks}>
            <span className={styles.copyright}>
              {footerData.localized_copyright_text || footerData.copyright_text}
            </span>

            {footerData.legal_links && footerData.legal_links.length > 0 && (
              <>
                {footerData.legal_links.map((link, index) => (
                  <React.Fragment key={link.id || index}>
                    <span className={styles.dot}>·</span>
                    <a href={link.url} className={styles.legalLink}>
                      {link.title}
                    </a>
                  </React.Fragment>
                ))}
              </>
            )}

            {(!footerData.legal_links ||
              footerData.legal_links.length === 0) && (
              <>
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
              </>
            )}
          </div>

          {footerData.show_social_links && socialLinks.length > 0 && (
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                >
                  {social.platform === "facebook" && (
                    <img
                      src={FacebookWhite}
                      alt=""
                      className={styles.socialIcon}
                    />
                  )}
                  {social.platform === "instagram" && (
                    <img
                      src={InstagramWhite}
                      alt=""
                      className={styles.socialIcon}
                    />
                  )}
                  {social.platform === "linkedin" && (
                    <img
                      src={LinkedinWhite}
                      alt=""
                      className={styles.socialIcon}
                    />
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </footer>
);
};

export default Footer;