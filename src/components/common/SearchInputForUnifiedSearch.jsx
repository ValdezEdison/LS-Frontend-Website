import React, { useState } from "react";
import styles from "./SearchInput.module.css";
import SuggestionItem from "./SuggestionItem";
import { SearchBlack } from "./Images";
import { useTranslation } from "react-i18next";
import CustomInput from "./CustomInput";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const SearchInput = ({ handleSearchClick, showRegionDropDown, suggestionRef, handleSearch, showSuggestionDropDown, handleSearchClose, searchValue, placeholder, suggestionsList, onSelect, customClassName = "", selectedValue = "", customClassNameForSuggestions = "" }) => {
  const [defaultSuggestions] = useState([

  ]);
  const { t } = useTranslation("SearchInput");
  const inputPlaceholder = placeholder || t("placeholder");
  const { loading } = useSelector((state) => state.unifiedSearch);

  const suggestions = Array.isArray(suggestionsList) && suggestionsList.length > 0 ? suggestionsList : defaultSuggestions;

    // Group suggestions by type
    const groupedSuggestions = suggestionsList ? {
      places: suggestionsList.places || [],
      events: suggestionsList.events || [],
      cities: suggestionsList.cities || [],
      countries: suggestionsList.countries || [],
      neighborhoods: suggestionsList.neighborhoods || [],
      regions: suggestionsList.regions || []
    } : {};
  
    const hasResults = Object.values(groupedSuggestions).some(
      group => group.length > 0
    );


  const containerClass = customClassName && styles[customClassName] ? styles[customClassName] : "";

  const suggestionsContainerClass = customClassNameForSuggestions && styles[customClassNameForSuggestions] ? styles[customClassNameForSuggestions] : "";

  return (
    <div className={`${containerClass}`}>
      <div className={`${styles.searchBar} ${showRegionDropDown || showSuggestionDropDown ? styles.open : ""}`} onClick={handleSearchClick}>
        <img loading="lazy" src={SearchBlack} className={styles.searchIcon} alt="" />
        <CustomInput
          type="text"
          className={styles.searchInput}
          placeholder={inputPlaceholder}
          aria-label={t("ariaLabel")}
          onChange={(e) => handleSearch(e.target.value)}
          value={selectedValue ? suggestions.find((suggestion) => suggestion.id === selectedValue)?.name : searchValue}
        />
        {(searchValue?.length > 0 || selectedValue) && (
          <span className={styles.searchClose} onClick={handleSearchClose}></span>
        )}      </div>
      <div className={`${styles.suggestionsContainer} ${showSuggestionDropDown ? styles.active : ""} ${styles.suggestionsContainerClass}`} ref={suggestionRef}>
        {/* {Array.isArray(suggestions) && suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={index}
            id={suggestion.id}
            text={suggestion.name || suggestion}
            onSelect={onSelect}
          />
        ))} */}
        <div className={styles.suggestionsContainerInner}>
        {loading ? (
          <Loader />
        ) : hasResults ? (
          Object.entries(groupedSuggestions)
            .filter(([_, suggestions]) => suggestions.length > 0)
            .map(([type, suggestions]) => (
              <div key={type}>
                <h4 className={styles.suggestionType}>{t(type)}</h4>
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem
                    key={index}
                    id={suggestion.id}
                    text={suggestion?.name || suggestion?.title || ""}
                    onSelect={onSelect}
                    type={suggestion?.type || ""}
                    isUnified={true}
                  />
                ))}
              </div>
            ))
        ) : (
          <p>{t("noResults")}</p>
        )}
        </div>

      </div>
    </div>
  );
};

export default SearchInput;
