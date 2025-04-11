import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/layouts/Header";
import EventSearch from "../../components/EventsPage/EventSearch";
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
import { toggleFavorite, fetchPlacesFilterCategories } from "../../features/places/PlaceAction";
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

const EventsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation('places');

  // Selectors
  const { loading: eventLoading, error, next, count, events } = useSelector((state) => state.events);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: visibleEvents, loading, next: hasNext, loadMore } = useSeeMore(events, next);
  const { isOpen } = useSelector((state) => state.popup);
  const { cities } = useSelector((state) => state.cities);
  const { loading: placesFilterCategoriesLoading, categories } = useSelector((state) => state.places);

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

  // Filter state
  const [filters, setFilters] = useState({
    searchQuery: '',
    selectedLevel: null,
    selectedCategory: null,
    selectedSubcategory: null,
    selectedCityId: null,
    dateRange: { startDate: null, endDate: null },
    sortBy: 'recent' // 'recent', 'rating', 'recommended'
  });

  // Page state
  const [state, setState] = useState({
    page: 1,
    type: "event"
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

  // Extract all categories and subcategories for filter panel
  const getAllCategories = () => {
    const allCategories = [];
    const allSubcategories = [];
    
    categories?.forEach(level => {
      if (level.categories && level.categories.length > 0) {
        level.categories.forEach(category => {
          allCategories.push({
            id: category.id,
            title: category.title,
            levelId: level.id,
            levelTitle: level.title
          });
          
          if (category.subcategories && category.subcategories.length > 0) {
            category.subcategories.forEach(subcategory => {
              allSubcategories.push({
                id: subcategory.id,
                title: subcategory.title,
                categoryId: category.id
              });
            });
          }
        });
      }
    });
    
    return { allCategories, allSubcategories };
  };

  const { allCategories, allSubcategories } = getAllCategories();

  // Fetch events with filters
  const fetchEventsWithFilters = () => {
    const params = {
      type: state.type,
      page: state.page,
      search: filters.searchQuery,
      level_id: filters.selectedLevel,
      category_id: filters.selectedCategory,
      subcategory_id: filters.selectedSubcategory,
      city_id: filters.selectedCityId,
      start_date: filters.dateRange.startDate,
      end_date: filters.dateRange.endDate,
      sort_by: filters.sortBy
    };
    
    dispatch(fetchEvents(params));
  };

  // Fetch events and locations
  useEffect(() => {
    fetchEventsWithFilters();
    dispatch(fetchGeoLocations({ type: state.type }));
    dispatch(fetchPlacesFilterCategories({ page: state.page, type: state.type }));
    if (isAuthenticated) {
      dispatch(fetchTravelLiteList());
    }
    dispatch(fetchCities({}));
    return () => {
      dispatch(closePopup());
      closeAddToTrip();
    }
  }, [dispatch, state.type, state.page, language, filters]);

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
    navigate('/events/details', { state: { id } });
  };

  // Filter handlers
  const handleSearch = (query) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleLevelSelect = (levelId) => {
    setFilters(prev => ({
      ...prev,
      selectedLevel: levelId,
      selectedCategory: null,
      selectedSubcategory: null
    }));
  };

  const handleCategorySelect = (categoryId) => {
    setFilters(prev => ({
      ...prev,
      selectedCategory: categoryId,
      selectedSubcategory: null
    }));
  };

  const handleSubcategorySelect = (subcategoryId) => {
    setFilters(prev => ({ ...prev, selectedSubcategory: subcategoryId }));
  };

  const handleCitySelect = (cityId) => {
    setFilters(prev => ({ ...prev, selectedCityId: cityId }));
  };

  const handleDateRangeChange = (dateRange) => {
    setFilters(prev => ({ ...prev, dateRange }));
  };

  const handleSortBy = (sortOption) => {
    setFilters(prev => ({ ...prev, sortBy: sortOption }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedLevel: null,
      selectedCategory: null,
      selectedSubcategory: null,
      selectedCityId: null,
      dateRange: { startDate: null, endDate: null },
      sortBy: 'recent'
    });
  };

  // Modal props
  const modalSearchProps = {
    activeDestinationIndex,
    setActiveDestinationIndex,
    citiesSearchResults,
    isSearchingCities,
    updateDestination
  };

  return (
    <>
      {/* Popups and Modals */}
      {isOpen && popupState.alert && (
        <Modal onClose={() => togglePopup("alert", false)} customClass="modalSmTypeOne">
          <AlertPopup
            handleNavigateToLogin={handleNavigateToLogin}
            title="Log in and save time"
            description="Sign in to save your favorites and create new itineraries on Local Secrets."
            buttonText="Sign in or create an account"
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
        <FilterPanel 
          onClose={() => togglePopup("filterPanel", false)} 
          categories={categories} 
          cities={cities}
          selectedLevel={filters.selectedLevel}
          selectedCategory={filters.selectedCategory}
          selectedSubcategory={filters.selectedSubcategory}
          selectedCityId={filters.selectedCityId}
          dateRange={filters.dateRange}
          sortBy={filters.sortBy}
          onLevelSelect={handleLevelSelect}
          onCategorySelect={handleCategorySelect}
          onSubcategorySelect={handleSubcategorySelect}
          onCitySelect={handleCitySelect}
          onDateRangeChange={handleDateRangeChange}
          onSortBy={handleSortBy}
          onResetFilters={resetFilters}
          allCategories={allCategories}
          allSubcategories={allSubcategories}
        />
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
          <h1 className={styles.eventCount}>{count} eventos disponibles</h1>
          <EventSearch 
            togglePopup={togglePopup} 
            onSearch={handleSearch}
            searchQuery={filters.searchQuery}
          />
          {!isAuthenticated && <LoginBanner handleNavigateToLogin={handleNavigateToLogin} styles={styles1} />}
          <h2 className={styles.sectionTitle}>Eventos más populares</h2>
          <EventList
            events={visibleEvents}
            handleActions={handleActions}
          />
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
          <PromotionalBanner styles={styles1} />
        </main>
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default EventsPage;