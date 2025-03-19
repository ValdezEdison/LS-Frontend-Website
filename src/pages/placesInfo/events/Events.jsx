import React, { useEffect } from "react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import EventCard from "../../../components/PlacesInfo/Events/EventCard";
import RecommendedEvent from "../../../components/PlacesInfo/Events/RecommendedEvent";
import styles from "./Events.module.css";
import SubNavMenu from "../../../components/common/SubNavMenu";
import { fetchEventsByCityId } from "../../../features/places/placesInfo/events/EventAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FilterBar from "../../../components/common/FilterBar";
import useSeeMore from "../../../hooks/useSeeMore";
import Loader from "../../../components/common/Loader";
import SeeMoreButton from "../../../components/common/SeeMoreButton";
import { useTranslation } from 'react-i18next';

// const popularEvents = [
//   {
//     title: "Underdogs gallery",
//     location: "Londres, United Kingdom",
//     date: "Dom, 5 may, 19:00",
//     category: "Exposiciones",
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/e7d7f7b2b118d321a14951f0610c7d146958ec05",
//   },
//   {
//     title: "Concierto música clásica",
//     location: "Roma, Italia",
//     date: "Dom, 5 may, 19:00",
//     category: "Concierto",
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/c09c31a4f2d6dd0954ed8f3c4db36f4df2bd87f1",
//   },
//   {
//     title: "Amnesia Ibiza",
//     location: "Ibiza, Islas Baleares",
//     date: "Dom, 5 may, 19:00",
//     category: "Vida nocturna",
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/93a95bf48875334de43e84bcd1014d73b8f28f8a",
//   },
//   {
//     title: "Teatro Piccolo",
//     location: "Milán, Italia",
//     date: "Dom, 5 may, 19:00",
//     category: "Obras de teatro",
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/2b9f21b518a6c2ed09633f72535059eb44a730fa",
//   },
// ];

const recommendedEvents = [
  {
    title: "Kensington Dollshouse Festival",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/40931c085bffa3ac5e5d7f41ef51ecfe5c77c819",
  },
  {
    title: "Summer Social 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/40931c085bffa3ac5e5d7f41ef51ecfe5c77c819",
  },
  {
    title: "Open Bar Afro Caribbean",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/dd8283b2c6cf2f47b20143530ae9cd5605d37d9a",
  },
  {
    title: "Asbury Park Vegan Food Festival",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/86c884c27449396d500c38a043d02ab9574d0223",
  },
];

const Events = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const { loading: eventLoading, error, events, next } = useSelector((state) => state.eventsByCity);
  const { data: visibleEvents, loading, next: hasNext, loadMore } = useSeeMore(events, next);

  const { t } = useTranslation('Places');

  const { id } = location.state || {};
  console.log(id, 'id in Events');

  useEffect(() => {
    if (id) {
      dispatch(fetchEventsByCityId({ city_id: id, page: 1, type: 'event' }));
    }
  }, [dispatch, id]);
  return (
    <>
      <Header />
      <main className="page-center">
        <h1 className={styles.pageTitle}>Atenas, Grecia</h1>
        <SubNavMenu activeLink="eventos" />
        {/* <div className={styles.divider} /> */}
        <div className={styles.searchSection}>
          <button className={styles.mapButton}>Ver mapa</button>
          <form className={styles.searchForm}>
            <div className={styles.inputWrapper}>
              <label htmlFor="dateInput" className={styles.srOnly}>
                Fechas
              </label>
              <input
                id="dateInput"
                type="text"
                className={styles.searchInput}
                placeholder="Selecciona un rango de fechas"
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="searchInput" className={styles.srOnly}>
                Buscar
              </label>
              <input
                id="searchInput"
                type="text"
                className={styles.searchInput}
                placeholder="Selecciona una búsqueda"
              />
            </div>
          </form>
        </div>
        <section className={styles.eventsSection}>
          <h2 className={styles.sectionTitle}>
            Eventos más populares en Atenas
          </h2>
          <div className={styles.eventGrid}>
            {visibleEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
          {/* <button className={styles.showMoreButton}>Mostrar más</button> */}
          {loading ? <Loader /> : <SeeMoreButton
        onClick={loadMore}
        loading={loading}
        next={hasNext}
        translate={t}
      />
      }
        </section>
        <div className={styles.divider} />
        <section className={styles.recommendedSection}>
          <h2 className={styles.sectionTitle}>
            Otras personas tambien han visto
          </h2>
          <div className={styles.recommendedGrid}>
            {recommendedEvents.map((event, index) => (
              <RecommendedEvent key={index} {...event} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Events;
