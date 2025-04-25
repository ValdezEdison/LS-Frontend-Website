import React, { useEffect, useRef, useState, useContext } from "react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import EventCard from "../../../components/common/EventCard";
import RecommendedEvent from "../../../components/PlacesInfo/Events/RecommendedEvent";
import styles from "./Events.module.css";
import SubNavMenu from "../../../components/common/SubNavMenu";
import { fetchEventsByCityId } from "../../../features/places/placesInfo/events/EventAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FilterBar from "../../../components/common/FilterBar";
import useSeeMore from "../../../hooks/useSeeMore";
import Loader from "../../../components/common/Loader";
import SeeMoreButton from "../../../components/common/SeeMoreButton";
import { useTranslation } from 'react-i18next';
import EventCardSkeleton from "../../../components/skeleton/PlacesPage/PlacesInfo/events/EventCardSkeleton";
import { fetchPlacesFilterCategories, fetchGeoLocations, fetchNearbyPlaces } from "../../../features/places/PlaceAction";
import { toggleFavorite } from "../../../features/favorites/FavoritesAction";
import { openPopup, closePopup, openAddToTripPopup } from "../../../features/popup/PopupSlice";
import MapPopup from "../../../components/common/MapPopup";
import SelectedItemList from "../../../components/common/SelectedItemList";
import styles2 from "../../../components/PlacesPage/MainContent.module.css";
import { LanguageContext } from "../../../context/LanguageContext";
import { setFavTogglingId } from "../../../features/places/placesInfo/events/EventSlice";
import AlertPopup from "../../../components/popup/Alert/AlertPopup";
import Modal from "../../../components/modal/Modal";
import { fetchCities } from "../../../features/common/cities/CityAction";
import { fetchTravelLiteList } from "../../../features/places/placesInfo/itinerary/ItineraryAction";
import AddToTripPopup from "../../../components/popup/AddToTrip/AddToTripPopup";
import AddTripPopup from "../../../components/popup/AddToTrip/AddTripPopup";
import SuccessMessagePopup from "../../../components/popup/SuccessMessage/SuccessMessagePopup";
import { useAddTrip } from "../../../hooks/useAddTrip";

const recommendedEvents = [
  {
    title: "Kensington Dollshouse Festival",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/40931c085bffa3ac5e5d7f41ef51ecfe5c77c819",
  },
  {
    title: "Summer Social 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/40931c085bffa3ac5e5d7f41ef51ecfe5c77c819",
  },
  {
    title: "Open Bar Afro Caribbean",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/dd8283b2c6cf2f47b20143530ae9cd5605d37d9a",
  },
  {
    title: "Asbury Park Vegan Food Festival",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/86c884c27449396d500c38a043d02ab9574d0223",
  },
];

