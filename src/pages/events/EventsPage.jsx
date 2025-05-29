import React, { useState, useEffect, useContext, useMemo, useRef, useCallback } from "react";
import Header from "../../components/layouts/Header";
import EventSearch from "../../components/common/SearchBar";
import LoginBanner from "../../components/common/LoginBanner";
import EventList from "../../components/EventsPage/EventList";
import PopularEvents from "../../components/EventsPage/PopularEvents";
import AppPromotion from "../../components/EventsPage/AppPromotion";
import Newsletter from "../../components/common/Newsletter";
import Footer from "../../components/layouts/Footer";
import styles from "./EventsPage.module.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles1 from "../../components/PlacesPage/MainContent.module.css";
import PromotionalBanner from "../../components/common/PromotionalBanner";
import { fetchEvents, fetchNearMeEvents, fetchEventsSearchResults } from "../../features/events/EventAction";
import { useDispatch, useSelector } from "react-redux";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import useSeeMore from "../../hooks/useSeeMore";
import Loader from "../../components/common/Loader";
import { useTranslation, Trans } from 'react-i18next';
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import AlertPopup from "../../components/popup/Alert/AlertPopup";
import Modal from "../../components/modal/Modal";
import { fetchPlacesFilterCategories } from "../../features/places/PlaceAction";
import { toggleFavorite } from "../../features/favorites/FavoritesAction";
import { setFavTogglingId } from "../../features/favorites/FavoritesSlice";
import { LanguageContext } from "../../context/LanguageContext";
import MapPopup from "../../components/common/MapPopup";
import { fetchGeoLocations } from "../../features/places/PlaceAction";
import FilterPanel from "../../components/popup/FilterPanel/FilterPanel";
import { useAddTrip } from "../../hooks/useAddTrip";
import AddToTripPopup from "../../components/popup/AddToTrip/AddToTripPopup";
import AddTripPopup from "../../components/popup/AddToTrip/AddTripPopup";
import SuccessMessagePopup from "../../components/popup/SuccessMessage/SuccessMessagePopup";
import { fetchTravelLiteList } from "../../features/places/placesInfo/itinerary/ItineraryAction";
import { fetchCities } from "../../features/common/cities/CityAction";
import { debounce, sortBy } from "lodash";
import { fetchBannerBlocks } from "../../features/cms/Blocks/BlocksAction";
import { listUpdater } from "../../features/events/EventSlice";
import { fetchSuggestedPlaces } from "../../features/suggestions/SuggestionAction";
import Widget from "../../components/common/Widget";
import { WidgetSkeleton } from "../../components/skeleton/common/WidgetSkeleton";
import { resetGeoLocations } from "../../features/places/PlaceSlice";

const EventsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { language, languageId } = useContext(LanguageContext);
  const { t } = useTranslation('Places');
  const { t: tEventsPage } = useTranslation('EventsPage');
  const { t: tCommon } = useTranslation('Common');
  const isInitialMount = useRef(true);

  // Selectors
  const { loading: eventLoading, error, next, count, events } = useSelector((state) => state.events);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: visibleEvents, loading, next: hasNext, loadMore } = useSeeMore(events, next, listUpdater);
  const { isOpen } = useSelector((state) => state.popup);
  const { cities } = useSelector((state) => state.cities);
  const { loading: placesFilterCategoriesLoading, categories } = useSelector((state) => state.places);
  const {
    bannerBlocks, bannerLoading
  } = useSelector((state) => state.cms.blocks);

  const { currentLocation, loading: currentLocationLoading } = useSelector((state) => state.locationSettings);
 
  const trackingEnabled = currentLocation?.preferences?.geolocation_enabled;

  const { suggestedPlaces, loading: suggestedPlacesLoading } = useSelector((state) => state.suggestions);

    const isManuallySelected = currentLocation?.preferences?.location_mode === "manual";
    const isCurrentLocationSelected = currentLocation?.preferences?.location_mode === "current";
  
    const [selectedCityBasedOnLocation, setSelectedCityBasedOnLocation] = useState(null);

  // Add trip functionality
  const {
    tripState,
    formState,
    formErrors,
    citiesSearchResults,
    isSearchingCities,
    activeDestinationIndex,
    successData,
    isAddToPopupOpen,
    travelLiteList,
    tripPopupState,
    setTripPopupState,
    setFormState,
    setTripState,
    setFormErrors,
    handleTripClick,
    handleSubmitTrip,
    handleSubmit,
    updateDestination,
    setActiveDestinationIndex,
    debouncedFetchCitiesForAddTrip,
    openAddTripPopup,
    closeAddTripPopup,
    closeSuccessMessage,
    closeAddToTrip
  } = useAddTrip();

  // Page state
  const [state, setState] = useState({
    selectedLevel: "",
    selectedCategory: "",
    selectedSubcategory: "",
    selectedDateRange: { startDate: null, endDate: null },
    page: 1,
    type: "event",
    selectedDestinationId: null,
    selectedDestinationId: null,
    destinationSearchQuery: "",
    startDate: null,
    endDate: null,
    keyword: "",
    selectedOrder: ""
  });

  const [popupState, setPopupState] = useState({
    map: false,
    gallery: false,
    reviewDrawer: false,
    alert: false,
    comment: false,
    deleteConfirm: false,
    filterPanel: false
  });

  function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  // Fetch events and locations
  useEffect(() => {
    if(!currentLocationLoading){
      
      if(currentLocation && trackingEnabled && isAuthenticated) {
        dispatch(fetchNearMeEvents({ page: state.page, latitude: currentLocation.preferences?.last_known_latitude, longitude: currentLocation.preferences?.last_known_longitude, type: state.type }));
        dispatch(fetchSuggestedPlaces({ page: state.page, latitude: currentLocation.preferences?.last_known_latitude, longitude: currentLocation.preferences?.last_known_longitude, type: state.type }));
        
      }else{
        dispatch(fetchEvents({ type: state.type, page: state.page }));
        dispatch(fetchSuggestedPlaces({ page: state.page, type: state.type }));
      }
    }
    dispatch(fetchGeoLocations({ type: state.type }));
    dispatch(fetchPlacesFilterCategories({ page: state.page, type: state.type, cityId: state.selectedDestinationId }));
    if (isAuthenticated) {
      dispatch(fetchTravelLiteList());
    }
    dispatch(fetchCities({}));
    dispatch(fetchBannerBlocks(languageId));
    return () => {
      dispatch(closePopup());
      closeAddToTrip()
      // setState({
      //   selectedLevel: "",
      //   selectedCategory: "", 
      //   selectedSubcategory: "",
      //   selectedDateRange: { startDate: null, endDate: null },  
      //   page: 1,
      //   type: "event",
      //   selectedCityId: null,
      //   selectedDestinationId: null,
      //   destinationSearchQuery: "",
      //   startDate: null,
      //   endDate: null
      // });
    }
  }, [dispatch, language, currentLocation]);

  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleActions = (e, action, id, name) => {
    
    e.stopPropagation();
    switch (action) {
      case 'addToFavorites':
        handleFavClick(e, id);
        break;
      case 'addToTrip':
        handleAddToTripClick(e, id, name);
        const selectedEvent = events.find((event) => event.id === id);
        const firstCity = selectedEvent?.cities?.[0] || selectedEvent?.city || {};
        setFormState(prev => ({ ...prev, type: "event", destinations: [{
          destinationSearchQuery: '',
          destinationId: firstCity.id || null,
          destinationName: firstCity.name || ''
        }]}));
        break;
      case 'viewMore':
        handleViewMoreDetails(e, id);
        break;
      case 'addToStop':
        setFormState(prev => ({
          ...prev,
          stops: [...prev.stops, id]
        }));
        break;
      default:
        break;
    }
  };

  const handleAddToTripClick = (e, id, name) => {
    const result = handleTripClick(e, id, name);
    if (result?.needsAuth) {
      setAlertTitle(tCommon('authAlert.favorites.title'));
      setAlertMessage(tCommon('authAlert.favorites.description'));
      togglePopup("alert", true);
    }
  };

  const handleFavClick = (e, id) => {
    e.stopPropagation();
    if (isAuthenticated) {
      dispatch(toggleFavorite(id));
      dispatch(setFavTogglingId(id));
    } else {
      togglePopup("alert", true);
    }
  };

  const handleViewMoreDetails = (e, id) => {

    if (isAuthenticated) {
      navigate('/events/details', { state: { id } });
    } else {
      togglePopup("alert", true);
      setAlertTitle(tCommon('authAlert.viewDetails.title'));
      setAlertMessage(tCommon('authAlert.viewDetails.description'));
    }
  };

  // Modal props
  const modalSearchProps = {
    activeDestinationIndex,
    setActiveDestinationIndex,
    citiesSearchResults,
    isSearchingCities,
    updateDestination
  };

  const debouncedSearch = useMemo(
    () => debounce((query) => {
      if (query.trim() !== "") {
        dispatch(fetchCities({ searchQuery: query }));
      } else {
        // Clear results when query is empty
        dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
      }
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(state.destinationSearchQuery);

    // Cleanup function to cancel debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [state.destinationSearchQuery, debouncedSearch]);



  useEffect(() => {
    if (state.selectedDestinationId) {
      dispatch(fetchPlacesFilterCategories({ page: state.page, type: state.type, cityId: state.selectedDestinationId }));
    }

  }, [state.selectedDestinationId]);

  const onApplyFilters = () => {
    

    const params = {
      type: state.type,
      page: state.page,
      cityId: state.selectedDestinationId,
      categories: state.selectedCategory,
      subcategories: state.selectedSubcategory,
      levels: state.selectedLevel,
      sortBy: state.selectedOrder,
      latitude: currentLocation?.preferences?.last_known_latitude,
      longitude: currentLocation?.preferences?.last_known_longitude
    };

    // Only add startDate if it exists
    if (state.startDate) {
      params.startDate = formatLocalDate(state.startDate);
    }

    // Only add endDate if it exists
    if (state.endDate) {
      params.endDate = formatLocalDate(state.endDate); // state.endDate.toISOString().split('T')[0];
    }
    if(isAuthenticated && currentLocation && trackingEnabled) {
      dispatch(fetchNearMeEvents(params));

    }else {
      dispatch(fetchEvents(params));
    }
    
    dispatch(closePopup());
    togglePopup("filterPanel", false);
  }

  useEffect(() => {
    if (popupState.filterPanel || tripPopupState.addTripPopup || isAddToPopupOpen) {
      document.body.classList.add('overflowHide');
    } else {
      document.body.classList.remove('overflowHide');
    }

    // Cleanup: Remove class when component unmounts
    return () => {
      document.body.classList.remove('overflowHide');
    };
  }, [popupState.filterPanel, tripPopupState.addTripPopup, isAddToPopupOpen]);



  useEffect(() => {

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    const debounceTimer = setTimeout(() => {
      const params = {
        type: state.type,
        page: 1, // Reset to first page when searching
        keyword: state.keyword,
        cityId: state.selectedDestinationId,
        categories: state.selectedCategory,
        subcategories: state.selectedSubcategory,
        levels: state.selectedLevel,
        latitude: currentLocation?.preferences?.last_known_latitude,
        longitude: currentLocation?.preferences?.last_known_longitude
      };

      if (state.startDate) {
        params.startDate = formatLocalDate(state.startDate); // state.startDate.toISOString().split('T')[0];
      }

      if (state.endDate) {
        params.endDate = formatLocalDate(state.endDate); // state.endDate.toISOString().split('T')[0];
      }

      if(isAuthenticated && currentLocation && trackingEnabled) {
        dispatch(fetchNearMeEvents(params));
  
      }else {
        dispatch(fetchEvents(params));
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [
    // state.keyword, // Triggers when search term changes
    dispatch,
  ]);

  /**
   * Handle search input changes. Updates the state with the new search term,
   * which will trigger a debounced search when the user has finished typing.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleSearch = (e) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, keyword: value }));
    // Don't call debouncedSearchEvents here - it will be triggered by the useEffect
  };


  const handleNavActions = (e, id, action) => {
    
    if (isAuthenticated && action === "viewDetail") {
      navigate('/places/details', { state: { id } });
    } else if (action === "viewList") {
      navigate('/places');
    } else {
      togglePopup("alert", true);
      setAlertTitle(tCommon('authAlert.viewDetails.title'));
      setAlertMessage(tCommon('authAlert.viewDetails.description'));
    }
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


    useEffect(() => {
      return () => {
        dispatch(closePopup());
        closeAddToTrip()
        dispatch(resetGeoLocations())
      }
    },[])


    const debouncedEventsSearch = useCallback(
        debounce((keyword) => {
          dispatch(fetchEventsSearchResults({keyword, type: "event"}));
        }, 500),
        [dispatch]
      );
      
      useEffect(() => {
        if (state.keyword && state.keyword.trim() !== "") {
          debouncedEventsSearch(state.keyword);
        } else {
          // Explicit empty search with object format
          dispatch(fetchEventsSearchResults({ keyword: "", type: "event" }));
        }
      
        return () => debouncedEventsSearch.cancel();
    }, [state.keyword, debouncedEventsSearch, dispatch]);


    const handleNavigate = (id) => {

      if(isAuthenticated){
      
        navigate(`/events/details`, { state: { id: id } });

      }else{
        togglePopup("alert", true);
        setAlertTitle(tCommon('authAlert.viewDetails.title'));
        setAlertMessage(tCommon('authAlert.viewDetails.description'));
      }
  
      
    }


    const handleActionFilter = () => {
      togglePopup("filterPanel", true);
    }


  return (
    <>
      {/* Popups and Modals */}
      {isOpen && popupState.alert && (
        <Modal onClose={() => togglePopup("alert", false)} customClass="modalSmTypeOne">
          <AlertPopup
            handleNavigateToLogin={handleNavigateToLogin}
            title={alertTitle}
            description={alertMessage}
            buttonText={tCommon('authAlert.favorites.button')}
          />
        </Modal>
      )}

      {isOpen && popupState.map && (
        <MapPopup
          onClose={() => togglePopup("map", false)}
          state={state}
          setState={setState}
          handleActions={handleActions}
        />
      )}

      {isOpen && popupState.filterPanel && (
        <FilterPanel onClose={() => togglePopup("filterPanel", false)} categories={categories} cities={cities} state={state} setState={setState} onApplyFilters={onApplyFilters} />
      )}

      {isOpen && tripPopupState.addTripPopup && (
        <AddTripPopup
          onClose={closeAddTripPopup}
          travelLiteList={travelLiteList}
          state={tripState}
          setState={setTripState}
          handleSubmitTrip={handleSubmitTrip}
        />
      )}

      {isOpen && isAddToPopupOpen && (
        <AddToTripPopup
          closeModal={() => {
            closeAddToTrip();
          }}
          state={formState}
          setState={setFormState}
          cities={cities}
          onSubmit={handleSubmit}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          {...modalSearchProps}
          handleActions={handleActions}
        />
      )}

      {isOpen && successData.show && (
        <Modal
          title=""
          onClose={closeSuccessMessage}
          customClass="modalSmTypeOne"
          hideCloseButton={true}
        >
          <SuccessMessagePopup
            title={successData.title}
            message={successData.message}
            onClose={closeSuccessMessage}
          />
        </Modal>
      )}

      {/* Main Content */}
      <div className={styles.eventsPage}>
        <Header />
        <main className="page-center">
          <h1 className={styles.eventCount}>{tEventsPage('events.availableEvents', { count })}</h1>
          <EventSearch togglePopup={togglePopup} handleSearch={handleSearch} state={state} setState={setState} handleNavigate={handleNavigate}/>
          {!isAuthenticated && <LoginBanner handleNavigateToLogin={handleNavigateToLogin} styles={styles1} />}
          <h2 className={styles.sectionTitle}>{tEventsPage('events.popularEvents')}</h2>
          <EventList
            events={visibleEvents}
            handleActions={handleActions}
            handleActionFilter={handleActionFilter}
          />
          {visibleEvents?.length === 0 &&
            // <div className="no-results-wrapper">{tCommon("noResults")}</div>
            currentLocation && trackingEnabled ? (
              isManuallySelected ? (
                <div className="no-results-wrapper">  <Trans
                i18nKey="Places:noResultsBasedOnManualLocation"
                values={{ city: selectedCityBasedOnLocation }}
                components={{
                  changeLocation: <Link to="/profile/location" className="text-link" />,
                  disableLocation: <Link to="/profile/location" className="text-link" />
                }}
              /></div>
              ) : isCurrentLocationSelected ? (
                <div className="no-results-wrapper">   <Trans
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
              // <></>
              visibleEvents?.length === 0 &&  <div className="no-results-wrapper">{tCommon('noResult')}</div>
            )
          }

          <div className={styles.showMoreWrapper}>
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
          </div>
          {/* <hr className={styles.divider} /> */}
          {/* <PopularEvents /> */}
          {suggestedPlacesLoading ? (
              <WidgetSkeleton />
            ) : (
              <Widget data={suggestedPlaces} title={tCommon("peopleAlsoSeen")} count={4} handleNavActions={handleNavActions}/>
            )}
          <PromotionalBanner bannerBlocks={bannerBlocks} bannerLoading={bannerLoading} />
        </main>
        {!isAuthenticated && <Newsletter />}
        <Footer />
      </div>
    </>
  );
};

export default EventsPage;