import React, { useState, useRef, useEffect } from "react";
import PlaceCard from "../common/PlaceCard";
import styles from "./MainContent.module.css";
import LoginBanner from "../common/LoginBanner";
import RecommendedPlaces from "./RecommendedPlaces";
// import FilterBar from "./FilterBar";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import SearchInput from "../common/SearchInput";
import styles2 from "../common/MainSearchBar.module.css";
import PlacesSelectedItemList from "./PlacesSelectedItemList";
import SeeMoreButton from "../common/SeeMoreButton";
import useSeeMore from "../../hooks/useSeeMore";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Arrow, PlaceFilter } from "../common/Images";
import styles3 from "../common/PlaceCard.module.css";
import Loader from "../common/Loader";
import FilterBar from "../common/FilterBar";
import styles4 from "../common/FilterBar.module.css";
import SelectedItemList from "../common/SelectedItemList";
import GoToFilterCard from "../common/GoToFilterCard";
import { listUpdater } from "../../features/places/PlaceSlice";
import { Trans } from 'react-i18next';

const MainContent = ({ state, setState, countries, cities, handleActions, handleNavigate, hasFiltersChanged }) => {
  const { t } = useTranslation('Places');
  const { t: tCommon } = useTranslation('Common');
  const { places, loading: placesLoading, error: placesError, next, count, placesSearchResults, categories } = useSelector((state) => state.places);
  const { isFavoriteToggling, favTogglingId } = useSelector((state) => state.favorites);

  const { loading: countriesLoading } = useSelector((state) => state.countries);
  const { loading: citiesLoading } = useSelector((state) => state.cities);

  const { data: visiblePlaces, loading, next: hasNext, loadMore, hasLoadedMore } = useSeeMore(places, next, listUpdater);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.popup);

  const { currentLocation, loading: currentLocationLoading } = useSelector((state) => state.locationSettings);
  const trackingEnabled = currentLocation?.preferences?.geolocation_enabled;
  const isManuallySelected = currentLocation?.preferences?.location_mode === "manual";
  const isCurrentLocationSelected = currentLocation?.preferences?.location_mode === "current";

  const [selectedCityBasedOnLocation, setSelectedCityBasedOnLocation] = useState(null);

  const suggestionRef = useRef(null);
  const placesListRef = useRef(null);
  const mainRef = useRef(null);
  const gotoTopButtonRef = useRef(null);
  const placesListBreakerRef = useRef(null);

  const [showArrow, setShowArrow] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

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
      label: state.selectedCountryName !== "" ? state.selectedCountryName : `${t("filter.select")} ${t("filter.country")}`,
      options: countries,
      selectedId: state.selectedCountryId,
      onSelect: (value) => updateState("selectedCountryId", value),
      onSearch: (query) => updateState("searchQuery", query),
      searchQuery: state.searchQuery,
    },
    {
      label: `${t("filter.select")} ${t("filter.destination")}`,
      options: citiesLoading ? [] : cities,
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
      label:state.selectedOrder !== "" ? orderOptions[state.selectedOrder]?.name : `${t("filter.select")} ${t("filter.sortBy")}`,
      options: orderOptions,
      selectedId: state.selectedOrder,
      onSelect: (value) => updateState("selectedOrder", value),
    },
  ];

  const handleSearch = (value) => {
    updateState("keyword", value);

  };

  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);


  const handleSearchClose = (e) => {
    e.stopPropagation();
    updateState("keyword", "");
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

  const handleViewMoreDetails = (e, id) => {
    handleActions(e, 'viewMore', id);
    // navigate('/places/details', { state: { id } });
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


  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  }


  const handleActionFilter = () => {
    scrollToTop();
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  useEffect(() => {

    if(isManuallySelected && trackingEnabled && isAuthenticated) {
      const selectedCity = cities.find(
        (city) => city.latitude === currentLocation.preferences?.last_known_latitude &&
          city.longitude === currentLocation.preferences?.last_known_longitude
      )

      if (selectedCity) {
        setSelectedCityBasedOnLocation(selectedCity.name);
      }
    }
    
  }, [currentLocation, trackingEnabled]);


  const onSearch = (e) => {
    handleActions(e, 'search', "");
  }


  return (
    <main className={styles.mainContent} ref={mainRef}>
      <div className={styles.header}>
        <h1 className={styles.title}>{ count !== null && count > 0 ? t('availablePlaces', { count }) : ""}</h1>
        <div className={styles2.searchContainer}>
          <SearchInput
            handleSearchClick={() => setShowSuggestionDropDown(true)}
            suggestionRef={suggestionRef}
            handleSearch={handleSearch}
            showSuggestionDropDown={showSuggestionDropDown}
            handleSearchClose={handleSearchClose}
            searchValue={state.keyword}
            suggestionsList={placesSearchResults}
            placeholder={t("search.placeholder")}
            onSelect={handleNavigate}
            customClassName="placesSearchInputContainer"
            selectedValue={state.selectedDestinationId}
          />
        </div>
      </div>
      <div className={styles4.placesFilterContainer}>
        <FilterBar
          filters={filters}
          isLoading={citiesLoading || countriesLoading}
          onSearch={onSearch}
        />
      </div>
      {!isAuthenticated && <LoginBanner handleNavigateToLogin={handleNavigateToLogin} styles={styles} />}
      <div className={styles.placesSelectedItemsList}>
        {/* <PlacesSelectedItemList
          state={state}
          setState={setState}
          countries={countries}
          cities={cities}
          styles={styles}
          translate={t}
        /> */}
        <SelectedItemList
          state={state}
          setState={setState}
          categories={categories}
          countries={countries}
          cities={cities}
          translate={t}
          type="places"
          onSearch={onSearch}
        />
      </div>
      <div className={styles.placesList} ref={placesListRef}>
        <button
          style={{
            display: showArrow && !isOpen && !loading && visiblePlaces.length > 0 && hasLoadedMore ? 'block' : 'none'
          }}

          className={styles3.gotoTopButton}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          ref={gotoTopButtonRef}
        >
          <img src={Arrow} alt="arrow" />
        </button>
        {visiblePlaces?.length > 0 ? (
          visiblePlaces?.map((place, index) => {
            // Render the place card
            const placeCard = (
              <PlaceCard
                key={index}
                place={place}
                translate={t}
                isAuthenticated={isAuthenticated}
                handleViewMoreDetails={handleViewMoreDetails}
                handleActions={handleActions}
                isFavoriteToggling={isFavoriteToggling && favTogglingId === place.id}
              />
            );

            // Check if we need to render the banner after this item
            if ((index + 1) % 10 === 0 && index !== visiblePlaces.length - 1) {
              return (
                <>
                  {placeCard}
                  <GoToFilterCard index={index} handleActionFilter={handleActionFilter} />
                </>
              );
            }

            return placeCard;
          })
        ) : (
          currentLocation && trackingEnabled ? (
            isManuallySelected ? (
              <div className="no-results-wrapper">    <Trans
              i18nKey="Places:noResultsBasedOnManualLocation"
              values={{ city: selectedCityBasedOnLocation }}
              components={{
                changeLocation: <Link to="/profile/location" className="text-link" />,
                disableLocation: <Link to="/profile/location" className="text-link" />
              }}
            /></div>
            ) : isCurrentLocationSelected ? (
              <div className="no-results-wrapper"><Trans
              i18nKey="Places:noResultsBasedOnCurrentLocation"
              components={{
                changeLocation: <Link to="/profile/location" className="text-link" />,
                disableLocation: <Link to="/profile/location" className="text-link" />
              }}
            /></div>
            ) : (
              <div className="no-results-wrapper">{tCommon('noResult')}</div>
            )
          ) : (
            <div className="no-results-wrapper">{tCommon('noResult')}</div>
          )
        )}

    
      </div>

      {loading ? <Loader /> : next && isAuthenticated && <SeeMoreButton
          onClick={loadMore}
          loading={loading}
          next={hasNext}
          translate={t}
        />}
        {!isAuthenticated && next &&
          <div className={styles.loginButtonWrapper}>
            <button className={styles.loginButton} onClick={handleNavigateToLogin}>{tCommon('logInButton')}</button>
          </div>
        }


      <div className={styles.placesListbreaker} ref={placesListBreakerRef}></div>
      {/* <RecommendedPlaces /> */}
    </main>
  );
};

export default MainContent;