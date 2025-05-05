import React, { useState, useEffect, useContext, act } from "react";
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
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { futureTrips, pastTrips, futureTripsLoading, pastTripsLoading } = useSelector((state) => state.myTrips);

  const { isOpen } = useSelector((state) => state.popup);

  const { t } = useTranslation('MyTrips');

  const togglePopup = (name, state) => {
    setPopupState((prev) => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  useEffect(() => {
    dispatch(fetchMyFutureTrips(state.page));
    dispatch(fetchMyPastTrips(state.page));
  }, [dispatch, language, state.page]);

  const handleActions = (e, action, id) => {
    e.stopPropagation();
    if (action === 'showTripDetails') {
      navigate('/my-trips/details', { state: { id: id } });
    } else if (action === 'deleteTrip') {
      const trip = futureTrips.find(trip => trip.id === id) || pastTrips.find(trip => trip.id === id);
      console.log(trip, 'trip');
      setState(prev => ({ 
        ...prev, 
        tripName: trip?.title || '' 
      }));
      setState(prev => ({
        ...prev,
        tripId: id
      }))
      togglePopup("deleteConfirm", true);

    }else if (action === 'editTrip') {
      navigate('/my-trips/edit', { state: { id: id } });
    }
  };

   const handleConfirmDelete = () => {
      dispatch(deleteTrip())
        .unwrap()
        .then(() => {
      
        })
        .catch((error) => {
          
        });
    };

  return (
    <>
      {isOpen && popupState.deleteConfirm && (
        <Modal
          onClose={() => togglePopup("deleteConfirm", false)}
          customClass="modalSmTypeOne"
          hideCloseButton={true}
        >
          <ConfirmationPopup
            title={t('confirmationPopup.deleteTrip.title', { tripName: state.tripName })}
            description={t('confirmationPopup.deleteTrip.description', { tripName: state.tripName })}
            onCancel={() => {togglePopup("deleteConfirm", false)
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
              <button className={styles.addTripButton}>{t('addTripButton')}</button>
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