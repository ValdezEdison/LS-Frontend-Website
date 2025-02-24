import React, { useState, useEffect } from "react";
import LanguageOption from "./LanguageOption";
import styles from "./LanguageSelector.module.css";
import { setLanguage } from "../../utils/Helper";
import { getLanguageData } from "../../utils/Helper";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Spain, UK, US } from "./Images";

const LanguageSelector = ({ setShowLanguageOption, languagesRef }) => {
  const { languages } = useSelector((state) => state.languages);
  console.log(languages, 'languages')
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  useEffect(() => {
    const languageData = getLanguageData();
    if (languageData) {
      setSelectedLanguage(languageData.code);
    }
  }, []);

  const handleLanguageChange = (code, flag, language) => {
    i18n.changeLanguage(code);
    setSelectedLanguage(code);
    setLanguage(code, flag, language);
    setShowLanguageOption(false);
  };

  // Filter out 'fr' and 'pt' languages
  const filteredLanguages = languages.filter(
    (lang) => lang.code !== "fr" && lang.code !== "pt"
  );

  // Map language codes to their corresponding flag images
  const flagImages = {
    es: Spain,
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
          selected={selectedLanguage === lang.code}
          onClick={() => handleLanguageChange(lang.code, flagImages[lang.code], lang.name)}
        />
      ))}
    </div>
  );
};

export default LanguageSelector;