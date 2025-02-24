import React from "react";
import styles from "./SearchComponent.module.css";

function RegionSearch({ name, image }) {
  return (
    <div className={styles.regionItem}>
      {image.startsWith("http") ? (
        <img
          src={image}
          alt={`${name} region`}
          className={styles.regionImage}
        />
      ) : (
        <div
          className={`${styles.regionImage} ${styles[image]}`}
          aria-label={`${name} region`}
        />
      )}
      <div className={styles.regionName}>{name}</div>
    </div>
  );
}

export default RegionSearch;
