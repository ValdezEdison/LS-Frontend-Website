import React from "react";
import styles from "./HeroSection.module.css";

function HeroSection() {
  return (
    <div className={styles.heroContainer}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6672f840692cb92f5e0b4f6e1189f61a23c641d6"
        alt="Scenic mountain landscape"
        className={styles.heroImage}
      />
    </div>
  );
}

export default HeroSection;
