import React, { useState, useEffect, useContext, useMemo } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import SearchBar from "../../components/common/SearchBar"
import RecommendedItem from "./RecommendedItem";
import styles from "./FavoritesPage.module.css";
import EventCard from "../../components/common/EventCard";
import { fetchFavorites } from "../../features/favorites/FavoritesAction";
import { useDispatch, useSelector } from "react-redux";
import { LanguageContext } from "../../context/LanguageContext";
import EventCardSkeleton from "../../components/skeleton/PlacesPage/PlacesInfo/events/EventCardSkeleton";
import { setFavTogglingId } from "../../features/favorites/FavoritesSlice";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import { debounce } from "lodash";
import { toggleFavorite } from "../../features/favorites/FavoritesAction";
import { useNavigate, useLocation } from "react-router-dom";
import { useAddTrip } from "../../hooks/useAddTrip";
import { fetchTravelLiteList } from "../../features/places/placesInfo/itinerary/ItineraryAction";
import { fetchCities } from "../../features/common/cities/CityAction";
import Modal from "../../components/modal/Modal";
import AlertPopup from "../../components/popup/Alert/AlertPopup";
import AddTripPopup from "../../components/popup/AddToTrip/AddTripPopup";
import AddToTripPopup from "../../components/popup/AddToTrip/AddToTripPopup";
import FilterSiderbar from "../../components/popup/FavoritesFilterPanel/FilterSidebar"
import SeeMoreButton from "../../components/common/SeeMoreButton";
import { useTranslation } from "react-i18next";
import useSeeMore from "../../hooks/useSeeMore";
import Loader from "../../components/common/Loader";
import { listUpdater, removeFavorite } from "../../features/favorites/FavoritesSlice";
import { fetchPlacesFilterCategories } from "../../features/places/PlaceAction";
import Widget from "../../components/common/Widget";
import { WidgetSkeleton } from "../../components/skeleton/common/WidgetSkeleton";
import { fetchSuggestedPlaces } from "../../features/suggestions/SuggestionAction";



const recommendedItems = [
  {
    id: 1,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7cf838070a965fb5fcfc5d4a4fa39e12b8c51d91?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    title: "Las Artes y las Ciencias",
  },
  {
    id: 2,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/17a775c0bda86b2eba5653833d3633003701d4fb?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    title: "Praça do Comércio",
  },
  {
    id: 3,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/41372ff12fa33762aeab71a260859abe22dc74dd?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    title: "Gendarmenmarkt",
  },
  {
    id: 4,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/335aebf3e6f35297933f4270afb48c20f0c687f7?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    title: "Ámsterdam",
  },
];

