import React, { useState, useEffect, useContext, useMemo } from "react";
import Header from "../../components/layouts/Header";
import EventSearch from "../../components/common/SearchBar";
import LoginBanner from "../../components/common/LoginBanner";
import EventList from "../../components/EventsPage/EventList";
import PopularEvents from "../../components/EventsPage/PopularEvents";
import AppPromotion from "../../components/EventsPage/AppPromotion";
import Newsletter from "../../components/common/Newsletter";
import Footer from "../../components/layouts/Footer";
import styles from "./EventsPage.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import styles1 from "../../components/PlacesPage/MainContent.module.css";
import PromotionalBanner from "../../components/common/PromotionalBanner";
import { fetchEvents } from "../../features/events/EventAction";
import { useDispatch, useSelector } from "react-redux";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import useSeeMore from "../../hooks/useSeeMore";
import Loader from "../../components/common/Loader";
import { useTranslation } from 'react-i18next';
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import AlertPopup from "../../components/popup/Alert/AlertPopup";
import Modal from "../../components/modal/Modal";
import { fetchPlacesFilterCategories } from "../../features/places/PlaceAction";
import { toggleFavorite } from "../../features/favorites/FavoritesAction";
import { setFavTogglingId } from "../../features/events/EventSlice";
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

const EventsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { language, languageId } = useContext(LanguageContext);
  const { t } = useTranslation('places');
  const { t: tEventsPage } = useTranslation('EventsPage');
  const { t: tCommon } = useTranslation('Common');

  // Selectors
  const { loading: eventLoading, error, next, count, events } = useSelector((state) => state.events);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: visibleEvents, loading, next: hasNext, loadMore } = useSeeMore(events, next);
  const { isOpen } = useSelector((state) => state.popup);
  const { cities } = useSelector((state) => state.cities);
  const { loading: placesFilterCategoriesLoading, categories } = useSelector((state) => state.places);
    const {
      bannerBlocks, bannerLoading
    } = useSelector((state) => state.cms.blocks);

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
    selectedCityId: null,
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

  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  // Fetch events and locations
  useEffect(() => {
    dispatch(fetchEvents({ type: state.type, page: state.page }));
    dispatch(fetchGeoLocations({ type: state.type }));
    dispatch(fetchPlacesFilterCategories({ page: state.page, type: state.type, cityId: state.selectedCityId }));
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
  }, [dispatch, language]);

  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleActions = (e, action, id, name) => {
    console.log(action, 'action');
    e.stopPropagation();
    switch (action) {
      case 'addToFavorites':
        handleFavClick(e, id);
        break;
      case 'addToTrip':
        handleAddToTripClick(e, id, name);
        setFormState(prev => ({ ...prev, type: "event" }));
        break;
      case 'viewMore':
        handleViewMoreDetails(e, id);
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
    if (state.selectedCityId) {
      dispatch(fetchPlacesFilterCategories({ page: state.page, type: state.type, cityId: state.selectedCityId }));
    }

  }, [state.selectedCityId]);

  const onApplyFilters = () => {
    console.log('state', state);
    
    const params = {
      type: state.type,
      page: state.page,
      cityId: state.selectedCityId,
      categories: state.selectedCategory,
      subcategories: state.selectedSubcategory,
      levels: state.selectedLevel,
      sortBy: state.selectedOrder
    };
  
    // Only add startDate if it exists
    if (state.startDate) {
      params.startDate = state.startDate.toISOString().split('T')[0];
    }
  
    // Only add endDate if it exists
    if (state.endDate) {
      params.endDate = state.endDate.toISOString().split('T')[0];
    }
  
    dispatch(fetchEvents(params));
    dispatch(closePopup());
    togglePopup("filterPanel", false);
  }

 useEffect(() => {
      if(popupState.filterPanel || tripPopupState.addTripPopup || isAddToPopupOpen){
        document.body.classList.add('overflowHide');
      }else{
        document.body.classList.remove('overflowHide');
      }
  
      // Cleanup: Remove class when component unmounts
      return () => {
        document.body.classList.remove('overflowHide');
      };
    }, [popupState.filterPanel, tripPopupState.addTripPopup, isAddToPopupOpen]);



    useEffect(() => {
      const debounceTimer = setTimeout(() => {
        const params = {
          type: state.type,
          page: 1, // Reset to first page when searching
          keyword: state.keyword,
          cityId: state.selectedCityId,
          categories: state.selectedCategory,
          subcategories: state.selectedSubcategory,
          levels: state.selectedLevel
        };
    
        if (state.startDate) {
          params.startDate = state.startDate.toISOString().split('T')[0];
        }
    
        if (state.endDate) {
          params.endDate = state.endDate.toISOString().split('T')[0];
        }
    
        dispatch(fetchEvents(params));
      }, 500);
    
      return () => clearTimeout(debounceTimer);
    }, [
      state.keyword, // Triggers when search term changes
      dispatch,
    ]);
    
    const handleSearch = (e) => {
      const value = e.target.value;
      setState((prev) => ({ ...prev, keyword: value }));
      // Don't call debouncedSearchEvents here - it will be triggered by the useEffect
    };
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
          <EventSearch togglePopup={togglePopup} handleSearch={handleSearch} state={state}/>
          {!isAuthenticated && <LoginBanner handleNavigateToLogin={handleNavigateToLogin} styles={styles1} />}
          <h2 className={styles.sectionTitle}>{tEventsPage('events.popularEvents')}</h2>
          <EventList
            events={visibleEvents}
            handleActions={handleActions}
          />
          {visibleEvents?.length === 0 &&
          <div className="no-results-wrapper">{tCommon("noResults")}</div>
          }
        
          <div className={styles.showMoreWrapper}>
            {loading ? <Loader /> : next && (
              <SeeMoreButton
                onClick={loadMore}
                loading={loading}
                next={hasNext}
                translate={t}
              />
            )}
          </div>
          <hr className={styles.divider} />
          <PopularEvents />
          <PromotionalBanner bannerBlocks={bannerBlocks} bannerLoading={bannerLoading} />
        </main>
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default EventsPage;