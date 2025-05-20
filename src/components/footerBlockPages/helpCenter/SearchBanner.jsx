import React from "react";
import styles from "./SearchBanner.module.css";

const SearchBanner = () => {
  return (
    <div className={styles.helpSection}>
      <div className={styles.helpTitle}>Centro de ayuda</div>
      <div className={styles.searchBanner}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/ea6293f033f08032d2882d828aba7d446ee18c7c?placeholderIfAbsent=true"
          className={styles.bannerImage}
          alt="Banner background"
        />
        <div className={styles.bannerTitle}>¿Cómo podemos ayudarte?</div>
        <div className={styles.searchBar}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/e3e2421dda696d3a897dca2a4fd63d0fa53cac55?placeholderIfAbsent=true"
            className={styles.searchIcon}
            alt="Search icon"
          />
          <div className={styles.searchPlaceholder}>
            Busca por palabras clave
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
