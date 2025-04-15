import React, { useState, useEffect, useContext, act } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import TripList from "../../components/TravelComponents/TripList";
import styles from "./MyTrips.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyFutureTrips, fetchMyPastTrips } from "../../features/myTrips/MyTripsAction";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const MyTrips = () => {
  const [state, setState] = useState({
    page: 1,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { futureTrips, pastTrips } = useSelector((state) => state.myTrips);

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
          <h1 className={styles.pageTitle}>Mis viajes</h1>
          <button className={styles.addTripButton}>Añadir viaje</button>
        </div>
        <div className={styles.divider} />
        {futureTrips?.length > 0 && (
          <TripList
            title="Viajes futuros"
            trips={futureTrips}
            isPast={false}
            handleActions={handleActions}
          />
        )}
        {pastTrips?.length > 0 && (
          <TripList
            title="Viajes pasados"
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