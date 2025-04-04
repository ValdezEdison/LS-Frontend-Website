import React from "react";
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

const EventsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  }
  return (
    <div className={styles.eventsPage}>
      <Header />
      <main className="page-center">
        <h1 className={styles.eventCount}>1.230 eventos disponibles</h1>
        <EventSearch />
        <LoginBanner handleNavigateToLogin={handleNavigateToLogin} styles={styles1}/>
        <h2 className={styles.sectionTitle}>Eventos más populares</h2>
        <EventList />
        <div className={styles.showMoreWrapper}>
          <button className={styles.showMoreButton}>Mostrar más</button>
        </div>
        <hr className={styles.divider} />
        <PopularEvents />
        <AppPromotion />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default EventsPage;
