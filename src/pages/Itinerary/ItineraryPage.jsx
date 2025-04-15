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
import { fetchItineraries } from "../../features/itineraries/ItineraryAction";
import { toggleFavorite } from "../../features/favorites/FavoritesAction";
import { setFavTogglingId } from "../../features/itineraries/ItinerarySlice";
import { openPopup, closePopup, openAddToTripPopup } from "../../features/popup/PopupSlice";
import Loader from "../../components/common/Loader";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import { useTranslation } from 'react-i18next';
import CardSkeleton from "../../components/skeleton/common/CardSkeleton";

const ItineraryPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { cities, loading: citiesLoading, error: citiesError } = useSelector((state) => state.cities);
  const { itineraries, loading: itinerariesLoading, error: itinerariesError, next, count } = useSelector((state) => state.itineraries);
  const { data: visibleItineraries, loading, next: hasNext, loadMore } = useSeeMore(itineraries, next);

  const { isOpen } = useSelector((state) => state.popup);

  const [state, setState] = useState({
    selectedDestinationId: null,
    destinationSearchQuery: "",
    page: 1,
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

  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  useEffect(() => {
    dispatch(fetchCities({}));
    dispatch(fetchItineraries(state.page));
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

  const handleActions = (e, action, id) => {
    e.stopPropagation();
    if (action === 'addToFavorites') {
      handleFavClick(e, id);
    } else if (action === 'addToTrip') {
      handleTripClick(e, id);
    } else if (action === 'viewMore') {
      handleViewMoreDetails(e, id);
    }
  };

  const handleFavClick = (e, id) => {
    e.stopPropagation();
    if (isAuthenticated) {
      dispatch(toggleFavorite(id));
      dispatch(setFavTogglingId(id));
    }
  };

  const handleTripClick = (e, id) => {
    e.stopPropagation();
    if (isAuthenticated) {
      dispatch(openAddToTripPopup());
      navigate('/places/itineraries-details', { state: { id } });
    } else {
      togglePopup("alert", true);
    }
  };


  const handleViewMoreDetails = (e, id) => {
    ;
    navigate('/itineraries/details', { state: { id } });
  };
  return (
    <div className={styles.itineraryPage}>
      <Header />
      <main className="page-center">
        {/* <h1 className={styles.eventCount}>{"1.240"} itinerarios disponibles</h1> */}
        <SearchBar state={state} setState={setState} cities={cities} />
        {!isAuthenticated && <LoginBanner handleNavigateToLogin={handleNavigateToLogin} styles={styles1} />}
        {itinerariesLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : (
          <ItineraryList visibleItineraries={visibleItineraries} handleViewMoreDetails={handleViewMoreDetails} handleActions={handleActions} />
        )}

        {loading ? <Loader /> : next && <SeeMoreButton
          onClick={loadMore}
          loading={loading}
          next={hasNext}
          translate={t}
        />
        }
        <RecommendedEvents />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ItineraryPage;
