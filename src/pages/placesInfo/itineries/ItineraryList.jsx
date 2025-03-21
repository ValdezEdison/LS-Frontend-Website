import React from "react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import SearchFilters from "../../../components/PlacesInfo/Places/SearchFilters";
import RecommendedPlaces from "../../../components/PlacesInfo/Places/RecommendedPlaces";
import commonStyle from "../Common.module.css"
import SubNavMenu from "../../../components/common/SubNavMenu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceCard from "../../../components/common/PlaceCard";
import styles from "../places/Places.module.css"
import { useTranslation } from "react-i18next";
import useSeeMore from "../../../hooks/useSeeMore";
import Loader from "../../../components/common/Loader";
import SeeMoreButton from "../../../components/common/SeeMoreButton";
import { Arrow } from "../../../components/common/Images";
import styles2 from "../../../components/common/PlaceCard.module.css"
import { fetchItineriesInCity } from "../../../features/places/placesInfo/itinerary/ItineraryAction";
import CardSkeleton from "../../../components/skeleton/common/CardSkeleton";
import FilterBar from "../../../components/common/FilterBar";


const ItineraryList = () => {

  const { t } = useTranslation('Places');

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: itineriesLoading, error, itineries, next, count } = useSelector((state) => state.itineriesInCity);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading: destinationLoading, destination } = useSelector((state) => state.destination);
  const { data: visiblePlaces, loading, next: hasNext, loadMore } = useSeeMore(itineries, next);
  const { isOpen } = useSelector((state) => state.popup);

  const [showArrow, setShowArrow] = useState(true);

  const { id } = location.state || {}

  const placesListRef = useRef(null);
  const mainRef = useRef(null);
  const gotoTopButtonRef = useRef(null);
  const placesListBreakerRef = useRef(null);

  
    const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchItineriesInCity(id));
    }
  }, [dispatch]);

  const handleViewMoreDetails = (id) => {
    console.log(id, 'handleViewMoreDetails');
    navigate('/places/itineraries-details', { state: { id } });
  };


  const getResponsiveOffset = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) return -20; // Smaller tablets
    if (screenWidth <= 1160) return -5; // Small screens
    if (screenWidth <= 1280) return 0; // Slightly larger screens
    if (screenWidth <= 1350) return 10;   // Medium screens

    return 30;                           // Large screens
  };

  const updateButtonPosition = () => {
    if (placesListRef.current && mainRef.current && gotoTopButtonRef.current) {
      const mainWrapperLeftPosition = mainRef.current.getBoundingClientRect().left;

      const leftPosition = placesListRef.current.getBoundingClientRect().left;
      const placesListWidth = placesListRef.current.offsetWidth;
      const final = leftPosition + placesListWidth;
      const offset = getResponsiveOffset();

      if (final) {
        gotoTopButtonRef.current.style.left = `${final + offset}px`;
      }

    }
  };

  useEffect(() => {
    // Initial position calculation
    updateButtonPosition();

    // Handle resize event
    window.addEventListener('resize', updateButtonPosition);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', updateButtonPosition);
    };
  }, []);



  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const arrowButton = gotoTopButtonRef.current?.getBoundingClientRect();
      const breaker = placesListBreakerRef.current?.getBoundingClientRect();

      if (arrowButton && breaker) {
        if (
          arrowButton.bottom >= breaker.top &&
          window.scrollY > lastScrollY
        ) {
          // Scrolling down and elements meet — hide the arrow
          setShowArrow(false);
        } else if (
          breaker.top > window.innerHeight &&
          window.scrollY < lastScrollY
        ) {
          // Scrolling up and passed the breaker — show the arrow
          setShowArrow(true);
        }
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const sortOrder = [
    { id: 1, name: "All" },
    { id: 2, name: "Most Recent" },
    { id: 3, name: "Highest Rated" },
    { id: 4, name: "Our Recommendation" },
  ];

  // Define filters array
  const filters = [
  
    {
      label: "Select Order",
      type: "select",
      options: sortOrder,
      selectedId: selectedOrderId,
      onSelect: (value) => setSelectedOrderId(value),
    },
  ];

  return (
    // <div className={styles.athenasPlaces}>
    <>
      <Header />
      <main className="page-center" ref={mainRef}>
        <h1 className={commonStyle.pageTitle}>{destination?.name}, {destination?.country?.name}</h1>
        <SubNavMenu activeLink="lugares" />
        <div className={styles.searchFilters}>
          <div className="">

          </div>
          <div className={styles.filterContainer}>
          <FilterBar filters={filters}/>
          </div>
        </div>
        <p className={commonStyle.availablePlaces}>{count} lugares disponibles</p>
        <div className={styles.placesList} ref={placesListRef}>
          <button
            style={{
              display: showArrow && !isOpen && !loading && visiblePlaces.length > 0 ? 'block' : 'none'
            }}

            className={styles2.gotoTopButton}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            ref={gotoTopButtonRef}
          >
            <img src={Arrow} alt="arrow" />
          </button>
          {itineriesLoading ?
            (Array.from({ length: 5 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
            )  : visiblePlaces.length > 0 ? (
              visiblePlaces.map((place, index) => (
                <PlaceCard
                  key={index}
                  place={place}
                  translate={t}
                  isAuthenticated={isAuthenticated}
                  handleViewMoreDetails={handleViewMoreDetails}
                />
              ))
            ) : (
              <div className="no-results-wrapper">No results</div>
            )}
          {loading ? <Loader /> : <SeeMoreButton
            onClick={loadMore}
            loading={loading}
            next={hasNext}
            translate={t}
          />
          }
        </div>
        <div className={styles.placesListbreaker} ref={placesListBreakerRef}></div>
        <RecommendedPlaces />
      </main>
      <Footer />
      {/* </div> */}
    </>
  );
};

export default ItineraryList;
