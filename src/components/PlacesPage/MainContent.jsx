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
import PlacesSelectedItemList from "./PlacesSelectedItemList";
import SeeMoreButton from "../common/SeeMoreButton";
import useSeeMore from "../../hooks/useSeeMore";
import { useNavigate } from "react-router-dom";

const MainContent = ({ state, setState, countries, cities }) => {
  const { t } = useTranslation('Places');
  const { places, loading: placesLoading, error: placesError, next, count } = useSelector((state) => state.places);

  const { data: visiblePlaces, loading, next: hasNext, loadMore } = useSeeMore(places, next);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const suggestionRef = useRef(null);
  const placesListRef = useRef(null);

  const navigate = useNavigate();

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
    if (key === "selectedCountryId" && value) {
      setState((prev) => ({ ...prev, "selectedCountryName": countries.find((country) => country.id === value).name }));
    }
    // setShowSuggestionDropDown(false);
  };

  const handleSearch = (value) => {
    updateState("destinationSearchQuery", value);

  };

  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);


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

  const handleViewMoreDetails = (id) => {
    console.log(id, 'handleViewMoreDetails');
    navigate('/places/details', { state: { id } });
  };

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
            customClassName="placesSearchInputContainer"
            selectedValue={state.selectedDestinationId}
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
      <PlacesSelectedItemList
        state={state}
        setState={setState}
        countries={countries}
        cities={cities}
        styles={styles}
        translate={t}
      />
      <div className={styles.placesList}>
        {visiblePlaces?.map((place, index) => (
          <PlaceCard key={index} place={place} translate={t} isAuthenticated={isAuthenticated} handleViewMoreDetails={handleViewMoreDetails} />
        ))}
      </div>

      <SeeMoreButton
        onClick={loadMore}
        loading={loading}
        next={hasNext}
        translate={t}
      />

      <RecommendedPlaces />
    </main>
  );
};

export default MainContent;