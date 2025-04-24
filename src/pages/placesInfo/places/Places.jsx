import React, { useState, useContext } from "react";
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
import { fetchPlacesFilterCategories, fetchGeoLocations } from "../../../features/places/PlaceAction";
import { toggleFavorite } from "../../../features/favorites/FavoritesAction";
import FilterBar from "../../../components/common/FilterBar";
import { openPopup, closePopup, openAddToTripPopup } from "../../../features/popup/PopupSlice";
import MapPopup from "../../../components/common/MapPopup";
import SelectedItemList from "../../../components/common/SelectedItemList";
import styles3 from "../../../components/PlacesPage/MainContent.module.css"
import { LanguageContext } from "../../../context/LanguageContext";
import { setFavTogglingId } from "../../../features/places/placesInfo/places/PlacesSlice";
import Modal from "../../../components/modal/Modal";
import AlertPopup from "../../../components/popup/Alert/AlertPopup";
import { useAddTrip } from "../../../hooks/useAddTrip";
import { fetchCities } from "../../../features/common/cities/CityAction";
import { fetchTravelLiteList } from "../../../features/places/placesInfo/itinerary/ItineraryAction";
import AddToTripPopup from "../../../components/popup/AddToTrip/AddToTripPopup";
import AddTripPopup from "../../../components/popup/AddToTrip/AddTripPopup";
import SuccessMessagePopup from "../../../components/popup/SuccessMessage/SuccessMessagePopup";

