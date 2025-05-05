import React, { useState, useEffect, useContext, useMemo } from "react";
import Header from "../../components/layouts/Header";
import SearchBar from "../../components/Itinerary/SearchBar";
import ItineraryList from "../../components/Itinerary/ItineraryList";
import RecommendedEvents from "../../components/Itinerary/RecommendedEvents";
import Newsletter from "../../components/common/Newsletter";
import Footer from "../../components/layouts/Footer";
import styles from "./ItineraryPage.module.css";
import LoginBanner from "../../components/common/LoginBanner";
import styles1 from "../../components/PlacesPage/MainContent.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCities } from "../../features/common/cities/CityAction";
import { debounce } from "lodash";
import { LanguageContext } from "../../context/LanguageContext";
import useSeeMore from "../../hooks/useSeeMore";
import { fetchItineraries, fetchItinerariesInCity } from "../../features/itineraries/ItineraryAction";
import { toggleFavorite } from "../../features/favorites/FavoritesAction";
import { setFavTogglingId } from "../../features/itineraries/ItinerarySlice";
import { openPopup, closePopup, openAddToTripPopup } from "../../features/popup/PopupSlice";
import Loader from "../../components/common/Loader";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import { useTranslation } from 'react-i18next';
import CardSkeleton from "../../components/skeleton/common/CardSkeleton";
import AddToTripPopup from "../../components/popup/AddToTrip/AddToTripPopup";
import AddTripPopup from "../../components/popup/AddToTrip/AddTripPopup";
import { useAddTrip } from "../../hooks/useAddTrip";
import AlertPopup from "../../components/popup/Alert/AlertPopup";
import Modal from "../../components/modal/Modal";
import { listUpdater } from "../../features/itineraries/ItinerarySlice";

const ItineraryPage = () => {
  const { t: tCommon } = useTranslation("Common");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { cities, loading: citiesLoading, error: citiesError } = useSelector((state) => state.cities);
  const { itineraries, loading: itinerariesLoading, error: itinerariesError, next, count } = useSelector((state) => state.itineraries);
  const { data: visibleItineraries, loading, next: hasNext, loadMore } = useSeeMore(itineraries, next, listUpdater);

  const { isOpen } = useSelector((state) => state.popup);

  const [state, setState] = useState({
    selectedDestinationId: null,
    destinationSearchQuery: "",
    page: 1,
    cityId: "",
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

  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  useEffect(() => {
    dispatch(fetchCities({}));
    // dispatch(fetchItineraries(state.page));
    dispatch(fetchItinerariesInCity({ page: state.page, cityId: state.cityId }));
  }, [dispatch, language]);

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

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });

  }

  // const handleActions = (e, action, id) => {
  //   e.stopPropagation();
  //   if (action === 'addToFavorites') {
  //     handleFavClick(e, id);
  //   } else if (action === 'addToTrip') {
  //     handleTripClick(e, id);
  //   } else if (action === 'viewMore') {
  //     handleViewMoreDetails(e, id);
  //   }
  // };

  // const handleFavClick = (e, id) => {
  //   e.stopPropagation();
  //   if (isAuthenticated) {
  //     dispatch(toggleFavorite(id));
  //     dispatch(setFavTogglingId(id));
  //   }
  // };

  // const handleTripClick = (e, id) => {
  //   e.stopPropagation();
  //   if (isAuthenticated) {
  //     dispatch(openAddToTripPopup());
  //     navigate('/places/itineraries-details', { state: { id } });
  //   } else {
  //     togglePopup("alert", true);
  //   }
  // };


  const handleActions = (e, action, id, name) => {
    e.stopPropagation();
    switch (action) {
      case 'addToFavorites':
        handleFavClick(e, id);
        break;
      case 'addToTrip':
        handleAddToTripClick(e, id, name);
        setFormState(prev => ({ ...prev, type: "itinerary" }));
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
      navigate('/itineraries/details', { state: { id } });
    } else {
      togglePopup("alert", true);
      setAlertTitle(tCommon('authAlert.viewDetails.title'));
      setAlertMessage(tCommon('authAlert.viewDetails.description'));
    }
  };


  useEffect(() => {
    // if (state.selectedDestinationId) {
    dispatch(fetchItinerariesInCity({ page: state.page, cityId: state.selectedDestinationId }));
    // }

  }, [language, state.selectedDestinationId])


  const modalSearchProps = {
    activeDestinationIndex,
    setActiveDestinationIndex,
    citiesSearchResults,
    isSearchingCities,
    updateDestination
  };

  return (
    <>

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

      {isOpen && isAddToPopupOpen && <AddToTripPopup closeModal={() => {
        dispatch(closeAddToTrip());
        dispatch(closePopup());
        dispatch(resetTripType());
      }} state={formState} setState={setFormState} cities={cities} onSubmit={handleSubmit} formErrors={formErrors} setFormErrors={setFormErrors} {...modalSearchProps} handleActions={handleActions} />}
      <div className={styles.itineraryPage}>
        <Header />
        <main className="page-center">
          {/* <h1 className={styles.eventCount}>{"1.240"} itinerarios disponibles</h1> */}
          <SearchBar state={state} setState={setState} cities={cities} count={count} />
          {!isAuthenticated && <LoginBanner handleNavigateToLogin={handleNavigateToLogin} styles={styles1} />}
        
            <ItineraryList visibleItineraries={visibleItineraries} handleViewMoreDetails={handleViewMoreDetails} handleActions={handleActions} />
          

          {loading ? <Loader /> : next && isAuthenticated && <SeeMoreButton
            onClick={loadMore}
            loading={loading}
            next={hasNext}
            translate={''}
          />}
          {!isAuthenticated && next && next &&
            <div className={styles.loginButtonWrapper}>
              <button className={styles.loginButton} onClick={handleNavigateToLogin}>{tCommon('logInButton')}</button>
            </div>
          }

          <RecommendedEvents />
        </main>
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default ItineraryPage;
