import React, { useEffect, useContext, useState } from "react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import ItineraryCard from "../../../components/PlacesInfo/Itineries/ItineraryCard";
import RelatedContent from "../../../components/PlacesInfo/Itineries/RelatedContent";
import styles from "./ItineraryDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchItineraryDetails } from "../../../features/places/placesInfo/itinerary/ItineraryAction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the skeleton styles
import CardSkeleton from "../../../components/skeleton/common/CardSkeleton";
import { WidgetSkeleton } from "../../../components/skeleton/common/WidgetSkeleton";
import ItineraryMap from "../../../components/PlacesInfo/Itineries/ItineraryMap";
import { LanguageContext } from "../../../context/LanguageContext";
import Modal from "../../../components/modal/Modal";
import { openPopup, closePopup, openAddToTripPopup } from "../../../features/popup/PopupSlice";
import AlertPopup from "../../../components/popup/Alert/AlertPopup";

const ItineraryDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;

  const { language } = useContext(LanguageContext);

  const { loading, itineraryDetails } = useSelector((state) => state.itineriesInCity);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { isOpen } = useSelector((state) => state.popup);

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
    if (id) {
      dispatch(fetchItineraryDetails(id));
    }
  }, [dispatch, id, language]);

  const handleViewMoreDetails = (id) => {
    ;
    navigate('/places/details', { state: { id } });
  };

  const handleActions = (e, action, id) => {
    e.stopPropagation();
    if (action === 'addToFavorites') {
      handleFavClick(e, id);
    } else if (action === 'addToTrip') {
      handleTripClick(e, id);
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
      navigate('/places/itineraries', { state: { id } });
    } else {
      togglePopup("alert", true);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  }

  if (loading) {
    return (
      <>
       
        <div className={styles.itineraryDetailContainer}>
          <Header />
          <main className="page-center">
            {/* Skeleton for the header section */}
            <section className={styles.itineraryHeader}>
              <Skeleton height={30} width={200} className={styles.itenaryDetailTitle} />
              <div className={styles.itenaryMapFrame}>
                <Skeleton height={300} />
              </div>
              <div className={styles.itineraryInfo}>
                <Skeleton height={40} width={300} className={styles.itineraryTitle} />
                <div className={styles.itineraryActions}>
                  <Skeleton height={40} width={100} className={styles.shareButton} />
                  <Skeleton height={40} width={100} className={styles.shareButton} />
                  <Skeleton height={40} width={150} className={styles.shareButton} />
                </div>
              </div>
              <div className={styles.itenaryTagWrapper}>
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} height={25} width={80} className={styles.itineraryTag} />
                ))}
              </div>
              <Skeleton height={20} width={100} className={styles.itineraryMeta} />
            </section>

            {/* Skeleton for the itinerary places section */}
            <section className={styles.itineraryPlaces}>
              {[...Array(4)].map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <CardSkeleton />
                </div>
              ))}
            </section>
            <WidgetSkeleton />
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
     {isOpen && popupState.alert && (
          <Modal
            onClose={() => togglePopup("alert", false)}
            customClass="modalSmTypeOne"
          >
            <AlertPopup handleNavigateToLogin={handleNavigateToLogin} title="Want to add a trip to your list?" description="Sign up or log in to add a trip and create itineraries to your liking." buttonText="Sign in or create an account" />
          </Modal>
        )}
      <div className={styles.itineraryDetailContainer}>
        <Header />
        <main className="page-center">
          <section className={styles.itineraryHeader}>
            <div className={styles.itenaryDetailTitle}>Detalle itinerario</div>
            <ItineraryMap />
            <div className={styles.itineraryInfo}>
              <h1 className={styles.itineraryTitle}>{itineraryDetails?.title}</h1>
              <div className={styles.itineraryActions}>
                <button className={styles.shareButton} aria-label="Compartir itinerario">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7d92ff5dd9197dd8e65a6dec460c67360b82ece179565a9e2535e4e5790d5e0d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                    alt=""
                    className={styles.shareIcon}
                  />
                </button>
                <button className={styles.shareBtnIcon}></button>
                <button className={styles.addToTripButton} onClick={(e) => handleActions(e, 'addToTrip', itineraryDetails?.id)}>
                  <span className={styles.addIcon}></span>
                  Añadir a viaje
                </button>
              </div>
            </div>
            <div className={styles.itenaryTagWrapper}>
              {itineraryDetails?.tags.map((tag, index) => (
                <div key={index} className={styles.itineraryTag}>
                  <span className={styles.tagText}>#{tag.title}</span>
                </div>
              ))}
            </div>
            <p className={styles.itineraryMeta}>{`${itineraryDetails?.num_of_stops} paradas`}</p>
          </section>
          <section className={styles.itineraryPlaces}>
            {itineraryDetails?.stops && itineraryDetails.stops.length > 0 ? (
              // Render itinerary stops if available
              itineraryDetails.stops.map((stop, index) => (
                <ItineraryCard key={stop.id} place={stop} index={index + 1} handleViewMoreDetails={handleViewMoreDetails} />
              ))
            ) : (
              // Show "No results" message if no stops are found
              <div className="no-results-wrapper">No stops available</div>
            )}
          </section>
          <RelatedContent />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ItineraryDetail;