const Places = () => {
    const { t } = useTranslation('Places');
    const { t: tCommon } = useTranslation('Common');
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { language } = useContext(LanguageContext);

    const { loading: placesLoading, error, placesList, next, count, isFavoriteToggling, favTogglingId } = useSelector((state) => state.placesInCity);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { loading: destinationLoading, destination } = useSelector((state) => state.destination);
    const { loading: placesFilterCategoriesLoading, categories } = useSelector((state) => state.places);
    const { data: visiblePlaces, loading, next: hasNext, loadMore } = useSeeMore(placesList, next);
    const { isOpen } = useSelector((state) => state.popup);
    const { cities } = useSelector((state) => state.cities);

    const [showMapPopup, setShowMapPopup] = useState(false);

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

    // Consolidated state for all relevant states in the Places page
    const [state, setState] = useState({
        selectedLevel: null, // For filter level
        selectedCategory: null, // For filter category
        selectedSubcategory: null, // For filter subcategory
        showArrow: true, // For scroll-to-top button visibility
        page: 1, // For pagination
        latAndLng: "",
        points: "",
        type: "place",
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

    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");

    const togglePopup = (name, state) => {
        setPopupState((prev) => ({ ...prev, [name]: state }));
        state ? dispatch(openPopup()) : dispatch(closePopup());
    };

    const placesListRef = useRef(null);
    const mainRef = useRef(null);
    const gotoTopButtonRef = useRef(null);
    const placesListBreakerRef = useRef(null);

    const { id } = location.state || {};

    useEffect(() => {
        if (id) {
            dispatch(fetchPlacesInCity({ cityId: id, page: 1, type: 'place' }));
            dispatch(fetchPlacesFilterCategories({ page: 1, type: 'place', cityId: id }));
            dispatch(fetchGeoLocations({ cityId: id, type: "place" }));
            if (isAuthenticated) {
                dispatch(fetchTravelLiteList());
            }
            dispatch(fetchCities({}));
            return () => {
                dispatch(closePopup());
                closeAddToTrip()
            }
        }
    }, [dispatch, id, language]);




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
    }, [dispatch, id, state.page, state.selectedLevel, state.selectedCategory, state.selectedSubcategory, language]);


    const handleViewMoreDetails = (e, id) => {
        
        if(isAuthenticated){
            navigate('/places/details', { state: { id } });
        }else{
            togglePopup("alert", true);
            setAlertTitle(tCommon('authAlert.viewDetails.title'));
            setAlertMessage(tCommon('authAlert.viewDetails.description'));
        }
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
            label: t('Filters.level'),
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
            label: t('Filters.category'),
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
            label: t('Filters.subcategory'),
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
        setState(prev => ({ ...prev, points: "" }));
    };


    const handleActions = (e, action, id, name) => {
        console.log(action, 'action');
        e.stopPropagation();
        switch (action) {
            case 'addToFavorites':
                handleFavClick(e, id);
                break;
            case 'addToTrip':
                handleAddToTripClick(e, id, name);
                setFormState(prev => ({ ...prev, type: "event" }));
                break;
            case 'viewMore':
                handleViewMoreDetails(e, id);
                break;
            default:
                break;
        }
    };

    const handleAddToTripClick = (e, id, name) => {
        const result = handleTripClick(e, id, name);
        if (result?.needsAuth) {
            togglePopup("alert", true);
            setAlertTitle(tCommon('authAlert.favorites.title'));
            setAlertMessage(tCommon('authAlert.favorites.description'));
        }
    };

    const handleFavClick = (e, id) => {
        e.stopPropagation();
        if (isAuthenticated) {
            dispatch(toggleFavorite(id));
            dispatch(setFavTogglingId(id));
        }else {
            setAlertTitle(tCommon('authAlert.favorites.title'));
            setAlertMessage(tCommon('authAlert.favorites.description'));
            togglePopup("alert", true);
          }
    };


    const handleNavigateToLogin = () => {
        navigate('/login', { state: { from: location } });
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchPlacesInCity({ cityId: id, page: 1, type: 'place', points: state.points }));

        }
    }, [dispatch, id, state.points]);


    // Modal props
    const modalSearchProps = {
        activeDestinationIndex,
        setActiveDestinationIndex,
        citiesSearchResults,
        isSearchingCities,
        updateDestination
    };

    useEffect(() => {
        if (tripPopupState.addTripPopup || isAddToPopupOpen) {
            document.body.classList.add('overflowHide');
        } else {
            document.body.classList.remove('overflowHide');
        }

        // Cleanup: Remove class when component unmounts
        return () => {
            document.body.classList.remove('overflowHide');
        };
    }, [tripPopupState.addTripPopup, isAddToPopupOpen]);

    return (
        <>
            {isOpen && showMapPopup && <MapPopup onClose={handleCloseMapPopup} state={state} setState={setState} />}
            {isOpen && popupState.alert && (
                <Modal
                    onClose={() => togglePopup("alert", false)}
                    customClass="modalSmTypeOne"
                >
                    <AlertPopup handleNavigateToLogin={handleNavigateToLogin} title={alertTitle}
            description={alertMessage}
            buttonText={tCommon('authAlert.favorites.button')}/>
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

            {isOpen && isAddToPopupOpen && (
                <AddToTripPopup
                    closeModal={() => {
                        closeAddToTrip();
                    }}
                    state={formState}
                    setState={setFormState}
                    cities={cities}
                    onSubmit={handleSubmit}
                    formErrors={formErrors}
                    setFormErrors={setFormErrors}
                    {...modalSearchProps}
                    handleActions={handleActions}
                />
            )}

            {isOpen && successData.show && (
                <Modal
                    title=""
                    onClose={closeSuccessMessage}
                    customClass="modalSmTypeOne"
                    hideCloseButton={true}
                >
                    <SuccessMessagePopup
                        title={successData.title}
                        message={successData.message}
                        onClose={closeSuccessMessage}
                    />
                </Modal>
            )}
            <Header />
            <main className="page-center" ref={mainRef}>
                <h1 className={commonStyle.pageTitle}>{destination?.name}, {destination?.country?.name}</h1>
                <SubNavMenu activeLink="lugares" />
                <div className={styles.searchFilters}>
                    <div className={styles.mapButtonContainer}>
                        <button className={styles.mapButton} onClick={handleShowMapPopup}>{tCommon('seeMap')}</button>
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
                <p className={commonStyle.availablePlaces}>{t('Places.availableCount', { count })}</p>
                <div className={styles.placesList} ref={placesListRef}>
                    <button
                        style={{
                            display: state.showArrow && !isOpen && !loading && visiblePlaces.length > 0 ? 'block' : 'none'
                        }}
                        className={styles2.gotoTopButton}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        ref={gotoTopButtonRef}
                    >
                        <img src={Arrow} alt={t('arrowIcon')} />
                    </button>
                    {placesLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <CardSkeleton key={index} />
                        ))
                    ) : visiblePlaces.length > 0 ? (
                        visiblePlaces.map((place, index) => (
                            <PlaceCard
                                key={index}
                                place={place}
                                translate={t}
                                isAuthenticated={isAuthenticated}
                                handleViewMoreDetails={handleViewMoreDetails}
                                handleActions={handleActions}
                                isFavoriteToggling={isFavoriteToggling && favTogglingId === place.id}
                            />
                        ))
                    ) : (
                        <div className="no-results-wrapper">{t('Places:noResults')}</div>
                    )}
                    {loading ? <Loader /> : next && <SeeMoreButton
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