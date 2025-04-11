import React, { createContext, useState, useEffect } from "react";
import { getLanguageData, setLanguage } from "../utils/Helper";
import { setCurrentLanguage } from "../services/AxiosConfig";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Initialize language state from localStorage or default to "es"
  const languageData = getLanguageData();
  const [language, setLanguageState] = useState(languageData?.code || "es");
  const [languageId, setLanguageId] = useState(languageData?.id || null);

  // Update localStorage and i18n when language changes
  const updateLanguage = (id, code, flag, name) => {
    setLanguageState(code); // Update state
    setLanguage(id, code, flag, name); // Update localStorage
    setCurrentLanguage(code); // Update Axios global language
    setLanguageId(id);
  };

  return (
    <LanguageContext.Provider value={{ language, languageId, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};