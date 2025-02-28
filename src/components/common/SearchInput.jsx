import React, { useState } from "react";
import styles from "./SearchInput.module.css";
import SuggestionItem from "./SuggestionItem";
import { SearchBlack } from "../common/Images";
import { useTranslation } from "react-i18next";
import CustomInput from "./CustomInput";

const SearchInput = ({ handleSearchClick, showRegionDropDown, suggestionRef, handleSearch, showSuggestionDropDown, handleSearchClose, searchValue, placeholder, suggestionsList, onSelect }) => {
  const [defaultSuggestions] = useState([
    "Lisboa, Portugal",
    "Liverpool, Reino Unido",
    "Centro histórico de Lisboa, Portugal",
    "Centro de Lisboa, Portugal",
    "Liguria, Italia",
  ]);

  const { t } = useTranslation("SearchInput");
  const inputPlaceholder = placeholder || t("placeholder");

  const suggestions = Array.isArray(suggestionsList) && suggestionsList.length > 0 ? suggestionsList : defaultSuggestions;


  return (
    <div className="">
      <div className={`${styles.searchBar} ${showRegionDropDown || showSuggestionDropDown ? styles.open : ""}`} onClick={handleSearchClick}>
        <img loading="lazy" src={SearchBlack} className={styles.searchIcon} alt="" />
        <CustomInput
          type="text"
          className={styles.searchInput}
          placeholder={inputPlaceholder}
          aria-label={t("ariaLabel")}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchValue}
        />
        {searchValue.length > 0 && <span className={styles.searchClose} onClick={handleSearchClose}></span>}
      </div>
      <div className={`${styles.suggestionsContainer} ${showSuggestionDropDown ? styles.active : ""}`} ref={suggestionRef}>
        {Array.isArray(suggestions) && suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={index}
            id={suggestion.id}
            text={suggestion.name || suggestion}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchInput;
