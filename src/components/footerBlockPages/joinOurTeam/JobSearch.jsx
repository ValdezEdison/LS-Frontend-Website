"use client";
import React from "react";
import styles from "../../../pages/joinOurTeam/WorkWithUs.module.css";

function JobSearch() {
  return (
    <section className={styles.heroSection}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/ebc71e4391e9dfda0805c60511805e8c227a05b6?placeholderIfAbsent=true"
        alt="Background image of workplace"
        className={styles.heroBackground}
      />
      <div className={styles.searchContainer}>
        <h1 className={styles.heroTitle}>Busca posiciones abiertas</h1>
        <div className={styles.searchBox}>
          <img src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/fe2ecee8a7f73c71620770be14a276a46e4b7cbd?placeholderIfAbsent=true" alt="Search icon" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Busca una posición o localización"
            className={styles.searchInput}
          />
        </div>
      </div>
    </section>
  );
}

export default JobSearch;

