import React, { useState, useRef, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { Filter } from "./Images";
import SearchInput from "./SearchInput";
import CustomInput from "./CustomInput";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const EventSearch = ({togglePopup, handleSearch, state, setState, handleNavigate}) => {

  const location = useLocation();
  const isFavorites = location.pathname.includes('favorites')

  const { t: tPlaces } = useTranslation('Places');

   const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);
    const suggestionRef = useRef(null);
  const { eventsSearchResults } = useSelector((state) => state.events);

    const handleSearchForEvents = (value) => {
      updateState("keyword", value);
  
    };

    const handleSearchClose = (e) => {
      e.stopPropagation();
      updateState("keyword", "");
      setShowSuggestionDropDown(false);
    };


    const handleClickOutside = (event) => {
    
        // Check if the click is outside both the SearchInput and the dropdown
        if (
          suggestionRef.current &&
          !suggestionRef.current.contains(event.target)
    
        ) {
          setShowSuggestionDropDown(false); // Close the dropdown
        }
      };
    
      useEffect(() => {
        // Add event listener when the dropdown is shown
        if (showSuggestionDropDown) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        // Cleanup the event listener on component unmount
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [showSuggestionDropDown]);

      const updateState = (key, value) => {
        setState((prev) => ({ ...prev, [key]: value }));
      
      };


  const { t } = useTranslation("Common");
  return (
    <div className={styles.eventSearch}>
      {isFavorites ?
          <form className={styles.searchBar} onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="searchInput" className={styles.visuallyHidden}>
            {t('search.label')}
            </label>
            <img
                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/23adcc496c13e14503025c9ac82cf17842b7cfed?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                alt=""
                className={styles.searchIcon}
              />
           <CustomInput
              type="text"
              placeholder={t("events.searchPlaceholder")}
              className={styles.searchInput}
              aria-label={t("events.searchPlaceholder")}
              value={state.keyword}
              onChange={(e) => handleSearch(e)}
            />
            {/* <button type="submit" className={styles.searchButton} aria-label={t('search.buttonAriaLabel')}>
            </button> */}
          </form>
      :
      <div className={styles.searchContainer}>
        <h2 className={styles.searchTitle}>{t('events.searchTitle')}</h2>
        {/* <form className={styles.searchForm}>
          <div className={styles.inputWrapper}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c60a664a23f01dbed983b94542acfa8a942029c1?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt=""
              className={styles.searchIcon}
            />
            <CustomInput
              type="text"
              placeholder={t("events.searchPlaceholder")}
              className={styles.searchInput}
              aria-label={t("events.searchPlaceholder")}
              value={state.keyword}
              onChange={(e) => handleSearch(e)}
            />
           {state.keyword && <span className={styles.searchClose} onClick={() => setState({...state, keyword: ''})}></span>}
          </div>
        </form> */}
            <SearchInput
            handleSearchClick={() => setShowSuggestionDropDown(true)}
            suggestionRef={suggestionRef}
            handleSearch={handleSearchForEvents}
            showSuggestionDropDown={showSuggestionDropDown}
            handleSearchClose={handleSearchClose}
            searchValue={state.keyword}
            suggestionsList={eventsSearchResults}
            placeholder={tPlaces("search.placeholder")}
            onSelect={handleNavigate}
            customClassName="eventsSearchInputContainer"
            selectedValue={""}
             customClassNameForSuggestions="suggestionsContainerSm"
          />
      </div>
      }
      <div className={styles.actionButtons}>
       {!isFavorites &&  <button className={styles.mapButton} onClick={() => togglePopup('map', true)}>{t("seeMap")}</button>}
        <button className={styles.filterButton} onClick={() => togglePopup('filterPanel', true)}>{t("filters")} <img src={Filter}/></button>
      </div>
    </div>
  );
};

export default EventSearch;