const Events = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { language } = useContext(LanguageContext);
  const { loading: eventLoading, error, events, next, isFavoriteToggling, favTogglingId } = useSelector((state) => state.eventsByCity);
  const { loading: destinationLoading, destination } = useSelector((state) => state.destination);
  const { data: visibleEvents, loading, next: hasNext, loadMore } = useSeeMore(events, next);
  const { loading: placesFilterCategoriesLoading, categories } = useSelector((state) => state.places);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cities } = useSelector((state) => state.cities);

  const { isOpen } = useSelector((state) => state.popup);

  const [showMapPopup, setShowMapPopup] = useState(false);


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



  const { t } = useTranslation('Places');
  const { t: tCommon } = useTranslation('Common');

  const { id } = location.state || {};
  ;

  const [state, setState] = useState({
    selectedLevel: "",
    latAndLng: "",
    selectedDateRange: { startDate: null, endDate: null },
    type: "event",
    points: "",
  })

  const [popupState, setPopupState] = useState({
    map: false,
    gallery: false,
    reviewDrawer: false,
    alert: false,
    comment: false,
    deleteConfirm: false,
    success: false,
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchPlacesFilterCategories({ page: 1, type: 'place', cityId: id }));
      dispatch(fetchGeoLocations({ cityId: id, type: "event" }));
      if (isAuthenticated) {
        dispatch(fetchTravelLiteList());
      }
      dispatch(fetchCities({}));

      return () => {
        dispatch(closePopup());
        closeAddToTrip();
      };
    }
  }, [dispatch, id, isAuthenticated, language]);

  // Events with filters
  useEffect(() => {
    if (id) {
      const params = {
        cityId: id,
        page: 1,
        type: 'event',
        levels: state.selectedLevel,
        points: state.points,
        ...(state.selectedDateRange.startDate && {
          startDate: state.selectedDateRange?.startDate.toISOString().split('T')[0],
          endDate: state.selectedDateRange?.endDate?.toISOString().split('T')[0]
        })
      };
      dispatch(fetchEventsByCityId(params));
    }
  }, [dispatch, id, state.selectedLevel, state.points, state.selectedDateRange, language]);


  const handleShowMapPopup = () => {
    setShowMapPopup(true);
    setState({ ...state, latAndLng: "" });
    dispatch(openPopup());
  };

  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
    dispatch(closePopup());
    setState(prev => ({ ...prev, points: "" }));
  };


  // Define filters array
  const filters = [
    {
      label: t('Events.filters.dateRange'),
      type: "datePicker",
      selectedId: state.selectedDateRange,
      onSelect: (dates) => {
        setState((prevState) => ({
          ...prevState,
          selectedDateRange: dates || { startDate: null, endDate: null }, // Fallback to default
        }));
      },
    },
    {
      label: t('Events.filters.level'),
      type: "select",
      options: categories.map(category => ({ id: category.id, title: category.title })),
      selectedId: state.selectedLevel,
      onSelect: (value) => {
        setState((prevState) => ({
          ...prevState,
          selectedLevel: value,

        }));
      },
    },
  ];


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
      setAlertTitle(tCommon('authAlert.favorites.title'));
      setAlertMessage(tCommon('authAlert.favorites.description'));
      togglePopup("alert", true);
    }
  };

  // const handleTripClick = (e, id) => {
  //   e.stopPropagation();
  //   if (isAuthenticated) {
  //     dispatch(openAddToTripPopup());
  //     navigate('/places/itineraries-details', { state: { id } });
  //   } else {
  //     togglePopup("alert", true);
  //   }
  // };

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  }

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

  useEffect(() => {
    if (tripPopupState.addTripPopup || isAddToPopupOpen) {
      document.body.classList.add('overflowHide');
    } else {
      document.body.classList.remove('overflowHide');
    }

    // Cleanup: Remove class when component unmounts
    return () => {
      document.body.classList.remove('overflowHide');
    };
  }, [tripPopupState.addTripPopup, isAddToPopupOpen]);


  return (
    <>
      {isOpen && showMapPopup && <MapPopup onClose={handleCloseMapPopup} state={state} setState={setState} />}

      {isOpen && popupState.alert && (
        <Modal
          onClose={() => togglePopup("alert", false)}
          customClass="modalSmTypeOne"
        >
          <AlertPopup handleNavigateToLogin={handleNavigateToLogin} title={alertTitle}
            description={alertMessage}
            buttonText={tCommon('authAlert.favorites.button')} />
        </Modal>
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

      <Header />
      <main className="page-center">
        <h1 className={styles.pageTitle}>{destination?.name}, {destination?.country?.name}</h1>
        <SubNavMenu activeLink="eventos" />

        <div className={styles.searchSection}>
          <div className={styles.mapButtonContainer}>
            <button className={styles.mapButton} onClick={handleShowMapPopup}>{tCommon('seeMap')}</button>
          </div>
          <div className={styles.filterContainer}>
            <FilterBar filters={filters} />
          </div>
        </div>
        <div className={styles2.placesSelectedItemsList}>
          <SelectedItemList
            state={state}
            setState={setState}
            categories={categories}
            translate={t}
            type="submenu-events"
          />
        </div>
        <section className={styles.eventsSection}>
          <h2 className={styles.sectionTitle}>
            {t('Events.popularEvents', { city: destination?.name })}
          </h2>
          <div className={styles.eventGrid}>
            {eventLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))
            ) : visibleEvents.length > 0 && (
              // Render visible events if available
              visibleEvents.map((event, index) => (
                <EventCard key={index} event={event} handleActions={handleActions}
                  isFavoriteToggling={isFavoriteToggling && favTogglingId === event.id} />
              ))
            )}
          </div>

          {visibleEvents.length === 0 && <div className="no-results-wrapper">{t('Events.noEvents')}</div>}
          {/* <button className={styles.showMoreButton}>Mostrar más</button> */}
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
        </section>
        <div className={styles.divider} />
        <section className={styles.recommendedSection}>
          <h2 className={styles.sectionTitle}>
            {t('Events.recommendedEvents')}
          </h2>
          <div className={styles.recommendedGrid}>
            {recommendedEvents.map((event, index) => (
              <RecommendedEvent key={index} {...event} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Events;
