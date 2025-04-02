import React, { useEffect, useContext, useState, useCallback } from "react";
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
import { openPopup, closePopup, openAddToTripPopup, closeAddToTripPopup } from "../../../features/popup/PopupSlice";
import AlertPopup from "../../../components/popup/Alert/AlertPopup";
import AddToTripPopup from "../../../components/popup/AddToTrip/AddToTripPopup";
import { fetchTravelLiteList, fetchTravelTime, addTrip, generateLink, downloadTrip } from "../../../features/places/placesInfo/itinerary/ItineraryAction";
import { fetchCities } from "../../../features/common/cities/CityAction";
import { debounce } from 'lodash';
import { t } from "i18next";
import ShareOptions from "../../../components/common/ShareOptions";
import { resetShareableLink, resetDownloadedTrip } from "../../../features/places/placesInfo/itinerary/ItinerarySlice";

const ItineraryDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;

  const { language } = useContext(LanguageContext);

  const { loading, itineraryDetails, generatedLink, downloadedTrip } = useSelector((formState) => formState.itineriesInCity);
  const { isAuthenticated } = useSelector((formState) => formState.auth);

  const { isOpen, isAddToPopupOpen } = useSelector((formState) => formState.popup);
  const { geoLocations } = useSelector((formState) => formState.places);
  const { cities, loading: citiesLoading } = useSelector((formState) => formState.cities);

  const [popupState, setPopupState] = useState({
    map: false,
    gallery: false,
    reviewDrawer: false,
    alert: false,
    comment: false,
    deleteConfirm: false,
    success: false,
  });


  const [showShareOptions, setShowShareOptions] = useState(false);

  const [formState, setFormState] = useState({
    tripType: '',
    tripName: '',
    destination: '',
    startDate: null,
    endDate: null,
    destinationSearchQuery: "",
    destinationId: null,
    mode: 'driving',
  });

  const togglePopup = (name, formState) => {
    setPopupState((prev) => ({ ...prev, [name]: formState }));
    formState ? dispatch(openPopup()) : dispatch(closePopup());
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchItineraryDetails(id));
      dispatch(fetchTravelLiteList());
      dispatch(fetchCities({}));
      dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
    }
  }, [dispatch, id, language]);

  const handleViewMoreDetails = (id) => {
    ;
    navigate('/places/details', { formState: { id } });
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
      // Reset formStates when opening the popup

      setFormState({
        tripName: '',
        destination: '',
        startDate: null,
        endDate: null,
        destinationSearchQuery: "",
        destinationId: null,
        tripType: '',
      });
      setFormErrors({});
      setSelectedTripId(null);
      setIsCreatingNewTrip(false);

    } else {
      togglePopup("alert", true);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login', { formState: { from: location } });
  }

  const debouncedFetchCities = useCallback(
    debounce((query) => {
      dispatch(fetchCities({ searchQuery: query }));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    if (formState?.destinationSearchQuery?.trim()) {
      debouncedFetchCities(formState.destinationSearchQuery);
    } else {
      dispatch(fetchCities({}));
    }

    return () => debouncedFetchCities.cancel();
  }, [formState?.destinationSearchQuery, debouncedFetchCities, dispatch]);

  const [formErrors, setFormErrors] = useState({});
  const [isCreatingNewTrip, setIsCreatingNewTrip] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  const validateForm = () => {
    const errors = {};

    if (isCreatingNewTrip) {
      if (!formState.name) errors.name = 'Trip name is required';
      if (!formState.destinationId) errors.destination = 'Destination is required';
      if (!formState.startDate) errors.startDate = 'Start date is required';
      if (!formState.endDate) errors.endDate = 'End date is required';
    } else {
      if (!selectedTripId) errors.trip = 'Please select a trip';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isCreatingNewTrip) {
        const tripData = {
          name: formState.name,
          destination_id: formState.destinationId,
          start_date: formState.startDate.toISOString().split('T')[0],
          end_date: formState.endDate.toISOString().split('T')[0],
          itinerary_ids: [id]
        };
        dispatch(addTrip(tripData));
      } else {
        // Logic to add itinerary to existing trip would go here
        console.log('Adding to existing trip:', selectedTripId);
      }

      dispatch(closeAddToTripPopup());
      dispatch(closePopup());
    } catch (error) {
      console.error('Error adding trip:', error);
    }
  };

  console.log("formState", formState);

  useEffect(() => {
    if (formState.mode) {
      dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
    }
  }, [formState.mode, dispatch, id]);

  const handleGenerateLink = () => {
    console.log("idghrgdjhgdjtjythjtjtjyj", id);
    if (id) {
      dispatch(resetShareableLink());
      dispatch(generateLink(id));
    }
  }



  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  useEffect(() => {
    if (generatedLink) {
      setShowShareOptions(true);
    }

  }, [generatedLink])

  const handleClickDownloadTrip = () => {
    if (id) {
      dispatch(resetDownloadedTrip());
      dispatch(downloadTrip(id));
    }
  }

  useEffect(() => {
    if (downloadedTrip) {
      // Create a blob from the PDF data
      const blob = new Blob([downloadedTrip], { type: 'application/pdf' });
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${itineraryDetails?.title || 'itinerary'}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }, [downloadedTrip, itineraryDetails?.title]);

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
      {isOpen && isAddToPopupOpen && <AddToTripPopup closeModal={() => {
        dispatch(closeAddToTripPopup());
        dispatch(closePopup());
      }} state={formState} setState={setFormState} cities={cities} onSubmit={handleSubmit} formErrors={formErrors} setFormErrors={setFormErrors} />}
      {isOpen && popupState.alert && (
        <Modal
          onClose={() => togglePopup("alert", false)}
          customClass="modalSmTypeOne"
        >
          <AlertPopup handleNavigateToLogin={handleNavigateToLogin} title="Want to add a trip to your list?" description="Sign up or log in to add a trip and create itineraries to your liking." buttonText="Sign in or create an account" />
        </Modal>
      )}
      <div className={`${styles.itineraryDetailContainer} ${isAddToPopupOpen ? styles.overflowHide : ''}`}>
        <Header />
        <main className="page-center">
          <section className={styles.itineraryHeader}>
            <div className={styles.itenaryDetailTitle}>Detalle itinerario</div>
            <ItineraryMap places={itineraryDetails?.stops} formState={formState} setFormState={setFormState} />
            <div className={styles.itineraryInfo}>
              <h1 className={styles.itineraryTitle}>{itineraryDetails?.title}</h1>
              <div className={styles.itineraryActions}>
                <button className={styles.shareButton} aria-label="Compartir itinerario" onClick={handleClickDownloadTrip}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7d92ff5dd9197dd8e65a6dec460c67360b82ece179565a9e2535e4e5790d5e0d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                    alt=""
                    className={styles.shareIcon}
                  />
                </button>

                <div className={styles.shareIconWrapper}>
                  <button className={styles.shareBtnIcon} onClick={handleGenerateLink}></button>
                  {showShareOptions && (
                    <ShareOptions
                      url={generatedLink}
                      title={itineraryDetails?.title}
                      description={itineraryDetails?.description}
                      onClose={toggleShareOptions}
                    />
                  )}
                </div>
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