const FavoritesPage = () => {

  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { favLoading, favorites, isFavoriteToggling, favTogglingId, next, count } = useSelector((state) => state.favorites)
  const {
    categories,
  } = useSelector((state) => state.places);

  const { data: visibleFavorites, loading, next: hasNext, loadMore } = useSeeMore(favorites, next, listUpdater);
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { isOpen } = useSelector((state) => state.popup)
  const { cities } = useSelector((state) => state.cities)
  const { currentLocation } = useSelector((state) => state.locationSettings);
  
  const { suggestedPlaces, loading: suggestedPlacesLoading } = useSelector((state) => state.suggestions);

  const { t: tCommon } = useTranslation('Common');
  const { t: tFavoritesPage } = useTranslation('FavoritesPage');


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

  const [vanishingItems, setVanishingItems] = useState([]);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const [popupState, setPopupState] = useState({
    map: false,
    gallery: false,
    reviewDrawer: false,
    alert: false,
    comment: false,
    deleteConfirm: false,
    filterPanel: false
  });

  const [state, setState] = useState({
    keyword: "",
    selectedCityId: null,
    selectedDestinationId: null,
    destinationSearchQuery: "",
    startDate: null,
    endDate: null,
    page: 1,
    type: "",
    levelId: null,     
    categoryId: null,  
    subcategoryId: null
  })

  useEffect(() => {
    dispatch(fetchFavorites({ page: state.page }))
    dispatch(fetchCities({}));
    dispatch(fetchPlacesFilterCategories({ page: state.page, type: state.type }))
    if (isAuthenticated) {
      dispatch(fetchTravelLiteList());
    }
     if(currentLocation) {
        dispatch(fetchSuggestedPlaces({ page: state.page, latitude: currentLocation.preferences?.last_known_latitude, longitude: currentLocation.preferences?.last_known_longitude, type: 'place' }));
        
      }else{
        dispatch(fetchSuggestedPlaces({ page: state.page, type: 'place' }));
      }
    return () => {
      dispatch(closePopup());
      closeAddToTrip()
    }
  }, [dispatch, language, currentLocation]);

  const handleActions = (e, action, id, name) => {
    e.stopPropagation();
    switch (action) {
      case 'addToFavorites':
        handleFavClick(e, id);
        break;
      case 'addToTrip':
        handleAddToTripClick(e, id, name);
        const selectedPlace = favorites.find(favorite => favorite.id === id);
        const firstCity = selectedPlace?.cities?.[0] || selectedPlace?.city || {};
        const stops = [selectedPlace?.id];
        setFormState(prev => ({ ...prev, type: selectedPlace.type, stops: stops,
           destinations: [{
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
      togglePopup("alert", true);
    }
  };

  const handleFavClick = (e, id) => {

    if (isAuthenticated) {

      setVanishingItems(prev => [...prev, id]);

      dispatch(toggleFavorite(id)).then((res) => {
        
        if (res.payload?.response?.detail === "Unmarked as favorite") {
          
          debouncedSearchFavorites(state.keyword);
          dispatch(removeFavorite(id));

          setTimeout(() => {
            setVanishingItems(prev => prev.filter(itemId => itemId !== id));
          }, 500);
        }
      });
      dispatch(setFavTogglingId(id));
    } else {
      togglePopup("alert", true);
    }
  };

  const handleViewMoreDetails = (e, id) => {
    navigate('/places/details', { state: { id } });
  };

  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };



  const debouncedSearchFavorites = useMemo(
    () => debounce((query) => {
      const trimmedQuery = query?.trim();
      if (trimmedQuery) {
        dispatch(fetchFavorites({page: state.page, keyword: trimmedQuery }));
      } else {
        dispatch(fetchFavorites()); // Fetch all when empty
      }
    }, 500),
    [dispatch]
  );
  
  useEffect(() => {
    // Trigger search when keyword changes (skip initial render if needed)
    debouncedSearchFavorites(state.keyword);
    
    // Cleanup function to cancel debounce on unmount
    return () => {
      debouncedSearchFavorites.cancel();
    };
  }, [state.keyword, debouncedSearchFavorites]);
  

  const handleSearch = (e) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, keyword: value }));
    // Correct: useEffect will handle the debounced call
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

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
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


  // Filter handlers
  const handleTypeChange = (type) => {
    setState(prev => ({
      ...prev,
      type,
      levelId: null,
      categoryId: null,
      subcategoryId: null,
      page: 1
    }));
  };

  const handleLevelChange = (levelId) => {
    setState(prev => ({
      ...prev,
      levelId,
      categoryId: null,
      subcategoryId: null,
      page: 1
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setState(prev => ({
      ...prev,
      categoryId,
      subcategoryId: null,
      page: 1
    }));
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setState(prev => ({
      ...prev,
      subcategoryId,
      page: 1
    }));
  };

  const applyFilters = () => {
    togglePopup("filterPanel", false);
    
    const filters = {
        page: state.page,
        ...(state.selectedDestinationId && { city: cities.find(city => city.id === state.selectedDestinationId).name }),
        ...(state.type && { type: state.type }),
        ...(state.levelId && { level_id: state.levelId }),
        ...(state.categoryId && { category_id: state.categoryId }),
        ...(state.subcategoryId && { subcategory_id: state.subcategoryId })
    };
    
    dispatch(fetchFavorites(filters));
    // resetFilters()
};
  const resetFilters = () => {
    setState(prev => ({
      ...prev,
      type: "",
      levelId: null,
      categoryId: null,
      subcategoryId: null,
      selectedDestinationId: null,
      destinationSearchQuery: "",
      page: 1
    }));
    dispatch(fetchFavorites({ page: 1 }));
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


  return (
    <>
      {/* <FilterSiderbar/> */}
      {isOpen && popupState.filterPanel && (
        <FilterSiderbar onClose={() => {togglePopup("filterPanel", false)
          
        }} state={state} setState={setState} cities={cities} categories={categories} handleTypeChange={handleTypeChange}  handleLevelChange={handleLevelChange} handleCategoryChange={handleCategoryChange} handleSubcategoryChange={handleSubcategoryChange} applyFilters={applyFilters} resetFilters={resetFilters}/>
      )}
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


      <div className={styles.favoritesPage}>
        <Header />
        <main className="page-center">
          <h1 className={styles.pageTitle}>{tFavoritesPage('pageTitle')}</h1>
          <SearchBar togglePopup={togglePopup} handleSearch={handleSearch} state={state} setState={setState}/>
          <div className={styles.favoritesList}>
            {/* {favoriteItems.map((item) => (
            <FavoriteItem key={item.id} {...item} />
          ))} */}

            {favLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))
            ) : (
              visibleFavorites?.map((favorite, index) => (
                // <div
                //   key={index}
                //   className={`${styles.favoriteItem} ${vanishingItems.includes(favorite.id) ? styles.vanishing : ''
                //     }`}
                // >
                <EventCard
                  key={index}
                  event={favorite}
                  handleActions={handleActions}
                  isFavoriteToggling={
                    isFavoriteToggling && favTogglingId === favorite.id
                  }
                />
                // </div>
              ))
            )}
          </div>
          {loading ? <Loader /> : next && isAuthenticated && <SeeMoreButton
            onClick={loadMore}
            loading={loading}
            next={hasNext}
            translate={''}
          />}
          {!isAuthenticated && next &&
            <div className={styles.loginButtonWrapper}>
              <button className={styles.loginButton} onClick={handleNavigateToLogin}>{tCommon('logInButton')}</button>
            </div>
          }
          {/* <section className={styles.recommendedSection}>
            <h2 className={styles.recommendedTitle}>
              {tFavoritesPage('recommendedTitle')}
            </h2>
            <div className={styles.recommendedList}>
              {recommendedItems.map((item) => (
                <RecommendedItem key={item.id} {...item} />
              ))}
          
            </div>
          </section> */}
          {suggestedPlacesLoading ? (
              <WidgetSkeleton />
            ) : (
              <Widget data={suggestedPlaces} title={tCommon("peopleAlsoSeen")} count={4} handleNavActions={handleNavActions}/>
            )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FavoritesPage;