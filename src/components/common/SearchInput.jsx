import React, { useState } from "react";
import styles from "./SearchInput.module.css";
import SuggestionItem from "./SuggestionItem";
import { SearchBlack } from "../common/Images";
import { useTranslation } from "react-i18next";
import CustomInput from "./CustomInput";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";

const SearchInput = ({ handleSearchClick, showRegionDropDown, suggestionRef, handleSearch, showSuggestionDropDown, handleSearchClose, searchValue, placeholder, suggestionsList, onSelect, customClassName = "", selectedValue = "", customClassNameForSuggestions = "" }) => {
  const [defaultSuggestions] = useState([

  ]);

  const { t } = useTranslation("SearchInput");
  const inputPlaceholder = placeholder || t("placeholder");
  const { loading: citiesLoading } = useSelector((state) => state.cities);
  const {loading: placesSearchResultsLoading} = useSelector((state) => state.places);

  const loading = placesSearchResultsLoading ? placesSearchResultsLoading : citiesLoading;

  const suggestions = Array.isArray(suggestionsList) && suggestionsList.length > 0 ? suggestionsList : defaultSuggestions;

  const containerClass = customClassName && styles[customClassName] ? styles[customClassName] : "";

  const suggestionsContainerClass = customClassNameForSuggestions && styles[customClassNameForSuggestions] ? styles[customClassNameForSuggestions] : "";

  const location = useLocation();
  const isPlacesPage = location.pathname === "/places";
  const isEventsPage = location.pathname === "/events";

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
          {loading ? <Loader /> :
            Array.isArray(suggestions) && suggestions.length > 0 ? (
              // Render suggestions if available
              <div className={`suggestion-${isPlacesPage ? "places" : isEventsPage ? "events" : "places"}`}>
              {suggestions.map((suggestion, index) => (
                <SuggestionItem
                  key={index}
                  id={suggestion.id}
                  text={suggestion?.title || `${suggestion.name}${suggestion?.country?.name ? ', ' + suggestion.country.name : ''}`}
                  onSelect={onSelect}
                />
              ))}
              </div>
            ) : (
              // Show "No results" message if no suggestions are found
              <div className={styles.filterNoResults}>{t("noResults")}</div>
            )
          }
        </div>

      </div>
    </div>
  );
};

export default SearchInput;
