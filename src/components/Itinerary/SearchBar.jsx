import React, { useState, useRef, useEffect } from "react";
import styles from "./SearchBar.module.css";
import SearchInput from "../common/SearchInput";
import { useTranslation } from 'react-i18next';

const SearchBar = ({state , setState, cities, count}) => {

  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);
  const suggestionRef = useRef(null);

  const { t } = useTranslation("ItineraryPage");

  const handleSearch = (value) => {
    updateState("destinationSearchQuery", value);

  };

  const handleSearchClose = (e) => {
    e.stopPropagation();
    updateState("destinationSearchQuery", "");
    updateState("selectedDestinationId", null);
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
      if (key === "selectedDestinationId" && value) {
        setState((prev) => ({ ...prev, "destinationSearchQuery" : ""}));
      }
    
      setShowSuggestionDropDown(false);
    };

  return (
    <section className={styles.banner}>
      <div className={styles.bannerContent}>
      <h1 className={styles.title}>{t('itinerary.title', { count: count })}</h1>
      <div className={styles.itenarySearchWrapper}>
        <span className={styles.searchLabel}>{t('itinerary.searchLabel')}</span>
        <div className={styles.searchContainer}>
          <SearchInput
            handleSearchClick={() => setShowSuggestionDropDown(true)}
            suggestionRef={suggestionRef}
            handleSearch={handleSearch}
            showSuggestionDropDown={showSuggestionDropDown}
            handleSearchClose={handleSearchClose}
            searchValue={state.destinationSearchQuery}
            suggestionsList={cities}
            placeholder={t('itinerary.searchPlaceholder')}
            onSelect={(value) => updateState("selectedDestinationId", value)}
            customClassName="placesSearchInputContainer"
            selectedValue={state.selectedDestinationId}
             customClassNameForSuggestions="suggestionsContainerSm"
          />
          {/* <div className={styles.searchInput}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c94fcaf591be0223923a2bc7ad1c4674340cfa8c?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt=""
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Busca un destino"
              aria-label="Busca un destino"
            />
          </div> */}
        </div>
      </div>
      
        
      </div>
    
    </section>
  );
};

export default SearchBar;
