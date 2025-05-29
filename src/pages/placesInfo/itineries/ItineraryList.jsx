import React from "react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import SearchFilters from "../../../components/PlacesInfo/Places/SearchFilters";
import RecommendedPlaces from "../../../components/PlacesInfo/Places/RecommendedPlaces";
import commonStyle from "../Common.module.css"
import SubNavMenu from "../../../components/common/SubNavMenu";
import { useEffect, useRef, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceCard from "../../../components/common/PlaceCard";
import styles from "../places/Places.module.css"
import { useTranslation } from "react-i18next";
import useSeeMore from "../../../hooks/useSeeMore";
import Loader from "../../../components/common/Loader";
import SeeMoreButton from "../../../components/common/SeeMoreButton";
import { Arrow } from "../../../components/common/Images";
import styles2 from "../../../components/common/PlaceCard.module.css"
import { fetchItineriesInCity } from "../../../features/places/placesInfo/itinerary/ItineraryAction";
import CardSkeleton from "../../../components/skeleton/common/CardSkeleton";
import FilterBar from "../../../components/common/FilterBar";
import { LanguageContext } from "../../../context/LanguageContext";
import { toggleFavorite } from "../../../features/favorites/FavoritesAction";
import { setFavTogglingId } from "../../../features/favorites/FavoritesSlice";
import AddToTripPopup from "../../../components/popup/AddToTrip/AddToTripPopup";
import Modal from "../../../components/modal/Modal";
import AlertPopup from "../../../components/popup/Alert/AlertPopup";
import { openPopup, closePopup, openAddToTripPopup } from "../../../features/popup/PopupSlice";
import AddTripPopup from "../../../components/popup/AddToTrip/AddTripPopup";
import { useAddTrip } from "../../../hooks/useAddTrip";
import { listUpdater } from "../../../features/places/placesInfo/itinerary/ItinerarySlice";
import { fetchCities } from "../../../features/common/cities/CityAction";
import { fetchSuggestedPlaces } from "../../../features/suggestions/SuggestionAction";
import { fetchTravelLiteList } from "../../../features/places/placesInfo/itinerary/ItineraryAction";
import { fetchGeoLocations } from "../../../features/places/PlaceAction";
import Widget from "../../../components/common/Widget";
import { WidgetSkeleton } from "../../../components/skeleton/common/WidgetSkeleton";
import { resetGeoLocations } from "../../../features/places/PlaceSlice";
import useDynamicContent from "../../../hooks/useDynamicContent";
import useHasTagDetails from "../../../hooks/useHasTagDetails";
import { listUpdater as tagsListUpdater, resetState } from "../../../features/places/placesInfo/tags/TagsSlice";
import { fetchItinerariesByTag } from "../../../features/places/placesInfo/tags/TagsAction";


const ItineraryList = () => {

  const { t } = useTranslation('Places');
  const { t: tCommon } = useTranslation('Common');

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { language } = useContext(LanguageContext);
  const hasTagDetails = useHasTagDetails();
  const tagDetails = hasTagDetails ? JSON.parse(localStorage.getItem('tagDetails')) : null;

  // const { loading: itineriesLoading, error, itineries, next, count} = useSelector((state) => state.itineriesInCity);
  const { loading: itineriesLoading, error, data: itineries, next, count } = useDynamicContent('itineraries');
  const { isFavoriteToggling, favTogglingId } = useSelector((state) => state.favorites);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading: destinationLoading, destination } = useSelector((state) => state.destination);
  const { data: visiblePlaces, loading, next: hasNext, loadMore } = useSeeMore(itineries, next, hasTagDetails ? tagsListUpdater : listUpdater, hasTagDetails ? "itineraries" : "");
  const { isOpen } = useSelector((state) => state.popup);
  const { cities } = useSelector((state) => state.cities);
  const { suggestedPlaces, loading: suggestedPlacesLoading } = useSelector((state) => state.suggestions);

  const [showArrow, setShowArrow] = useState(true);

  const { id } = location.state || {}

  const placesListRef = useRef(null);
  const mainRef = useRef(null);
  const gotoTopButtonRef = useRef(null);
  const placesListBreakerRef = useRef(null);

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


  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const cityId = hasTagDetails ? tagDetails.cityId : id;

  useEffect(() => {
    if (cityId) {
         if(hasTagDetails) {
            const tagDetails = JSON.parse(localStorage.getItem('tagDetails'));
            dispatch(fetchItinerariesByTag({ 
                tagId: tagDetails.tagId,
                cityId: tagDetails.cityId,
                page: 1
            }));
        }else{
          dispatch(fetchItineriesInCity(cityId));
        }
      
      dispatch(fetchCities({}));
      dispatch(fetchSuggestedPlaces({ page: 1, type:"place" }));
    }
  }, [dispatch, language, cityId]);

  const handleViewMoreDetails = (e, id) => {

    if (isAuthenticated) {
      navigate('/places/itineraries-details', { state: { id } });
    } else {
      togglePopup("alert", true);
      setAlertTitle(tCommon('authAlert.viewDetails.title'));
      setAlertMessage(tCommon('authAlert.viewDetails.description'));
    }
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



  const sortOrder = [
    { id: 1, name: t('Filters.all') },
    { id: 2, name: t('Filters.mostRecent') },
    { id: 3, name: t('Filters.highestRated') },
    { id: 4, name: t('Filters.recommendations') },
  ];

  // Define filters array
  const filters = [

    {
      label: t('Filters.sortBy'),
      type: "select",
      options: sortOrder,
      selectedId: selectedOrderId,
      onSelect: (value) => setSelectedOrderId(value),
    },
  ];


  // const handleActions = (e, action, id) => {
  //   e.stopPropagation();
  //   if (action === 'addToFavorites') {
  //     handleFavClick(e, id);
  //   } else if (action === 'addToTrip') {
  //     handleTripClick(e, id);
  //   }
  // };

  // const handleFavClick = (e, id) => {
  //   e.stopPropagation();
  //   if (isAuthenticated) {
  //     dispatch(toggleFavorite(id));
  //     dispatch(setFavTogglingId(id));
  //   } else {
  //     setAlertTitle(tCommon('authAlert.favorites.title'));
  //     setAlertMessage(tCommon('authAlert.favorites.description'));
  //     togglePopup("alert", true);
  //   }
  // };

  // const handleTripClick = (e, id) => {
  //   e.stopPropagation();
  //   if (isAuthenticated) {
  //     dispatch(openAddToTripPopup());
  //     navigate('/places/itineraries-details', { state: { id } });
  //   } else {
  //     setAlertTitle(tCommon('authAlert.favorites.title'));
  //     setAlertMessage(tCommon('authAlert.favorites.description'));
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
        const selectedItinerary = itineries.find((itinerary) => itinerary.id === id);
        const stops = selectedItinerary?.stops || [];
        const firstCity = selectedItinerary?.cities?.[0] || {};
        setFormState(prev => ({ ...prev, type: "itinerary", stops: stops,
          destinations: [{
            destinationSearchQuery: '',
            destinationId: firstCity.id || null,
            destinationName: firstCity.name || ''
          }]
        }));
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

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  }
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
    
        return () => {
          dispatch(resetGeoLocations());
          dispatch(resetState())
        }
        
      },[])


  return (
    // <div className={styles.athenasPlaces}>
    <>
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
      <Header />
      <main className="page-center" ref={mainRef}>
        <h1 className={commonStyle.pageTitle}>{hasTagDetails ? `${tagDetails?.cityName}, #${tagDetails?.title}` : `${destination?.name}, ${destination?.country?.name}`}</h1>
        <SubNavMenu activeLink="lugares" />
        {!hasTagDetails &&
        <>
        <div className={styles.searchFilters}>
          <div className="">

          </div>
          <div className={styles.filterContainer}>
            <FilterBar filters={filters} />
          </div>
        </div>
        </>
        }
        <p className={commonStyle.availablePlaces}>{!hasTagDetails && t('Itineraries.availableCount', { count })}</p>
        <div className={styles.placesList} ref={placesListRef}>
          {/* <button
            style={{
              display: showArrow && !isOpen && !loading && visiblePlaces.length > 0 ? 'block' : 'none'
            }}

            className={styles2.gotoTopButton}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            ref={gotoTopButtonRef}
          >
            <img src={Arrow} alt={t('arrowIcon')} />
          </button> */}
          {itineriesLoading ?
            (Array.from({ length: 5 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
            ) : visiblePlaces.length > 0 ? (
              visiblePlaces.map((place, index) => (
                <PlaceCard
                  key={index}
                  place={place}
                  translate={t}
                  isAuthenticated={isAuthenticated}
                  handleViewMoreDetails={handleViewMoreDetails}
                  handleActions={handleActions}
                  isFavoriteToggling={isFavoriteToggling && favTogglingId === place.id}
                />
              ))
            ) : (
              <div className="no-results-wrapper">{t('Itineraries.noResults')}</div>
            )}
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
        <div className={styles.placesListbreaker} ref={placesListBreakerRef}></div>
        {suggestedPlacesLoading ? (
          <WidgetSkeleton />
          ) : (
          <Widget data={suggestedPlaces} title={tCommon("peopleAlsoSeen")} count={4} handleNavActions={handleNavActions}/>
        )}
      </main>
      <Footer />
      {/* </div> */}
    </>
  );
};

export default ItineraryList;
