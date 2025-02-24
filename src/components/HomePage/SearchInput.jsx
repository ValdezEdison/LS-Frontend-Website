import React, { useState } from "react";
import styles from "./SearchInput.module.css";
import SuggestionItem from "./SuggestionItem";
import { SearchBlack } from "../common/Images";
import { useTranslation } from "react-i18next";

const SearchInput = ({ handleSearchClick, showRegionDropDown, sugguestionRef, handleSearch, showSuggestionDropDown, handleSearchClose, searchValue }) => {
  const [suggestions] = useState([
    "Lisboa, Portugal",
    "Liverpool, Reino Unido",
    "Centro histórico de Lisboa, Portugal",
    "Centro de Lisboa, Portugal",
    "Liguria, Italia",
  ]);

  const { t } = useTranslation("SearchInput");

  return (
    <div className={styles.searchContainer}>
      <div className={`${styles.searchBar} ${showRegionDropDown || showSuggestionDropDown ? styles.open : ""}`} onClick={handleSearchClick}>
        <img loading="lazy" src={SearchBlack} className={styles.searchIcon} alt="" />
        <input
          type="text"
          className={styles.searchInput}
          placeholder={t("placeholder")}
          aria-label={t("ariaLabel")}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchValue}
        />
        {searchValue.length > 0 &&  <span className={styles.searchClose} onClick={handleSearchClose}></span>}
      </div>
      <div className={`${styles.suggestionsContainer} ${showSuggestionDropDown ? styles.active : ""}`} ref={sugguestionRef}>
        {suggestions.map((suggestion, index) => (
          <SuggestionItem key={index} text={suggestion} />
        ))}
      </div>
    </div>
  );
};

export default SearchInput;
