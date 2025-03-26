import React, { useEffect, useRef, useState, useContext } from "react";
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
import EventCardSkeleton from "../../../components/skeleton/PlacesPage/PlacesInfo/events/EventCardSkeleton";
import { fetchPlacesFilterCategories } from "../../../features/places/PlaceAction";
import { openPopup, closePopup } from "../../../features/popup/PopupSlice";
import MapPopup from "../../../components/common/MapPopup";
import SelectedItemList from "../../../components/common/SelectedItemList";
import styles2 from "../../../components/PlacesPage/MainContent.module.css";
import { LanguageContext } from "../../../context/LanguageContext";

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
   const { language } = useContext(LanguageContext);
  const { loading: eventLoading, error, events, next } = useSelector((state) => state.eventsByCity);
  const { loading: destinationLoading, destination } = useSelector((state) => state.destination);
  const { data: visibleEvents, loading, next: hasNext, loadMore } = useSeeMore(events, next);
  const { loading: placesFilterCategoriesLoading, categories } = useSelector((state) => state.places);
  const { isOpen } = useSelector((state) => state.popup);

  const [showMapPopup, setShowMapPopup] = useState(false);



  const { t } = useTranslation('Places');

  const { id } = location.state || {};
  ;

  const [state, setState] = useState({
    selectedLevel: "",
    latAndLng: "",
    selectedDateRange: { startDate: null, endDate: null },
  })

  useEffect(() => {
    if (id) {
      dispatch(fetchEventsByCityId({ city_id: id, page: 1, type: 'event', levels: state.selectedLevel }));
      dispatch(fetchPlacesFilterCategories({ page: 1, type: 'place', cityId: id }));
    }
  }, [dispatch, id, state.selectedLevel, language]);



  const handleShowMapPopup = () => {
    setShowMapPopup(true);
    setState({ ...state, latAndLng: "" });
    dispatch(openPopup());
  };

  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
    dispatch(closePopup());
  };


  // Define filters array
  const filters = [
    {
      label: "Select Date Range",
      type: "datePicker",
      selectedId: state.selectedDateRange,
      onSelect: (dates) => {
          setState((prevState) => ({
              ...prevState,
              selectedDateRange: dates || { startDate: null, endDate: null }, // Fallback to default
          }));
      },
  },
    {
      label: "Select Level",
      type: "select",
      options: categories.map(category => ({ id: category.id, title: category.title })),
      selectedId: state.selectedLevel,
      onSelect: (value) => {
        setState((prevState) => ({
          ...prevState,
          selectedLevel: value,

        }));
      },
    },
  ];


  return (
    <>
      {isOpen && showMapPopup && <MapPopup onClose={handleCloseMapPopup} state={state} setState={setState} />}

      <Header />
      <main className="page-center">
        <h1 className={styles.pageTitle}>{destination?.name}, {destination?.country?.name}</h1>
        <SubNavMenu activeLink="eventos" />

        <div className={styles.searchSection}>
          <div className={styles.mapButtonContainer}>
            <button className={styles.mapButton} onClick={handleShowMapPopup}>Ver mapa</button>
          </div>
          <div className={styles.filterContainer}>
            <FilterBar filters={filters} />
          </div>
        </div>
        <div className={styles2.placesSelectedItemsList}>
          <SelectedItemList
            state={state}
            setState={setState}
            categories={categories}
            translate={t}
            type="submenu-events"
          />
        </div>
        <section className={styles.eventsSection}>
          <h2 className={styles.sectionTitle}>
            Eventos más populares en Atenas
          </h2>
          <div className={styles.eventGrid}>
            {eventLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))
            ) : visibleEvents.length > 0 && (
              // Render visible events if available
              visibleEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))
            )}
          </div>

         {visibleEvents.length === 0 && <div className="no-results-wrapper">There are currently no events published for this city.</div>}
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
