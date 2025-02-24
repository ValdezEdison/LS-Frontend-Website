import React from "react";
import styles from "./LanguageSelector.module.css";

const LanguageOption = ({ flag, language, selected, onClick }) => (
  <div
    className={`${styles.languageOption} ${selected ? styles.selected : ""}`}
    onClick={onClick}
    role="menuitem"
  >
    <div className={styles.optionContent}>
      <img
        loading="lazy"
        src={flag}
        className={styles.flagIcon}
        alt={`${language} flag`}
      />
      <div className={styles.languageName}>{language}</div>
    </div>
    {selected && (
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/85c469ae9c6c44fcacbfdf79412e1e33/6baf9d240e0733f0425494b4c92fe8038d0ede8ab364f39553eca148428671c2?apiKey=85c469ae9c6c44fcacbfdf79412e1e33&"
        className={styles.checkIcon}
        alt="Selected language indicator"
      />
    )}
  </div>
);

export default LanguageOption;