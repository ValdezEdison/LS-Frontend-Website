import React, { useState, useEffect, useContext, useRef } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import TripList from "../../components/TravelComponents/TripList";
import styles from "./MyTrips.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyFutureTrips, fetchMyPastTrips, deleteTrip } from "../../features/myTrips/MyTripsAction";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { listUpdater } from "../../features/myTrips/MyTripsSlice";
import { useTranslation } from "react-i18next";
import { openPopup, closePopup } from "../../features/popup/PopupSlice"
import ConfirmationPopup from "../../components/popup/Confirmation/ConfirmationPopup";
import Modal from "../../components/modal/Modal";
import Skeleton from "react-loading-skeleton";
import { useAddTrip } from "../../hooks/useAddTrip";
import AddToTripPopup from "../../components/popup/AddToTrip/AddToTripPopup";
import AddTripPopup from "../../components/popup/AddToTrip/AddTripPopup";
import AlertPopup from "../../components/popup/Alert/AlertPopup";
import SuccessMessagePopup from "../../components/popup/SuccessMessage/SuccessMessagePopup";
import { Close, Warning } from "../../components/common/Images";

const MyTrips = () => {
  const [state, setState] = useState({
    page: 1,
    tripName: '',
    tripId: null
  });

  const [popupState, setPopupState] = useState({
    map: false,
    gallery: false,
    reviewDrawer: false,
    alert: false,
    comment: false,
    deleteConfirm: false,
    success: false,
    warning: false
  });

  const deleteTimerRef = useRef(null);

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { futureTrips, pastTrips, futureTripsLoading, pastTripsLoading } = useSelector((state) => state.myTrips);
  const { cities } = useSelector((state) => state.cities);

  const { isOpen } = useSelector((state) => state.popup);

  const { t } = useTranslation('MyTrips');

  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  useEffect(() => {
    dispatch(fetchMyFutureTrips(state.page));
    dispatch(fetchMyPastTrips(state.page));
  }, [dispatch, language, state.page]);

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

      case 'addToStop':
        setFormState(prev => ({
          ...prev,
          stops: [...prev.stops, id]
        }));
        break;
      case 'showTripDetails':
        navigate('/my-trips/details', { state: { id: id } });
        break;
      case 'deleteTrip':
        const trip = futureTrips.find(trip => trip.id === id) || pastTrips.find(trip => trip.id === id);
        console.log(trip, 'trip');
        setState(prev => ({
          ...prev,
          tripName: trip?.title || ''
        }));
        setState(prev => ({
          ...prev,
          tripId: id
        }));
        togglePopup("deleteConfirm", true);
        break;
      case 'editTrip':
        navigate('/my-trips/edit', { state: { id: id } });
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

  const handleConfirmDelete = () => {
    togglePopup("deleteConfirm", false);
    togglePopup("warning", true);

    deleteTimerRef.current = setTimeout(() => {
      dispatch(deleteTrip(state.tripId))
        .unwrap()
        .then(() => {
          togglePopup("warning", false);
          // Refresh trips list
          dispatch(fetchMyFutureTrips(state.page));
          dispatch(fetchMyPastTrips(state.page));
        })
        .catch((error) => {
          console.error("Failed to delete trip:", error);
          togglePopup("warning", false);
        });
    }, 5000);
  };


  const handleUndoDelete = () => {
    // Clear the timer if undo is clicked
    clearTimeout(deleteTimerRef.current);
    togglePopup("warning", false);
    setState(prev => ({
      ...prev,
      tripId: null
    }));
  };

  const handleCloseToaster = () => {
    // Clear the timer if user closes the toaster
    clearTimeout(deleteTimerRef.current);
    togglePopup("warning", false);
    setState(prev => ({
      ...prev,
      tripId: null
    }));
  };

  // Clean up the timer when component unmounts
  useEffect(() => {
    return () => {
      if (deleteTimerRef.current) {
        clearTimeout(deleteTimerRef.current);
      }
    };
  }, []);


  const modalSearchProps = {
    activeDestinationIndex,
    setActiveDestinationIndex,
    citiesSearchResults,
    isSearchingCities,
    updateDestination
  };

  useEffect(() => {
    if (isAddToPopupOpen || tripPopupState.addTripPopup) {
      document.body.classList.add('overflowHide');
    } else {
      document.body.classList.remove('overflowHide');
    }

    // Cleanup: Remove class when component unmounts
    return () => {
      document.body.classList.remove('overflowHide');
    };
  }, [isAddToPopupOpen, tripPopupState.addTripPopup]);

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
      {isOpen && popupState.deleteConfirm && (
        <Modal
          onClose={() => togglePopup("deleteConfirm", false)}
          customClass="modalSmTypeOne"
          hideCloseButton={true}
        >
          <ConfirmationPopup
            title={t('confirmationPopup.deleteTrip.title', { tripName: state.tripName })}
            description={t('confirmationPopup.deleteTrip.description', { tripName: state.tripName })}
            onCancel={() => {
              togglePopup("deleteConfirm", false)
              setState(prev => ({
                ...prev,
                tripId: null
              }))
            }}
            onConfirm={handleConfirmDelete}
          />
        </Modal>
      )}

      <div className={styles.myTrips}>
        {isOpen && popupState.warning && (
          <div className={styles.warningToaster}>
            <div className={styles.warningToasterLeft}><img src={Warning} alt={t('myTrips.toast.warning')}/> {t('myTrips.toast.tripDeleted')}</div>
            <div className={styles.warningToasterRight}>  <span className={styles.undoButton} onClick={handleUndoDelete}>{t('myTrips.toast.undo')}</span> <span className={styles.closeButton} onClick={handleCloseToaster}><img src={Close} alt={t('myTrips.toast.close')}/></span></div>
          </div>
        )}

        <Header />
        <main className={styles.mainContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>   {futureTripsLoading || pastTripsLoading ? (
              <Skeleton width={200} />
            ) : (
              t('pageTitle')
            )}
            </h1>
            {futureTripsLoading || pastTripsLoading ? (
              <Skeleton width={120} height={40} />
            ) : (
              <button className={styles.addTripButton} onClick={(e) => handleActions(e, 'addToTrip', null, 'new')}>{t('addTripButton')}</button>
            )}
          </div>
          <div className={styles.divider} />
          {/* {futureTrips?.length > 0 && ( */}
          <TripList
            title={t('futureTrips')}
            trips={futureTrips}
            isPast={false}
            handleActions={handleActions}
            isLoading={futureTripsLoading}
          />
          {/* )} */}
          {/* {pastTrips?.length > 0 && ( */}
          <TripList
            title={t('pastTrips')}
            trips={pastTrips}
            isPast={true}
            handleActions={handleActions}
            isLoading={pastTripsLoading}
          />
          {/* )} */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MyTrips;