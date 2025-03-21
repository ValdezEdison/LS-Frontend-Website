import React, { useState } from "react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import SearchFilters from "../../../components/PlacesInfo/Places/SearchFilters";
import RecommendedPlaces from "../../../components/PlacesInfo/Places/RecommendedPlaces";
import commonStyle from "../Common.module.css";
import SubNavMenu from "../../../components/common/SubNavMenu";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlacesInCity } from "../../../features/places/placesInfo/places/PlacesAction";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceCard from "../../../components/common/PlaceCard";
import styles from "./Places.module.css";
import { useTranslation } from "react-i18next";
import useSeeMore from "../../../hooks/useSeeMore";
import Loader from "../../../components/common/Loader";
import SeeMoreButton from "../../../components/common/SeeMoreButton";
import { Arrow } from "../../../components/common/Images";
import styles2 from "../../../components/common/PlaceCard.module.css";
import CardSkeleton from "../../../components/skeleton/common/CardSkeleton";
import { fetchPlacesFilterCategories } from "../../../features/places/PlaceAction";
import FilterBar from "../../../components/common/FilterBar";
import { openPopup, closePopup } from "../../../features/popup/PopupSlice";
import MapPopup from "../../../components/common/MapPopup";
import SelectedItemList from "../../../components/common/SelectedItemList";
import styles3 from "../../../components/PlacesPage/MainContent.module.css"

const Places = () => {
    const { t } = useTranslation('Places');
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading: placesLoading, error, placesList, next, count } = useSelector((state) => state.placesInCity);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { loading: destinationLoading, destination } = useSelector((state) => state.destination);
    const { loading: placesFilterCategoriesLoading, categories } = useSelector((state) => state.places);
    const { data: visiblePlaces, loading, next: hasNext, loadMore } = useSeeMore(placesList, next);
    const { isOpen } = useSelector((state) => state.popup);

      const [showMapPopup, setShowMapPopup] = useState(false);

    // Consolidated state for all relevant states in the Places page
    const [state, setState] = useState({
        selectedLevel: null, // For filter level
        selectedCategory: null, // For filter category
        selectedSubcategory: null, // For filter subcategory
        showArrow: true, // For scroll-to-top button visibility
        page: 1, // For pagination
        latAndLng:""
    });

    const placesListRef = useRef(null);
    const mainRef = useRef(null);
    const gotoTopButtonRef = useRef(null);
    const placesListBreakerRef = useRef(null);

    const { id } = location.state || {};

    useEffect(() => {
        if (id) {
            dispatch(fetchPlacesInCity({ cityId: id, page: 1, type: 'place' }));
            dispatch(fetchPlacesFilterCategories({ page: 1, type: 'place', cityId: id }));
        }
    }, [dispatch, id]);




    useEffect(() => {
      if (id) {
          dispatch(fetchPlacesInCity({
              cityId: id,
              page: state.page,
              type: 'place',
              levels: state.selectedLevel,
              categories: state.selectedCategory,
              subcategories: state.selectedSubcategory,
          }));
          
      }
  }, [dispatch, id, state.page, state.selectedLevel, state.selectedCategory, state.selectedSubcategory]);


    const handleViewMoreDetails = (id) => {
        navigate('/places/details', { state: { id } });
    };

    const getResponsiveOffset = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) return -20;
        if (screenWidth <= 1160) return -5;
        if (screenWidth <= 1280) return 0;
        if (screenWidth <= 1350) return 10;
        return 30;
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
        updateButtonPosition();
        window.addEventListener('resize', updateButtonPosition);
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
                if (arrowButton.bottom >= breaker.top && window.scrollY > lastScrollY) {
                    setState((prevState) => ({ ...prevState, showArrow: false }));
                } else if (breaker.top > window.innerHeight && window.scrollY < lastScrollY) {
                    setState((prevState) => ({ ...prevState, showArrow: true }));
                }
            }

            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const filters = [
        {
            label: "Select Level",
            type: "select",
            options: categories.map(category => ({ id: category.id, title: category.title })),
            selectedId: state.selectedLevel,
            onSelect: (value) => {
                setState((prevState) => ({
                    ...prevState,
                    selectedLevel: value,
                    selectedCategory: null,
                    selectedSubcategory: null,
                }));
            },
        },
        {
            label: "Select Category",
            type: "select",
            options: state.selectedLevel
                ? categories.find(cat => cat.id === state.selectedLevel)?.categories || []
                : [],
            selectedId: state.selectedCategory,
            onSelect: (value) => {
                setState((prevState) => ({
                    ...prevState,
                    selectedCategory: value,
                    selectedSubcategory: null,
                }));
            },
        },
        {
            label: "Select Subcategory",
            type: "select",
            options: state.selectedCategory
                ? categories
                    .find(cat => cat.id === state.selectedLevel)
                    ?.categories.find(c => c.id === state.selectedCategory)?.subcategories || []
                : [],
            selectedId: state.selectedSubcategory,
            onSelect: (value) => {
                setState((prevState) => ({ ...prevState, selectedSubcategory: value }));
            },
        },
    ];


     const handleShowMapPopup = () => {
        setShowMapPopup(true);
        setState({ ...state, latAndLng: "" });
        dispatch(openPopup());
      };
    
        const handleCloseMapPopup = () => {
          setShowMapPopup(false);
          dispatch(closePopup());
        };
    

    return (
        <>
          {isOpen && showMapPopup && <MapPopup onClose={handleCloseMapPopup} state={state} setState={setState} />}
            <Header />
            <main className="page-center" ref={mainRef}>
                <h1 className={commonStyle.pageTitle}>{destination?.name}, {destination?.country?.name}</h1>
                <SubNavMenu activeLink="lugares" />
                <div className={styles.searchFilters}>
                    <div className={styles.mapButtonContainer}>
                        <button className={styles.mapButton} onClick={handleShowMapPopup}>Ver mapa</button>
                    </div>
                    <div className={styles.filterContainer}>
                        <FilterBar filters={filters} />
                    </div>
                </div>
                <div className={styles3.placesSelectedItemsList}>
                <SelectedItemList
                    state={state}
                    setState={setState}
                    categories={categories}
                    translate={t}
                    type="submenu-places"
                />
                </div>
                <p className={commonStyle.availablePlaces}>{count} lugares disponibles</p>
                <div className={styles.placesList} ref={placesListRef}>
                    <button
                        style={{
                            display: state.showArrow && !isOpen && !loading && visiblePlaces.length > 0 ? 'block' : 'none'
                        }}
                        className={styles2.gotoTopButton}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        ref={gotoTopButtonRef}
                    >
                        <img src={Arrow} alt="arrow" />
                    </button>
                    {placesLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
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
        </>
    );
};

export default Places;