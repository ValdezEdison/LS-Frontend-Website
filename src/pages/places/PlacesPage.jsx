import React, { useEffect, useContext, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce, set } from 'lodash';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAddTrip } from "../../hooks/useAddTrip";

// Context
import { LanguageContext } from "../../context/LanguageContext";

// Components
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/PlacesPage/Sidebar";
import MainContent from "../../components/PlacesPage/MainContent";
import Footer from "../../components/layouts/Footer";
import PromotionalBanner from "../../components/common/PromotionalBanner";
import Newsletter from "../../components/common/Newsletter";
import MapPopup from "../../components/common/MapPopup";
import AlertPopup from "../../components/popup/Alert/AlertPopup";
import Modal from "../../components/modal/Modal";
import AddToTripPopup from "../../components/popup/AddToTrip/AddToTripPopup";
import AddTripPopup from "../../components/popup/AddToTrip/AddTripPopup";
import { MainContentSkeleton } from "../../components/skeleton/PlacesPage/PlaceSkeleton";
import PlacesPageSkeleton from "../../components/skeleton/PlacesPage/PlacesPageSkeleton";
import SuccessMessagePopup from "../../components/popup/SuccessMessage/SuccessMessagePopup";
import SidebarSkeleton from "../../components/skeleton/PlacesPage/SidebarSkeleton";

// Actions & Selectors
import {
  fetchPlaces,
  fetchPlacesByCityId,
  fetchGeoLocations,
  fetchPlacesFilterCategories,
  fetchNearMePlaces,
  fetchRandomPlaces,
  fetchPlacesSearchResults
} from "../../features/places/PlaceAction";
import { toggleFavorite } from "../../features/favorites/FavoritesAction";
import { fetchCountries } from "../../features/common/countries/CountryAction";
import { fetchCities } from "../../features/common/cities/CityAction";
import { fetchBannerBlocks } from "../../features/cms/Blocks/BlocksAction";
import {
  fetchTravelLiteList,
  addSite,
  fetchStops
} from "../../features/places/placesInfo/itinerary/ItineraryAction";

// Redux
import {
  openPopup,
  closePopup,
  openAddToTripPopup,
  closeAddToTripPopup
} from "../../features/popup/PopupSlice";
import {
  resetTripType,
  setTripType
} from "../../features/places/placesInfo/itinerary/ItinerarySlice";
import { resetGeoLocations, resetPlacesList } from "../../features/places/PlaceSlice";
import { setFavTogglingId } from "../../features/favorites/FavoritesSlice";

// Styles
import styles from "./PlacesPage.module.css";
import styles3 from "../../components/PlacesPage/MainContent.module.css";



