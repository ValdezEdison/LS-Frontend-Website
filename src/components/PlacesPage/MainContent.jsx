import React, { useState, useRef, useEffect } from "react";
import PlaceCard from "./PlaceCard";
import styles from "./MainContent.module.css";
import SearchBar from "../common/SearchBar";
import LoginBanner from "./LoginBanner";
import RecommendedPlaces from "./RecommendedPlaces";
import FilterBar from "./FilterBar";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import SearchInput from "../common/SearchInput";
import styles2 from "../common/SearchBar.module.css";

const MainContent = ({ state, setState, countries, cities }) => {
  const { t } = useTranslation('Places');
  const { places, loading: placesLoading, error: placesError, next, count } = useSelector((state) => state.places);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const suggestionRef = useRef(null);

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setShowSuggestionDropDown(false);
  };

  const handleSearch = (value) => {
    updateState("destinationSearchQuery", value);
   
  };

  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);


  const handleSearchClose = () => {
    updateState("destinationSearchQuery", "");
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

  return (
    <main className={styles.mainContent}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('availablePlaces', { count })}</h1>
        <div className={styles2.searchContainer}>
        <SearchInput
          handleSearchClick={() => setShowSuggestionDropDown(true)}
          suggestionRef={suggestionRef}
          handleSearch={handleSearch}
          showSuggestionDropDown={showSuggestionDropDown}
          handleSearchClose={handleSearchClose}
          searchValue={state.destinationSearchQuery}
          suggestionsList={cities}
          placeholder={t("search.placeholder")}
          onSelect={(value) => updateState("selectedDestinationId", value)}
        />
        </div>
      </div>
      <FilterBar
        state={state} setState={setState}
        countries={countries}
        cities={cities} // Pass cities data to FilterBar
        updateState={updateState}
      />
      {!isAuthenticated && <LoginBanner />}
      <div className={styles.placesList}>
        {places?.map((place, index) => (
          <PlaceCard key={index} place={place} />
        ))}
      </div>
      {next && <button className={styles.showMoreButton}>{t('showMore')}</button>}
      <RecommendedPlaces />
    </main>
  );
};

export default MainContent;