import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { SearchBlack } from "./Images";
import { useTranslation } from "react-i18next";
import CustomInput from "./CustomInput";
// import SuggestionItem from "./SuggestionItem";

const SearchBar = ({ onSearch, showSuggestionDropDown, suggestionRef }) => {
    const [suggestions] = useState([
      "Lisboa, Portugal",
      "Liverpool, Reino Unido",
      "Centro histórico de Lisboa, Portugal",
      "Centro de Lisboa, Portugal",
      "Liguria, Italia",
    ]);

  const { t } = useTranslation('Places');

  return (
    <div className={styles.searchContainer}>
      <CustomInput
        type="text"
        placeholder={t("search.placeholder")}
        className={styles.searchInput}
        onChange={(e) => onSearch(e.target.value)}
      />
      <img src={SearchBlack} alt={t("search.iconAlt")} className={styles.searchIcon} />

      <div className={`${styles.suggestionsContainer} ${showSuggestionDropDown ? styles.active : ""}`} ref={suggestionRef}>
        {/* {suggestions.map((suggestion, index) => (
          <SuggestionItem key={index} text={suggestion} />
        ))} */}
      </div>
    </div>
  );
};

export default SearchBar;