import React, { useState, useEffect, useContext, act } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import TripList from "../../components/TravelComponents/TripList";
import styles from "./MyTrips.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyFutureTrips, fetchMyPastTrips } from "../../features/myTrips/MyTripsAction";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { listUpdater } from "../../features/myTrips/MyTripsSlice";
import { useTranslation } from "react-i18next";

const MyTrips = () => {
  const [state, setState] = useState({
    page: 1,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { futureTrips, pastTrips, futureTripsLoading, pastTripsLoading } = useSelector((state) => state.myTrips);

  const { t } = useTranslation('MyTrips');

  useEffect(() => {
    dispatch(fetchMyFutureTrips(state.page));
    dispatch(fetchMyPastTrips(state.page));
  }, [dispatch, language, state.page]);

  const handleActions = (e, action, id) => {
    
    if(action === 'showTripDetails') {
      navigate('/my-trips/details', { state: { id: id } });
    }
  };

  return (
    <div className={styles.myTrips}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.pageTitle}>{t('pageTitle')}</h1>
          <button className={styles.addTripButton}>{t('addTripButton')}</button>
        </div>
        <div className={styles.divider} />
        {futureTrips?.length > 0 && (
          <TripList
            title={t('futureTrips')}
            trips={futureTrips}
            isPast={false}
            handleActions={handleActions}
          />
        )}
        {pastTrips?.length > 0 && (
          <TripList
            title={t('pastTrips')}
            trips={pastTrips}
            isPast={true}
            handleActions={handleActions}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyTrips;