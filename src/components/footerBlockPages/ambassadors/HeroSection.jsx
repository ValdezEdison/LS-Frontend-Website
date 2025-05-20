import React from "react";
import styles from "./HeroSection.module.css";

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.title}>Embajadores</h1>
      <div className={styles.banner}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/fd84dbde5ea44dcc455deaf1fbdf51a2493b13fd?placeholderIfAbsent=true"
          alt="Embajadores Banner"
          className={styles.bannerImage}
        />
        <h2 className={styles.bannerTitle}>
          ¡Conviértete en embajador de Local Secrets!
        </h2>
      </div>
    </section>
  );
}

export default HeroSection;
