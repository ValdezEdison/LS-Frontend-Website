import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const footerSections = [
    {
      title: "Conócenos",
      links: [
        "Quiénes somos",
        "Trabaja con nosotros",
        "La vida en Local Secrets",
      ],
    },
    {
      title: "Colaboradores",
      links: ["Embajadores", "Local secret managers"],
    },
    {
      title: "Recursos",
      links: ["Contacto", "Centro de ayuda", "Inicio sesión LS managers"],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.appDownload}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/a07b949151ef3553f6caf0989abc01ae4119bf3e?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Local Secrets App"
            className={styles.appLogo}
          />
          <button className={styles.downloadButton}>
            Descarga nuestra app
          </button>
        </div>
        {footerSections.map((section, index) => (
          <div key={index} className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <ul className={styles.sectionLinks}>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.footerDivider} />
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          Copyright Local Secrets 2024 · Condiciones generales · Política de
          privacidad · Gestión de cookies
        </p>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/2074217c56719485b40d139dec3c13fdf4d9eba4?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Social Media"
          className={styles.socialIcon}
        />
      </div>
    </footer>
  );
};

export default Footer;
