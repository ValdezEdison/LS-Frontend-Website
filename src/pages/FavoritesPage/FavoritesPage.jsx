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

  const { loading, favorites, isFavoriteToggling, favTogglingId } = useSelector((state) => state.favorites)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { isOpen } = useSelector((state) => state.popup) 
  const { cities } = useSelector((state) => state.cities)


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
  })

  useEffect(() => {
    dispatch(fetchFavorites())
    dispatch(fetchCities({}));
    if (isAuthenticated) {
      dispatch(fetchTravelLiteList());
    }

    return () => {
      dispatch(closePopup());
      closeAddToTrip()
    }
  }, [dispatch, language]);

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

    if (isAuthenticated) {

      setVanishingItems(prev => [...prev, id]);

      dispatch(toggleFavorite(id)).then((res) => {
        console.log(res, 'res');
        if (res.payload?.response?.detail === "Unmarked as favorite") {
          console.log('entered');
          debouncedSearchFavorites(state.keyword);

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
      if (query.trim() !== "") {
        dispatch(fetchFavorites(query)); // Pass query directly, not as object
      } else {
        // Clear results when query is empty
        dispatch(fetchFavorites()); // Fetch all favorites when empty
      }
    }, 500),
    [dispatch]
  );

  useEffect(() => {
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
        if( tripPopupState.addTripPopup || isAddToPopupOpen ){
          document.body.classList.add('overflowHide');
        }else{
          document.body.classList.remove('overflowHide');
        }
    
        // Cleanup: Remove class when component unmounts
        return () => {
          document.body.classList.remove('overflowHide');
        };
      }, [ tripPopupState.addTripPopup, isAddToPopupOpen ]);

  return (
    <>
      <FilterSiderbar/>
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
          <h1 className={styles.pageTitle}>Todos los favoritos</h1>
          <SearchBar togglePopup={togglePopup} handleSearch={handleSearch} state={state} />
          <div className={styles.favoritesList}>
            {/* {favoriteItems.map((item) => (
            <FavoriteItem key={item.id} {...item} />
          ))} */}

            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))
            ) : (
              favorites?.map((favorite, index) => (
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
          <button className={styles.showMoreButton}>Mostrar más</button>
          <section className={styles.recommendedSection}>
            <h2 className={styles.recommendedTitle}>
              Otras personas tambien han visto
            </h2>
            <div className={styles.recommendedList}>
              {recommendedItems.map((item) => (
                <RecommendedItem key={item.id} {...item} />
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FavoritesPage;
