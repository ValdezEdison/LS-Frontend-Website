import React, { useState, useEffect, useContext } from "react";
import LanguageOption from "./LanguageOption";
import styles from "./LanguageSelector.module.css";
import { setLanguage } from "../../utils/Helper";
import { getLanguageData } from "../../utils/Helper";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Spain, UK, US } from "./Images";
import { LanguageContext } from "../../context/LanguageContext";

const LanguageSelector = ({ languagesRef, handleLanguageChange }) => {
  const { languages } = useSelector((state) => state.languages);

  const { language } = useContext(LanguageContext); // Get the current language from context


  // Filter out 'fr' and 'pt' languages
  const filteredLanguages = languages.filter(
    (lang) => lang.code !== "fr" && lang.code !== "pt"
  );

  // Map language codes to their corresponding flag images
  const flagImages = {
    "es": Spain,
    "en": US,
    "en-GB": UK,
  };
  return (
    <div className={styles.languageSelector} role="menu" ref={languagesRef}>
      {filteredLanguages.map((lang) => (
        <LanguageOption
          key={lang.code}
          flag={flagImages[lang.code]} // Use the corresponding flag image
          language={lang.name}
          selected={language === lang.code}
          onClick={() => handleLanguageChange(lang.id, lang.code, flagImages[lang.code], lang.name)}
        />
      ))}
    </div>
  );
};

export default LanguageSelector;