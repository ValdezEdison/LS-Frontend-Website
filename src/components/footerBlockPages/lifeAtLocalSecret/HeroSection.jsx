import React from "react";
import styles from "../../../pages/footerBlockPages/lifeAtLocalSecret/LifeAtLocalSecrets.module.css";

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/2124061c05427ac118e09826cc3aa33e8ad3bba5?placeholderIfAbsent=true"
        alt="Equipo de Local Secrets"
        className={styles.heroImage}
      />
      <p className={styles.heroDescription}>
        Nuestro equipo está impulsado por la curiosidad, la flexibilidad y la
        colaboración y, por supuesto, nuestro amor compartido por los viajes.
        Nos apasiona fomentar un espacio que sea inclusivo, accesible y
        empoderador para todos, en nuestra plataforma y detrás de escena.
      </p>
    </section>
  );
}

export default HeroSection;
