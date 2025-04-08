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
import { openPopup, closePopup, openAddToTripPopup } from "../../features/popup/PopupSlice";
import AlertPopup from "../../components/popup/Alert/AlertPopup";
import Modal from "../../components/modal/Modal";
import { toggleFavorite } from "../../features/places/PlaceAction";
import { setFavTogglingId } from "../../features/events/EventSlice";
import { LanguageContext } from "../../context/LanguageContext";
import MapPopup from "../../components/common/MapPopup";
import { fetchGeoLocations } from "../../features/places/PlaceAction";
import FilterPanel from "../../components/popup/FilterPanel/FilterPanel";

const EventsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);

  const { loading: eventLoading, error, next, count, events} = useSelector((state) => state.events);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: visibleEvents, loading, next: hasNext, loadMore } = useSeeMore(events, next);
  const { isOpen } = useSelector((state) => state.popup);

  const { t } = useTranslation('places');

  const [state, setState] = useState({
    selectedLevel: "",
    selectedDateRange: { startDate: null, endDate: null },
    page: 1,
    type: "event",
  });

  const [popupState, setPopupState] = useState({
    map: false,
    gallery: false,
    reviewDrawer: false,
    alert: false,
    comment: false,
    deleteConfirm: false,
    success: false,
    filterPanel: false
  });

  useEffect(() => {
    dispatch(fetchEvents({ type: state.type, page: state.page }));
    dispatch(fetchGeoLocations({type: state.type}));
  }, [dispatch, state.type, state.page, language]);

  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

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


  const handleViewMoreDetails = (e,id) => {
    ;
    navigate('/events/details', { state: { id } });
  };

  return (
    <>
      {isOpen && popupState.alert && (
        <Modal
          onClose={() => togglePopup("alert", false)}
          customClass="modalSmTypeOne"
        >
          <AlertPopup handleNavigateToLogin={handleNavigateToLogin} title="Log in and save time" description="Sign in to save your favorites and create new itineraries on Local Secrets." buttonText="Sign in or create an account" />
        </Modal>
      )}

      {isOpen && popupState.map && (
      
          <MapPopup onClose={() => togglePopup("map", false)} state={state} setState={setState} handleActions={handleActions}/>
      )}

      {isOpen && popupState.filterPanel && (
          <FilterPanel onClose={() => togglePopup("filterPanel", false)} />
      )}

      <div className={styles.eventsPage}>
        <Header />
        <main className="page-center">
          <h1 className={styles.eventCount}>{count} eventos disponibles</h1>
          <EventSearch togglePopup={togglePopup} />
          {!isAuthenticated && <LoginBanner handleNavigateToLogin={handleNavigateToLogin} styles={styles1} />}
          <h2 className={styles.sectionTitle}>Eventos más populares</h2>
          <EventList events={visibleEvents} handleActions={handleActions} />
          <div className={styles.showMoreWrapper}>
            {/* <button className={styles.showMoreButton}>Mostrar más</button> */}
            {loading ? <Loader /> : next && <SeeMoreButton
              onClick={loadMore}
              loading={loading}
              next={hasNext}
              translate={t}
            />
            }
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