const PlacesPage = () => {

  const { t } = useTranslation('Places');
  const { t: tCommon } = useTranslation('Common');
  const { t: tAddTrip } = useTranslation('AddTrip');
  // Hooks and Redux
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { language, languageId } = useContext(LanguageContext);
  const initialRender = useRef(true);
  const prevDepsRef = useRef([]);
  const initializedRef = useRef(false);
  const [hasFiltersChanged, setHasFiltersChanged] = useState(false);

  // Selectors
  const {
    loading: placesLoading,
    categories,
    filterLoading,
    places
  } = useSelector((state) => state.places);

  const {
    countries,
    loading: countriesLoading
  } = useSelector((state) => state.countries);

  const {
    cities,
    loading: citiesLoading
  } = useSelector((state) => state.cities);

  const {
    isOpen,

  } = useSelector((state) => state.popup);

  const {
    isAuthenticated
  } = useSelector((state) => state.auth);

  // const {
  //   travelLiteList
  // } = useSelector((state) => state.itineriesInCity);

  const {
    bannerBlocks, bannerLoading
  } = useSelector((state) => state.cms.blocks);


  const { currentLocation, loading: currentLocationLoading } = useSelector((state) => state.locationSettings);

  const trackingEnabled = currentLocation?.preferences?.geolocation_enabled;


  // Constants
  const RATINGS = [
    { label: t('ratings.labels.4.9-5.0'), value:  5.0 },
    { label: t('ratings.labels.4.7-4.8'), value:  4.8 },
    { label: t('ratings.labels.4.5-4.6'), value:  4.6 },
    { label: t('ratings.labels.4.0-4.4'), value:  4.4 },
  ];

  // State Management
  const [state, setState] = useState({
    selectedCountryId: null,
    selectedDestinationId: null,
    selectedDestinations: "",
    selectedOrder: "",
    searchQuery: "",
    destinationSearchQuery: "",
    selectedCountryName: "",
    page: 1,
    levels: "",
    categories: "",
    ratings: "",
    subcategories: "",
    latAndLng: "",
    points: "",
    selectedTripId: "new",
    selectedPlaceId: null,
    selectedPlaceName: "",
    latitude: "",
    longitude: "",
    keyword: "",
  });

  const [popupState, setPopupState] = useState({
    map: false,
    gallery: false,
    reviewDrawer: false,
    alert: false,
    comment: false,
    deleteConfirm: false,
    success: false,
    addTrip: false
  });

  const tripType = localStorage.getItem('tripType')
    ? JSON.parse(localStorage.getItem('tripType')).type
    : "solo";

  // const [formState, setFormState] = useState({
  //   tripType: tripType,
  //   tripName: '',
  //   startDate: null,
  //   endDate: null,
  //   destinationSearchQuery: "",
  //   mode: 'driving',
  //   destinations: [{
  //     destinationSearchQuery: '',
  //     destinationId: null,
  //     destinationName: ''
  //   }],
  //   stops: [],
  //   selectedPlaceName: ""
  // });


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

  useEffect(() => {
    if (state.selectedPlaceName) {
      setFormState(prev => ({
        ...prev,
        selectedPlaceName: state.selectedPlaceName
      }));
    }
  }, [state.selectedPlaceName]);

  // const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  // const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  // const [citiesSearchResults, setCitiesSearchResults] = useState([]);
  // const [isSearchingCities, setIsSearchingCities] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  // Helper Functions
  const removeDuplicates = (str) => {
    return Array.from(new Set(str.split(","))).join(",");
  };

  const togglePopup = (name, state) => {
    setPopupState(prev => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  // const updateDestination = (index, field, value) => {
  //   setFormState(prev => {
  //     const newDestinations = [...prev.destinations];
  //     newDestinations[index] = {
  //       ...newDestinations[index],
  //       [field]: value
  //     };
  //     return { ...prev, destinations: newDestinations };
  //   });
  // };

  // Event Handlers
  const handleShowMapPopup = () => {
    setShowMapPopup(true);
    setState(prev => ({ ...prev, latAndLng: "" }));
    dispatch(openPopup());
  };

  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
    dispatch(closePopup());
    setState(prev => ({ ...prev, points: "" }));
  };

  // const handleActions = (e, action, id) => {
  //   e.stopPropagation();
  //   switch (action) {
  //     case 'addToFavorites':
  //       handleFavClick(e, id);
  //       break;
  //     case 'addToTrip':
  //       handleTripClick(e, id);
  //       break;
  //     case 'addToStop':
  //       setFormState(prev => ({
  //         ...prev,
  //         stops: [...prev.stops, id]
  //       }));
  //       break;
  //     case 'viewMore':
  //       handleViewMoreDetails(e, id);
  //       break;
  //     default:
  //       break;
  //   }
  // };




  const handleViewMoreDetails = (e, id) => {
    if (isAuthenticated) {
      const idStr = String(id);
      if (idStr.includes('/')) { // Now safe for numbers
          navigate(`/places/details/${encodeURIComponent(idStr)}`);
      } else {
          navigate(`/places/details`, { state: { id } });
      }
    } else {
      togglePopup("alert", true);
      setAlertTitle(tCommon('authAlert.viewDetails.title'));
      setAlertMessage(tCommon('authAlert.viewDetails.description'));
    }
  };


  // const handleFavClick = (e, id) => {
  //   e.stopPropagation();
  //      if (isAuthenticated) {
  //         dispatch(toggleFavorite(id));
  //         dispatch(setFavTogglingId(id));
  //       } else {
  //         setAlertTitle(tCommon('authAlert.favorites.title'));
  //         setAlertMessage(tCommon('authAlert.favorites.description'));
  //         togglePopup("alert", true);
  //       }
  // };

  // const handleTripClick = (e, id) => {
  //   e.stopPropagation();
  //   if (isAuthenticated) {
  //     const selectedPlace = places.find(place => place.id === id);
  //     setState(prev => ({
  //       ...prev,
  //       selectedPlaceName: selectedPlace?.display_text,
  //       selectedPlaceId: id
  //     }));
  //     togglePopup("addTrip", true);
  //   } else {
  //     togglePopup("alert", true);
  //     setAlertTitle(tCommon('authAlert.favorites.title'));
  //     setAlertMessage(tCommon('authAlert.favorites.description'));
  //   }
  // };

  const handleActions = (e, action, id, name) => {
    
    e.stopPropagation();
    switch (action) {
      case 'addToFavorites':
        handleFavClick(e, id);
        break;
      case 'addToTrip':
        handleAddToTripClick(e, id, name);
        const selectedPlace = places.find(place => place.id === id);
        const firstCity = selectedPlace?.cities?.[0] || selectedPlace?.city || {};
        const stops = [selectedPlace?.id];
        setFormState(prev => ({ ...prev, type: "place", stops: stops,
          destinations: [{
            destinationSearchQuery: '',
            destinationId: firstCity.id || null,
            destinationName: firstCity.name || ''
        }]}));
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
      case 'search':
        handleSearch(e);
        break;
      default:
        break;
    }
  };

  const handleAddToTripClick = (e, id, name) => {
    const result = handleTripClick(e, id, name);
    if (result?.needsAuth) {
      setAlertTitle(tCommon('authAlert.favorites.title'));
      setAlertMessage(tCommon('authAlert.favorites.description'));
      togglePopup("alert", true);
    }
  };

  const handleFavClick = (e, id) => {
    e.stopPropagation();
    if (isAuthenticated) {
      dispatch(toggleFavorite(id));
      dispatch(setFavTogglingId(id));
    } else {
      togglePopup("alert", true);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  // const handleSubmitTrip = () => {
  //   if (state.selectedTripId !== "new") {
  //     dispatch(addSite({ id: state.selectedPlaceId, order: 5 }))
  //       .then((res) => {
  //         
  //         if (res.type === "places/addSite/fulfilled") {
  //           toast.success(
  //             tAddTrip('AddTrip.success.placeAdded.message', { tripName: tripState.existingTripName })
  //           );
  //           togglePopup("addTrip", false);
  //         } else if (res.type === "places/addSite/rejected") {
  //           // Use error_description from handleApiError
  //           const errorMsg = res.type?.payload?.error_description || tAddTrip('AddTrip.errors.addPlaceFailed');
  //           toast.error(`Error: ${errorMsg}`);
  //         }
  //       })
  //       .catch((error) => {
  //         
  //         toast.error(tAddTrip('AddTrip.errors.unexpectedError'));
  //       });
  //   } else {
  //     togglePopup("addTrip", false);
  //     dispatch(openAddToTripPopup());
  //     dispatch(openPopup());
  //   }
  // };

  // Data Fetching
  const debouncedFetchCountries = useCallback(
    debounce((query) => {
      dispatch(fetchCountries(query));
    }, 500),
    [dispatch]
  );

  const debouncedFetchCities = useCallback(
    debounce((countryId, query) => {
      dispatch(fetchCities({ countryId, searchQuery: query }));
    }, 500),
    [dispatch]
  );

  // const debouncedFetchCitiesForAddTrip = useCallback(
  //   debounce(async (query) => {
  //     if (query.trim()) {
  //       setIsSearchingCities(true);
  //       try {
  //         const result = await dispatch(fetchCities({ searchQuery: query }));
  //         setCitiesSearchResults(result.payload || []);
  //       } catch (error) {
  //         
  //         setCitiesSearchResults([]);
  //       } finally {
  //         setIsSearchingCities(false);
  //       }
  //     } else {
  //       setCitiesSearchResults([]);
  //     }
  //   }, 500),
  //   [dispatch]
  // );

  // Effects
  useEffect(() => {
    
    // Always-needed initial fetches
    dispatch(fetchCountries());
    dispatch(fetchCities({}));
    dispatch(fetchPlacesFilterCategories({ page: 1, type: "place", cityId: "" }));
    dispatch(fetchBannerBlocks(languageId));
  
    if (isAuthenticated) {
      dispatch(fetchTravelLiteList());
    }
    dispatch(resetPlacesList())
    const hasFilters = 
      state.selectedCountryId !== null ||
      state.selectedDestinationId !== null ||
      state.selectedDestinations !== "" ||
      state.selectedOrder !== "" ||
      state.levels !== "" ||
      state.categories !== "" ||
      state.ratings !== "" ||
      state.subcategories !== "" ||
      state.points !== "";
  
    if (!hasFilters && !currentLocationLoading) {
      if (currentLocation && isAuthenticated && trackingEnabled) {
        const lat = currentLocation.preferences?.last_known_latitude;
        const lng = currentLocation.preferences?.last_known_longitude;
  
        const center = { lat, lng };
        const polygonCoords = generatePolygonCoordinates(center);
        const pointsParam = formatPolygonForAPI(polygonCoords);

  
        dispatch(fetchNearMePlaces({
          page: 1,
          latitude: lat,
          longitude: lng,
          type: "place",
          radius: currentLocation.preferences?.default_radius || 5000
        }));
        dispatch(fetchGeoLocations({ cityId: "", type: "place", points: pointsParam, page: 1 }));
      
         
      } else {
        dispatch(fetchRandomPlaces({ page: 1, type: "place" }));
        dispatch(fetchGeoLocations({ cityId: "", type: "place", page: 1 }));
      }
    }
    setHasFiltersChanged(false)
   
  }, [language, isAuthenticated, dispatch, currentLocation]);



  useEffect(() => {
    // Fetch places when filters change
    if (initialRender.current) {
      initialRender.current = false;
 
      prevDepsRef.current = [
        state.ratings,
        state.categories,
        state.levels,
        state.subcategories,
        language,
      ];
 
      return;
    }
 
    const currentDeps = [
      state.ratings,
      state.categories,
      state.levels,
      state.subcategories,
      language,
    ];
 
    const hasChanged = currentDeps.some((dep, i) => dep !== prevDepsRef.current[i]);
 
    if (hasChanged) {
      setHasFiltersChanged(true);
      dispatch(resetPlacesList());
      if(!trackingEnabled && (
        state.selectedDestinationId !== null ||
        state.selectedCountryName !== "" ||
        state.selectedDestinations !== "" ||
        state.selectedCountryId !== null ||
        state.ratings !== "" ||
        state.categories !== "" ||
        state.levels !== "" ||
        state.points !== "" ||
        state.subcategories !== "" ||
        state.selectedOrder !== ""
      )) {
 
        dispatch(fetchPlacesByCityId({
          cityId: state.selectedDestinationId !== null
            ? state.selectedDestinationId
            : state.selectedDestinations,
          country: state.selectedCountryName,
          page: state.page,
          preview: 1,
          avg_rating: state.ratings,
          categories: state.categories,
          levels: state.levels,
          subcategories: state.subcategories,
          points: state.points,
          sort_by: state.selectedOrder
        }));
    
 
        dispatch(fetchGeoLocations({
          cityId: state.selectedDestinationId !== null
            ? state.selectedDestinationId
            : state.selectedDestinations,
          type: "place",
          country: state.selectedCountryName,
          // page: state.page,
          // preview: 1,
          avg_rating: state.ratings,
          categories: state.categories,
          levels: state.levels,
          subcategories: state.subcategories,
          points: state.points
        }));
 
       }else if (
        trackingEnabled &&
        (
          state.selectedDestinationId !== null ||
          state.selectedCountryName !== "" ||
          state.selectedDestinations !== "" ||
          state.selectedCountryId !== null ||
          state.points !== ""
        )
      ) {
        dispatch(fetchPlacesByCityId({
          cityId: state.selectedDestinationId !== null
            ? state.selectedDestinationId
            : state.selectedDestinations,
          country: state.selectedCountryName,
          page: state.page,
          preview: 1,
          avg_rating: state.ratings,
          categories: state.categories,
          levels: state.levels,
          subcategories: state.subcategories,
          points: state.points,
          sort_by: state.selectedOrder
        }));
    
 
        dispatch(fetchGeoLocations({
          cityId: state.selectedDestinationId !== null
            ? state.selectedDestinationId
            : state.selectedDestinations,
          type: "place",
          country: state.selectedCountryName,
          // page: state.page,
          // preview: 1,
          avg_rating: state.ratings,
          categories: state.categories,
          levels: state.levels,
          subcategories: state.subcategories,
          points: state.points
        }));
       } else if (
        trackingEnabled &&
        (
          state.selectedDestinationId === null &&
          state.selectedCountryName === "" &&
          state.selectedDestinations === "" &&
          state.selectedCountryId === null &&
          state.points === ""
        )
      ) {
        dispatch(fetchNearMePlaces({
          page: 1,
          latitude: currentLocation.preferences?.last_known_latitude,
          longitude: currentLocation.preferences?.last_known_longitude,
          type: "place",
          avg_rating: state.ratings,
          categories: state.categories,
          levels: state.levels,
          subcategories: state.subcategories,
          sort_by: state.selectedOrder
        }));
  
        const lat = currentLocation.preferences?.last_known_latitude;
        const lng = currentLocation.preferences?.last_known_longitude;
  
        const center = { lat, lng };
        const polygonCoords = generatePolygonCoordinates(center);
        const pointsParam = formatPolygonForAPI(polygonCoords);
  
        if(currentLocation.preferences?.location_mode === "manual") {
          dispatch(fetchGeoLocations({
  
            avg_rating: state.ratings,
            categories: state.categories,
            levels: state.levels,
            subcategories: state.subcategories,
            points: pointsParam
          }));
        }else {
          dispatch(fetchGeoLocations({
  
            avg_rating: state.ratings,
            categories: state.categories,
            levels: state.levels,
            subcategories: state.subcategories,
            points: pointsParam
            
          }));
        }
        
       }else if (!trackingEnabled &&
        (
          state.selectedDestinationId === null &&
          state.selectedCountryName === "" &&
          state.selectedDestinations === "" &&
          state.selectedCountryId === null &&
          state.points === ""
        )
      ) {
        dispatch(fetchRandomPlaces({ page: 1, type: "place" }));
        dispatch(fetchGeoLocations({ cityId: "", type: "place" }));
       }
      
 
      prevDepsRef.current = currentDeps;
    }
  }, [
    state.ratings,
    state.categories,
    state.levels,
    state.subcategories,
    language,
    dispatch
  ]);
  

  useEffect(() => {
    // Clean up state
    setState(prev => ({
      ...prev,
      categories: removeDuplicates(prev.categories),
      levels: removeDuplicates(prev.levels),
    }));
  }, [state.categories, state.levels]);

  useEffect(() => {
    // Country search
    if (state.searchQuery.trim() !== "") {
      debouncedFetchCountries(state.searchQuery);
    } else {
      dispatch(fetchCountries(""));
    }

    return () => debouncedFetchCountries.cancel();
  }, [state.searchQuery, debouncedFetchCountries, dispatch]);

  useEffect(() => {
    // City search
    if (state.selectedCountryId) {
      if (state.destinationSearchQuery.trim() !== "") {
        debouncedFetchCities(state.selectedCountryId, state.destinationSearchQuery);
      } else {
        dispatch(fetchCities({ countryId: state.selectedCountryId, searchQuery: "" }));
      }
    } else if (state.destinationSearchQuery.trim() !== "") {
      debouncedFetchCities(null, state.destinationSearchQuery);
    } else {
      dispatch(fetchCities({}));
    }
    return () => debouncedFetchCities.cancel();
  }, [state.selectedCountryId, state.destinationSearchQuery, debouncedFetchCities, dispatch]);




  const handleSearch = async (e) => {
     dispatch(resetPlacesList());
      if(!trackingEnabled && (
        state.selectedDestinationId !== null ||
        state.selectedCountryName !== "" ||
        state.selectedDestinations !== "" ||
        state.selectedCountryId !== null ||
        state.ratings !== "" ||
        state.categories !== "" ||
        state.levels !== "" ||
        state.points !== "" ||
        state.subcategories !== "" ||
        state.selectedOrder !== ""
      )) {

        dispatch(fetchPlacesByCityId({
          cityId: state.selectedDestinationId !== null
            ? state.selectedDestinationId
            : state.selectedDestinations,
          country: state.selectedCountryName,
          page: state.page,
          preview: 1,
          avg_rating: state.ratings,
          categories: state.categories,
          levels: state.levels,
          subcategories: state.subcategories,
          points: state.points,
          sort_by: state.selectedOrder
        }));
    

        dispatch(fetchGeoLocations({
          cityId: state.selectedDestinationId !== null
            ? state.selectedDestinationId
            : state.selectedDestinations,
          type: "place",
          country: state.selectedCountryName,
          // page: state.page,
          // preview: 1,
          avg_rating: state.ratings,
          categories: state.categories,
          levels: state.levels,
          subcategories: state.subcategories,
          points: state.points
        }));

       }else if (
        trackingEnabled &&
        (
          state.selectedDestinationId !== null ||
          state.selectedCountryName !== "" ||
          state.selectedDestinations !== "" ||
          state.selectedCountryId !== null ||
          state.points !== ""
        )
      ) {
        dispatch(fetchPlacesByCityId({
          cityId: state.selectedDestinationId !== null
            ? state.selectedDestinationId
            : state.selectedDestinations,
          country: state.selectedCountryName,
          page: state.page,
          preview: 1,
          avg_rating: state.ratings,
          categories: state.categories,
          levels: state.levels,
          subcategories: state.subcategories,
          points: state.points,
          sort_by: state.selectedOrder
        }));
    

        dispatch(fetchGeoLocations({
          cityId: state.selectedDestinationId !== null
            ? state.selectedDestinationId
            : state.selectedDestinations,
          type: "place",
          country: state.selectedCountryName,
          // page: state.page,
          // preview: 1,
          avg_rating: state.ratings,
          categories: state.categories,
          levels: state.levels,
          subcategories: state.subcategories,
          points: state.points
        }));
       } else if (
        trackingEnabled &&
        (
          state.selectedDestinationId === null &&
          state.selectedCountryName === "" &&
          state.selectedDestinations === "" &&
          state.selectedCountryId === null &&
          state.points === ""
        )
      ) {
        dispatch(fetchNearMePlaces({
          page: 1,
          latitude: currentLocation.preferences?.last_known_latitude,
          longitude: currentLocation.preferences?.last_known_longitude,
          type: "place",
          avg_rating: state.ratings,
          categories: state.categories,
          levels: state.levels,
          subcategories: state.subcategories,
          sort_by: state.selectedOrder
        }));
  
        const lat = currentLocation.preferences?.last_known_latitude;
        const lng = currentLocation.preferences?.last_known_longitude;
  
        const center = { lat, lng };
        const polygonCoords = generatePolygonCoordinates(center);
        const pointsParam = formatPolygonForAPI(polygonCoords);
  
        if(currentLocation.preferences?.location_mode === "manual") {
          dispatch(fetchGeoLocations({
  
            avg_rating: state.ratings,
            categories: state.categories,
            levels: state.levels,
            subcategories: state.subcategories,
            points: pointsParam
          }));
        }else {
          dispatch(fetchGeoLocations({
  
            avg_rating: state.ratings,
            categories: state.categories,
            levels: state.levels,
            subcategories: state.subcategories,
            points: pointsParam
            
          }));
        }
        
       }else if (!trackingEnabled &&
        (
          state.selectedDestinationId === null &&
          state.selectedCountryName === "" &&
          state.selectedDestinations === "" &&
          state.selectedCountryId === null &&
          state.points === ""
        )
      ) {
        dispatch(fetchRandomPlaces({ page: 1, type: "place" }));
        dispatch(fetchGeoLocations({ cityId: "", type: "place", page: 1 }));
       }
  }

useEffect(() => {
  if(language) {
    handleSearch();
  }
  
}, [language])

  useEffect(() => {
    // Navigation when destination is selected
    if (state.selectedDestinationId !== null) {
      navigate('/places/destination', { state: { id: state.selectedDestinationId } });
    }
  }, [state.selectedDestinationId, navigate]);

  // useEffect(() => {
  //   // Search effect for add trip
  //   const activeQuery = formState.destinations?.[activeDestinationIndex]?.destinationSearchQuery;
  //   debouncedFetchCitiesForAddTrip(activeQuery);

  //   return () => debouncedFetchCitiesForAddTrip.cancel();
  // }, [formState.destinations, activeDestinationIndex, debouncedFetchCitiesForAddTrip]);

  // Modal props
  const modalSearchProps = {
    activeDestinationIndex,
    setActiveDestinationIndex,
    citiesSearchResults,
    isSearchingCities,
    updateDestination
  };

  const validateForm = () => {
    const errors = {};

    // Validate trip name
    if (!formState.tripName.trim()) {
      errors.tripName = tAddTrip('AddTrip.popups.validation.tripNameRequired');
    }

    // Validate dates
    if (!formState.startDate) {
      errors.startDate = tAddTrip('AddTrip.popups.validation.startDateRequired');
    }
    if (!formState.endDate) {
      errors.endDate = tAddTrip('AddTrip.popups.validation.endDateRequired');
    }

    // Validate that end date is not before start date
    if (formState.startDate && formState.endDate && formState.endDate < formState.startDate) {
      errors.endDate = tAddTrip('AddTrip.popups.validation.endDateBeforeStart');
    }

    // Validate destinations
    if (formState.destinations.length === 0) {
      errors.destinations = tAddTrip('AddTrip.popups.validation.destinationRequired');
    } else {
      // Check each destination for validity
      formState.destinations.forEach((dest, index) => {
        if (!dest.destinationName.trim()) {
          errors[`destinations[${index}]`] = tAddTrip('AddTrip.popups.validation.specificDestinationRequired');
        }
        // Add more destination validations as needed
      });
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const storedTripType = localStorage.getItem('tripType')

  // const handleSubmit = async (e) => {
  //   
  //   if (!storedTripType) {
  //     dispatch(setTripType({ id: state.selectedPlaceId, type: formState.tripType }))
  //     // dispatch(closeAddToTripPopup())
  //     // togglePopup("success", true);
  //     // setSuccessMessage(`A new stop has been added to your trip ${state.selectedPlaceName}. Continue adding destinations and events as you wish.`);
  //     // setSuccessTitle("Route added!");
  //     return
  //   }

  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   try {
  //     dispatch(setTripType({ id: state.selectedPlaceId, type: formState.tripType }))
  //     if (isCreatingNewTrip) {
  //       const tripData = {
  //         title: formState.tripName,
  //         type: formState.tripType,
  //         cities: formState.destinations.map((destination) => destination.destinationId),
  //         initial_date: formState.startDate.toISOString().split('T')[0],
  //         end_date: formState.endDate.toISOString().split('T')[0],
  //         stops: formState.stops,
  //       };
  //       dispatch(addTrip(tripData))
  //       .then((response) => {
  //         

  //         if (response.type === "places/addTrip/fulfilled") {
  //           // Success case
  //           dispatch(resetTripType());
  //           togglePopup("success", true);
  //           setSuccessMessage(tAddTrip('AddTrip.success.tripAdded.message'));
  //           setSuccessTitle(tAddTrip('AddTrip.success.tripAdded.title'));
  //         } 
  //         else if (response.type === "places/addTrip/rejected") {
  //           // Error case
  //           const errorMsg = response.payload?.error_description || 
  //                           response.error?.message || 
  //                           tAddTrip('AddTrip.errors.createTripFailed');

  //           togglePopup("error", true);
  //           setSuccessMessage(errorMsg);
  //           setSuccessTitle('');
  //           
  //         }
  //       })
  //       .catch((error) => {
  //         // Unexpected errors
  //         
  //         togglePopup("error", true);
  //         setSuccessMessage( tAddTrip('AddTrip.errors.unexpectedError'),);
  //         // setSuccessMessage("An unexpected error occurred while creating the trip");
  //         setSuccessTitle("Error");

  //       });
  //     } else {
  //       // Logic to add itinerary to existing trip would go here
  //       
  //     }

  //     dispatch(closeAddToTripPopup());
  //     dispatch(closePopup());
  //   } catch (error) {
  //     
  //   }
  // };

  useEffect(() => {
    if (formState.destinations.length > 0 && formState.destinations[0].destinationId !== null) {
      
      dispatch(fetchStops({ cityId: formState.destinations.map((destination) => destination.destinationId), type: "place", page: 1 }))
    }

  }, [formState.destinations])


  useEffect(() => {
    let timer;
    if (popupState.success) {
      timer = setTimeout(() => {
        togglePopup("success", false);
        setSuccessMessage("");
        setSuccessTitle("");
      }, 5000); // 5 seconds in milliseconds
    }

    // Clean up the timer when the component unmounts or when popupState.success changes
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [popupState.success]);

  useEffect(() => {
    if (isAddToPopupOpen || tripPopupState.addTripPopup) {
      document.body.classList.add('overflowHide');
    } else {
      document.body.classList.remove('overflowHide');
    }

    // Cleanup: Remove class when component unmounts
    return () => {
      document.body.classList.remove('overflowHide');
    };
  }, [isAddToPopupOpen, tripPopupState.addTripPopup]);


    // Function to generate polygon coordinates
    const generatePolygonCoordinates = (center, radiusInDegrees = 0.01) => {
      if (!center?.lat || !center?.lng) return null;
      return [
        { lat: center.lat + radiusInDegrees, lng: center.lng - radiusInDegrees },
        { lat: center.lat + radiusInDegrees, lng: center.lng + radiusInDegrees },
        { lat: center.lat - radiusInDegrees, lng: center.lng + radiusInDegrees },
        { lat: center.lat - radiusInDegrees, lng: center.lng - radiusInDegrees },
      ];
    };
  
    // Function to format coordinates for API
    const formatPolygonForAPI = (coords) => {
      // return coords?.map(coord => `${coord.lat},${coord.lng}`).join('|') || '';
      const pointsQueryString = coords
      .map(coord => `points=${coord.lat},${coord.lng}`)
      .join('&');

      return pointsQueryString;
    };

    useEffect(() => {

      return () => {
        dispatch(resetTripType());
        dispatch(closeAddToTripPopup());
        dispatch(closePopup());
        dispatch(resetGeoLocations())
        dispatch(resetPlacesList())
      };
      
    }, [])


       const debouncedPlacesSearch = useCallback(
           debounce((keyword) => {
             dispatch(fetchPlacesSearchResults({keyword, type: "place"}));
           }, 500),
           [dispatch]
         );
         
         useEffect(() => {
           if (state.keyword.trim() !== "") {
             debouncedPlacesSearch(state.keyword);
           } else {
             // Explicit empty search with object format
             dispatch(fetchPlacesSearchResults({ keyword: "", type: "place" }));
           }
         
           return () => debouncedPlacesSearch.cancel();
        }, [state.keyword, debouncedPlacesSearch, dispatch]);


        const handleNavigate = (id) => {

          if(isAuthenticated){
          
            navigate(`/places/details`, { state: { id: id } });
    
          }else{
            togglePopup("alert", true);
            setAlertTitle(tCommon('authAlert.viewDetails.title'));
            setAlertMessage(tCommon('authAlert.viewDetails.description'));
          }
      
          
        }


  return (
    <>
      {/* Popups and Modals */}
      {isOpen && showMapPopup && (
        <MapPopup
          onClose={handleCloseMapPopup}
          categories={categories}
          ratings={RATINGS}
          state={state}
          setState={setState}
          handleActions={handleActions}
        />
      )}

      {isOpen && popupState.alert && (
        <Modal onClose={() => togglePopup("alert", false)} customClass="modalSmTypeOne">
          <AlertPopup
            handleNavigateToLogin={handleNavigateToLogin}
            title={alertTitle}
            description={alertMessage}
            buttonText={tCommon('authAlert.favorites.button')}
          />
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


      {isOpen && popupState.success && (
        <Modal
          title=""
          onClose={() => togglePopup("success", false)}
          customClass="modalSmTypeOne"
          hideCloseButton={true}
        >
          <SuccessMessagePopup
            title={successTitle}
            message={successMessage}
            onClose={() => togglePopup("success", false)}
          />
        </Modal>
      )}
      {/* Main Content */}
      <div className={`${styles.placesPage} ${popupState.addTrip ? styles.overflowHide : ''}`}>
        <Header />

        {/* {filterLoading ? (
          <PlacesPageSkeleton filterLoading={filterLoading} placesLoading={placesLoading} />
        ) : ( */}
        <>
          <div className="page-center">
            <div className={styles.content}>
              {/* {filterLoading ? (
                <SidebarSkeleton />
              )
                :
                ( */}
                  <Sidebar
                    handleShowMapPopup={handleShowMapPopup}
                    categories={categories}
                    ratings={RATINGS}
                    state={state}
                    setState={setState}
                    filterLoading={filterLoading}
                    onSearch={ handleSearch}
                  />
              {/* //   )
              // } */}

              {placesLoading ? (
                <MainContentSkeleton />
              ) : (
                <MainContent
                  state={state}
                  setState={setState}
                  countries={countries}
                  cities={cities}
                  handleActions={handleActions}
                  handleNavigate={handleNavigate}
                  hasFiltersChanged={hasFiltersChanged}
                />
              )}
            </div>
            <div className={styles.content}>
              <PromotionalBanner bannerBlocks={bannerBlocks} bannerLoading={bannerLoading} />
            </div>
          </div>
        </>
        {/* )} */}

        {!isAuthenticated && <Newsletter />}
        <Footer />
      </div>
    </>
  );
};

export default PlacesPage;