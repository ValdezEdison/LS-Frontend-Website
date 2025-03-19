import React, { useState, useRef, useEffect } from "react";
import PlaceCard from "./PlaceCard";
import styles from "./MainContent.module.css";
import SearchBar from "../common/SearchBar";
import LoginBanner from "./LoginBanner";
import RecommendedPlaces from "./RecommendedPlaces";
// import FilterBar from "./FilterBar";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import SearchInput from "../common/SearchInput";
import styles2 from "../common/SearchBar.module.css";
import PlacesSelectedItemList from "./PlacesSelectedItemList";
import SeeMoreButton from "../common/SeeMoreButton";
import useSeeMore from "../../hooks/useSeeMore";
import { useNavigate } from "react-router-dom";
import { Arrow } from "../common/Images";
import styles3 from "./PlaceCard.module.css";
import Loader from "../common/Loader";
import FilterBar from "../common/FilterBar";

const MainContent = ({ state, setState, countries, cities }) => {
  const { t } = useTranslation('Places');
  const { places, loading: placesLoading, error: placesError, next, count } = useSelector((state) => state.places);

  const { loading: countriesLoading } = useSelector((state) => state.countries);
  const { loading: citiesLoading } = useSelector((state) => state.cities);

  const { data: visiblePlaces, loading, next: hasNext, loadMore } = useSeeMore(places, next);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.popup);

  const suggestionRef = useRef(null);
  const placesListRef = useRef(null);
  const mainRef = useRef(null);
  const gotoTopButtonRef = useRef(null);
  const placesListBreakerRef = useRef(null);

  const [showArrow, setShowArrow] = useState(true);

  const navigate = useNavigate();

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
    if (key === "selectedCountryId" && value) {
      setState((prev) => ({ ...prev, "selectedCountryName": countries.find((country) => country.id === value).name }));
    }
    // setShowSuggestionDropDown(false);
  };
  
  const orderOptions = t("filter.orderOptions", { returnObjects: true }).map((option, index) => ({
    id: index,
    name: option,
  }));


  const filters = [
    {
      label: `${t("filter.select")} ${t("filter.country")}`,
      options: countries,
      selectedId: state.selectedCountryId,
      onSelect: (value) => updateState("selectedCountryId", value),
      onSearch: (query) => updateState("searchQuery", query),
      searchQuery: state.searchQuery,
    },
    {
      label: `${t("filter.select")} ${t("filter.destination")}`,
      options: cities,
      selectedId: state.selectedDestinations,
      onSelect: (value) =>
        setState((prevState) => ({
          ...prevState,
          selectedDestinations: value,
          selectedDestinationId: null,
        })),
      onSearch: (query) => updateState("destinationSearchQuery", query),
      searchQuery: state.destinationSearchQuery,
      disabled: !state.selectedCountryId,
      checkbox: true,
    },
    {
      label: `${t("filter.select")} ${t("filter.sortBy")}`,
      options: orderOptions,
      selectedId: state.selectedOrder,
      onSelect: (value) => updateState("selectedOrder", value),
    },
  ];

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

  const getResponsiveOffset = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) return -20; // Smaller tablets
    if (screenWidth <= 1160) return -5; // Small screens
    if (screenWidth <= 1280) return 0; // Slightly larger screens
    if (screenWidth <= 1350) return 10;   // Medium screens

    return 30;                           // Large screens
  };

  const updateButtonPosition = () => {
    if (placesListRef.current && mainRef.current && gotoTopButtonRef.current) {
      const mainWrapperLeftPosition = mainRef.current.getBoundingClientRect().left;

      const leftPosition = placesListRef.current.getBoundingClientRect().left;
      const placesListWidth = placesListRef.current.offsetWidth;
      const final = leftPosition + placesListWidth;
      const offset = getResponsiveOffset();

      if (final) {
        gotoTopButtonRef.current.style.left = `${final + offset}px`;
      }

    }
  };

  useEffect(() => {
    // Initial position calculation
    updateButtonPosition();

    // Handle resize event
    window.addEventListener('resize', updateButtonPosition);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', updateButtonPosition);
    };
  }, []);


  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const arrowButton = gotoTopButtonRef.current?.getBoundingClientRect();
      const breaker = placesListBreakerRef.current?.getBoundingClientRect();

      if (arrowButton && breaker) {
        if (
          arrowButton.bottom >= breaker.top &&
          window.scrollY > lastScrollY
        ) {
          // Scrolling down and elements meet — hide the arrow
          setShowArrow(false);
        } else if (
          breaker.top > window.innerHeight &&
          window.scrollY < lastScrollY
        ) {
          // Scrolling up and passed the breaker — show the arrow
          setShowArrow(true);
        }
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);






  return (
    <main className={styles.mainContent} ref={mainRef}>
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
      filters={filters}
      isLoading={citiesLoading || countriesLoading}
    />
      {!isAuthenticated && <LoginBanner />}
      <div className={styles.placesSelectedItemsList}>
        <PlacesSelectedItemList
          state={state}
          setState={setState}
          countries={countries}
          cities={cities}
          styles={styles}
          translate={t}
        />
      </div>
      <div className={styles.placesList} ref={placesListRef}>
        <button
          style={{
            display: showArrow && !isOpen && !loading && visiblePlaces.length > 0 ? 'block' : 'none'
          }}

          className={styles3.gotoTopButton}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          ref={gotoTopButtonRef}
        >
          <img src={Arrow} alt="arrow" />
        </button>
        {visiblePlaces?.map((place, index) => (
          <PlaceCard key={index} place={place} translate={t} isAuthenticated={isAuthenticated} handleViewMoreDetails={handleViewMoreDetails} />
        ))}
      </div>

      {loading ? <Loader /> : <SeeMoreButton
        onClick={loadMore}
        loading={loading}
        next={hasNext}
        translate={t}
      />
      }

      <div className={styles.placesListbreaker} ref={placesListBreakerRef}></div>
      <RecommendedPlaces />
    </main>
  );
};

export default MainContent;