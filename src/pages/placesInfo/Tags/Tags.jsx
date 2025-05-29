import React, { useState, useContext } from "react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import commonStyle from "../Common.module.css";
import SubNavMenu from "../../../components/common/SubNavMenu";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlacesInCity } from "../../../features/places/placesInfo/places/PlacesAction";
import { useLocation, useNavigate } from "react-router-dom";
import PlaceCard from "../../../components/common/PlaceCard";
import styles from "../places/Places.module.css";
import { useTranslation } from "react-i18next";
import useSeeMore from "../../../hooks/useSeeMore";
import Loader from "../../../components/common/Loader";
import SeeMoreButton from "../../../components/common/SeeMoreButton";
import CardSkeleton from "../../../components/skeleton/common/CardSkeleton";
import { toggleFavorite } from "../../../features/favorites/FavoritesAction";
import { openPopup, closePopup, openAddToTripPopup } from "../../../features/popup/PopupSlice";
import MapPopup from "../../../components/common/MapPopup";
import { LanguageContext } from "../../../context/LanguageContext";
import Modal from "../../../components/modal/Modal";
import AlertPopup from "../../../components/popup/Alert/AlertPopup";
import { useAddTrip } from "../../../hooks/useAddTrip";
import { fetchCities } from "../../../features/common/cities/CityAction";
import { fetchTravelLiteList } from "../../../features/places/placesInfo/itinerary/ItineraryAction";
import AddToTripPopup from "../../../components/popup/AddToTrip/AddToTripPopup";
import AddTripPopup from "../../../components/popup/AddToTrip/AddTripPopup";
import SuccessMessagePopup from "../../../components/popup/SuccessMessage/SuccessMessagePopup";
import { fetchSuggestedPlaces } from "../../../features/suggestions/SuggestionAction";
import Widget from "../../../components/common/Widget";
import { WidgetSkeleton } from "../../../components/skeleton/common/WidgetSkeleton";
import { fetchTags } from "../../../features/places/placesInfo/tags/TagsAction";
import { listUpdater } from "../../../features/places/placesInfo/tags/TagsSlice";
import { setFavTogglingId } from "../../../features/favorites/FavoritesSlice";

const Tags = () => {
    const { t } = useTranslation('Places');
    const { t: tCommon } = useTranslation('Common');
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { language } = useContext(LanguageContext);

    const { loading: tagsLoading, tags, next, count } = useSelector((state) => state.tags);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { loading: destinationLoading, destination } = useSelector((state) => state.destination);
    const { loading: placesFilterCategoriesLoading, categories } = useSelector((state) => state.places);
    const { data: visiblePlaces, loading, next: hasNext, loadMore } = useSeeMore(tags, next, listUpdater);
    const { isOpen } = useSelector((state) => state.popup);
    const { cities } = useSelector((state) => state.cities);
    const { suggestedPlaces, loading: suggestedPlacesLoading } = useSelector((state) => state.suggestions);
    const { isFavoriteToggling, favTogglingId } = useSelector((state) => state.favorites);

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
        preview: true
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

    const { cityId, title, tagId, cityName } = location?.state ?? {};    
    useEffect(() => {
        if (tagId && cityId) {
            
           dispatch(fetchTags({tagId: tagId, cityId: cityId, page: 1}));

            if (isAuthenticated) {
                dispatch(fetchTravelLiteList());
            }
            dispatch(fetchCities({}));
            dispatch(fetchSuggestedPlaces({ page: 1, type: state.type, cityId: cityId }));
            return () => {
                dispatch(closePopup());
                closeAddToTrip()
            }
        }
    }, [dispatch, tagId, cityId, language]);


    const handleViewMoreDetails = (e, id) => {
        togglePopup("map", false);
        if (isAuthenticated) {
            navigate('/places/details', { state: { id } });
        } else {
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

   

    const handleCloseMapPopup = () => {
        setShowMapPopup(false);
        dispatch(closePopup());
        setState(prev => ({ ...prev, points: "" }));
    };


    const handleActions = (e, action, id, name) => {
        
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
            case 'addToStop':
                setFormState(prev => ({
                    ...prev,
                    stops: [...prev.stops, id]
                }));
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
        } else {
            setAlertTitle(tCommon('authAlert.favorites.title'));
            setAlertMessage(tCommon('authAlert.favorites.description'));
            togglePopup("alert", true);
        }
    };


    const handleNavigateToLogin = () => {
        navigate('/login', { state: { from: location } });
    }


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

    const handleNavActions = (e, id, action) => {
        
        if (isAuthenticated && action === "viewDetail") {
          navigate('/places/details', { state: { id } });
        } else if (action === "viewList") {
          navigate('/places');
        } else {
          togglePopup("alert", true);
          setAlertTitle(tCommon('authAlert.viewDetails.title'));
          setAlertMessage(tCommon('authAlert.viewDetails.description'));
        }
      };


    return (
        <>
            {isOpen && showMapPopup && <MapPopup onClose={handleCloseMapPopup} state={state} setState={setState} handleActions={handleActions}/>}
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
                <h1 className={commonStyle.pageTitle}>{cityName}, #{title}</h1>
                <SubNavMenu activeLink="tags" />
               
           
                {/* <p className={commonStyle.availablePlaces}>{t('Places.availableCount', { count })}</p> */}
                <div className={styles.placesList} ref={placesListRef}>
                    {/* <button
                        style={{
                            display: state.showArrow && !isOpen && !loading && visiblePlaces.length > 0 ? 'block' : 'none'
                        }}
                        className={styles2.gotoTopButton}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        ref={gotoTopButtonRef}
                    >
                        <img src={Arrow} alt={t('arrowIcon')} />
                    </button> */}
                    {tagsLoading ? (
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
                    {loading ? <Loader /> : next && isAuthenticated && <SeeMoreButton
                        onClick={loadMore}
                        loading={loading}
                        next={hasNext}
                        translate={t}
                    />}
                    {!isAuthenticated && next &&
                        <div className={styles.loginButtonWrapper}>
                            <button className={styles.loginButton} onClick={handleNavigateToLogin}>{tCommon('logInButton')}</button>
                        </div>
                    }
                </div>
                <div className={styles.placesListbreaker} ref={placesListBreakerRef}></div>
                {suggestedPlacesLoading ? (
                <WidgetSkeleton />
                ) : (
                <Widget data={suggestedPlaces} title={tCommon("peopleAlsoSeen")} count={4} handleNavActions={handleNavActions}/>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Tags;