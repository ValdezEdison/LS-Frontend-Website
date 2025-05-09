import React from "react";
import styles from "../../pages/Blog/BlogPage.module.css";

function BlogFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <div className={styles.appColumn}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/cab87f08d2073f2fd625f6f72d2189fe01159977?placeholderIfAbsent=true"
                alt="Local Secrets App"
                className={styles.appLogo}
              />
              <a href="#" className={styles.appDownloadButton}>
                Descarga nuestra app
              </a>
            </div>
          </div>
          <div className={styles.footerColumn2}>
            <div className={styles.aboutColumn}>
              <h3 className={styles.aboutTitle}>Conócenos</h3>
              <nav className={styles.aboutLinks}>
                <a href="#">Quiénes somos</a>
                <br />
                <a href="#">Trabaja con nosotros</a>
                <br />
                <a href="#">La vida en Local Secrets</a>
              </nav>
            </div>
          </div>
          <div className={styles.footerColumn3}>
            <div className={styles.collaboratorsColumn}>
              <h3 className={styles.collaboratorsTitle}>Colaboradores</h3>
              <nav className={styles.collaboratorsLinks}>
                <a href="#">Embajadores</a>
                <br />
                <a href="#">Local secret managers</a>
              </nav>
            </div>
          </div>
          <div className={styles.footerColumn4}>
            <div className={styles.resourcesColumn}>
              <h3 className={styles.resourcesTitle}>Recursos</h3>
              <nav className={styles.resourcesLinks}>
                <a href="#">Contacto</a>
                <br />
                <a href="#">Centro de ayuda</a>
                <br />
                <a href="#" className={styles.underlineLink}>
                  Inicio sesión LS managers
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.footerDivider} />
      <div className={styles.footerBottom}>
        <div className={styles.copyrightText}>
          Copyright Local Secrets 2024 · Condiciones generales · Política de
          privacidad · Gestión de cookies
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f5de6eca7225bf954cc0a641fb5906a5444e88ff?placeholderIfAbsent=true"
          alt="Social media"
          className={styles.socialIcon}
        />
      </div>
    </footer>
  );
}

export default BlogFooter;
