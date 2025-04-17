import React, { useEffect, useContext, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from 'lodash';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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
} from "../../features/places/PlaceAction";
import { toggleFavorite } from "../../features/favorites/FavoritesAction";
import { fetchCountries } from "../../features/common/countries/CountryAction";
import { fetchCities } from "../../features/common/cities/CityAction";
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
import { setFavTogglingId } from "../../features/places/PlaceSlice";

// Styles
import styles from "./PlacesPage.module.css";
import styles3 from "../../components/PlacesPage/MainContent.module.css";



const PlacesPage = () => {

  const { t } = useTranslation('Places');
  // Hooks and Redux
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const initialRender = useRef(true);

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
    isAddToPopupOpen
  } = useSelector((state) => state.popup);

  const {
    isAuthenticated
  } = useSelector((state) => state.auth);

  const {
    travelLiteList
  } = useSelector((state) => state.itineriesInCity);

  // Constants
const RATINGS = [
  { label: t('ratings.labels.4'), value: 4 },
  { label: t('ratings.labels.3'), value: 3 },
  { label: t('ratings.labels.2'), value: 2 },
  { label: t('ratings.labels.1'), value: 1 }
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

  const [formState, setFormState] = useState({
    tripType: tripType,
    tripName: '',
    startDate: null,
    endDate: null,
    destinationSearchQuery: "",
    mode: 'driving',
    destinations: [{
      destinationSearchQuery: '',
      destinationId: null,
      destinationName: ''
    }],
    stops: [],
    selectedPlaceName: ""
  });

  useEffect(() => {
    if (state.selectedPlaceName) {
      setFormState(prev => ({
        ...prev,
        selectedPlaceName: state.selectedPlaceName
      }));
    }
  }, [state.selectedPlaceName]);

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [citiesSearchResults, setCitiesSearchResults] = useState([]);
  const [isSearchingCities, setIsSearchingCities] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(false);

  // Helper Functions
  const removeDuplicates = (str) => {
    return Array.from(new Set(str.split(","))).join(",");
  };

  const togglePopup = (name, state) => {
    setPopupState(prev => ({ ...prev, [name]: state }));
    state ? dispatch(openPopup()) : dispatch(closePopup());
  };

  const updateDestination = (index, field, value) => {
    setFormState(prev => {
      const newDestinations = [...prev.destinations];
      newDestinations[index] = {
        ...newDestinations[index],
        [field]: value
      };
      return { ...prev, destinations: newDestinations };
    });
  };

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

  const handleActions = (e, action, id) => {
    e.stopPropagation();
    switch (action) {
      case 'addToFavorites':
        handleFavClick(e, id);
        break;
      case 'addToTrip':
        handleTripClick(e, id);
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

  const handleFavClick = (e, id) => {
    e.stopPropagation();
       if (isAuthenticated) {
          dispatch(toggleFavorite(id));
          dispatch(setFavTogglingId(id));
        } else {
          togglePopup("alert", true);
        }
  };

  const handleTripClick = (e, id) => {
    e.stopPropagation();
    if (isAuthenticated) {
      const selectedPlace = places.find(place => place.id === id);
      setState(prev => ({
        ...prev,
        selectedPlaceName: selectedPlace?.display_text,
        selectedPlaceId: id
      }));
      togglePopup("addTrip", true);
    } else {
      togglePopup("alert", true);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleSubmitTrip = () => {
    if (state.selectedTripId !== "new") {
      dispatch(addSite({ id: state.selectedPlaceId, order: 5 }))
        .then((res) => {
          console.log(res, 'res.type')
          if (res.type === "places/addSite/fulfilled") {
            toast.success(<>
              Place added to itinerary!<br />
              A new place has been added to your "{state.existingTripName}". Keep adding destinations and events.
            </>);
            togglePopup("addTrip", false);
          } else if (res.type === "places/addSite/rejected") {
            // Use error_description from handleApiError
            const errorMsg = res.type?.payload?.error_description || "Failed to add place";
            toast.error(`Error: ${errorMsg}`);
          }
        })
        .catch((error) => {
          console.error("Dispatch error:", error);
          toast.error("An unexpected error occurred");
        });
    } else {
      togglePopup("addTrip", false);
      dispatch(openAddToTripPopup());
      dispatch(openPopup());
    }
  };

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

  const debouncedFetchCitiesForAddTrip = useCallback(
    debounce(async (query) => {
      if (query.trim()) {
        setIsSearchingCities(true);
        try {
          const result = await dispatch(fetchCities({ searchQuery: query }));
          setCitiesSearchResults(result.payload || []);
        } catch (error) {
          console.error('Search error:', error);
          setCitiesSearchResults([]);
        } finally {
          setIsSearchingCities(false);
        }
      } else {
        setCitiesSearchResults([]);
      }
    }, 500),
    [dispatch]
  );

  // Effects
  useEffect(() => {
    // Initial data fetch
    dispatch(fetchPlaces());
    dispatch(fetchCountries());
    dispatch(fetchCities({}));
    dispatch(fetchGeoLocations({ cityId: "", type: "place" }));
    dispatch(fetchPlacesFilterCategories({ page: 1, type: "place", cityId: "" }));
    if (isAuthenticated) {
      dispatch(fetchTravelLiteList());
    }

    return () => {
      dispatch(resetTripType());
      dispatch(closeAddToTripPopup());
      dispatch(closePopup());
    };
  }, [dispatch, language]);

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

  useEffect(() => {
    // Fetch places when filters change
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

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
      page: state.page,
      preview: 1,
      avg_rating: state.ratings,
      categories: state.categories,
      levels: state.levels,
      subcategories: state.subcategories,
      points: state.points
    }));
  }, [
    state.selectedCountryName,
    state.selectedDestinationId,
    state.selectedDestinations,
    state.selectedOrder,
    state.selectedCountryId,
    state.ratings,
    state.categories,
    state.levels,
    state.points,
    state.page,
    state.subcategories,
    dispatch
  ]);

  useEffect(() => {
    // Navigation when destination is selected
    if (state.selectedDestinationId !== null) {
      navigate('/places/destination', { state: { id: state.selectedDestinationId } });
    }
  }, [state.selectedDestinationId, navigate]);

  useEffect(() => {
    // Search effect for add trip
    const activeQuery = formState.destinations?.[activeDestinationIndex]?.destinationSearchQuery;
    debouncedFetchCitiesForAddTrip(activeQuery);

    return () => debouncedFetchCitiesForAddTrip.cancel();
  }, [formState.destinations, activeDestinationIndex, debouncedFetchCitiesForAddTrip]);

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
      errors.tripName = 'Trip name is required';
    }

    // Validate dates
    if (!formState.startDate) {
      errors.startDate = 'Start date is required';
    }
    if (!formState.endDate) {
      errors.endDate = 'End date is required';
    }

    // Validate that end date is not before start date
    if (formState.startDate && formState.endDate && formState.endDate < formState.startDate) {
      errors.endDate = 'End date cannot be before start date';
    }

    // Validate destinations
    if (formState.destinations.length === 0) {
      errors.destinations = 'At least one destination is required';
    } else {
      // Check each destination for validity
      formState.destinations.forEach((dest, index) => {
        if (!dest.destinationName.trim()) {
          errors[`destinations[${index}]`] = 'Destination is required';
        }
        // Add more destination validations as needed
      });
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const storedTripType = localStorage.getItem('tripType')

  const handleSubmit = async (e) => {
    console.log("storedTripType submit", storedTripType)
    if (!storedTripType) {
      dispatch(setTripType({ id: state.selectedPlaceId, type: formState.tripType }))
      // dispatch(closeAddToTripPopup())
      // togglePopup("success", true);
      // setSuccessMessage(`A new stop has been added to your trip ${state.selectedPlaceName}. Continue adding destinations and events as you wish.`);
      // setSuccessTitle("Route added!");
      return
    }

    e.preventDefault();

    if (!validateForm()) return;

    try {
      dispatch(setTripType({ id: id, type: formState.tripType }))
      if (isCreatingNewTrip) {
        const tripData = {
          title: formState.tripName,
          type: formState.tripType,
          cities: formState.destinations.map((destination) => destination.destinationId),
          initial_date: formState.startDate.toISOString().split('T')[0],
          end_date: formState.endDate.toISOString().split('T')[0],
          stops: formState.stops,
        };
        dispatch(addTrip(tripData))
        .then((response) => {
          console.log('Trip add response:', response);
          
          if (response.type === "places/addTrip/fulfilled") {
            // Success case
            dispatch(resetTripType());
            togglePopup("success", true);
            setSuccessMessage(`A new trip has been added to your account. Continue adding destinations and events as you wish.`);
            setSuccessTitle("Trip added!");
          } 
          else if (response.type === "places/addTrip/rejected") {
            // Error case
            const errorMsg = response.payload?.error_description || 
                            response.error?.message || 
                            "Failed to create trip";
            
            togglePopup("error", true);
            setSuccessMessage(errorMsg);
            setSuccessTitle("Error creating trip");
            console.error('Trip creation failed:', response.payload || response.error);
          }
        })
        .catch((error) => {
          // Unexpected errors
          console.error('Unexpected error in dispatch:', error);
          togglePopup("error", true);
          setSuccessMessage("An unexpected error occurred while creating the trip");
          setSuccessTitle("Error");
        });
      } else {
        // Logic to add itinerary to existing trip would go here
        console.log('Adding to existing trip:', selectedTripId);
      }

      dispatch(closeAddToTripPopup());
      dispatch(closePopup());
    } catch (error) {
      console.error('Error adding trip:', error);
    }
  };

  useEffect(() => {
    if (formState.destinations.length > 0 && formState.destinations[0].destinationId !== null) {
      console.log("formState.destinations", formState.destinations);
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
      if(isAddToPopupOpen || popupState.addTrip){
        document.body.classList.add('overflowHide');
      }else{
        document.body.classList.remove('overflowHide');
      }
  
      // Cleanup: Remove class when component unmounts
      return () => {
        document.body.classList.remove('overflowHide');
      };
    }, [isAddToPopupOpen, popupState.addTrip]);

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
            title="Log in and save time"
            description="Sign in to save your favorites and create new itineraries on Local Secrets."
            buttonText="Sign in or create an account"
          />
        </Modal>
      )}

      {isOpen && popupState.addTrip && (
        <AddTripPopup
          onClose={() => togglePopup("addTrip", false)}
          travelLiteList={travelLiteList}
          state={state}
          setState={setState}
          handleSubmitTrip={handleSubmitTrip}
        />
      )}

      {isOpen && isAddToPopupOpen && (
        <AddToTripPopup
          closeModal={() => {
            dispatch(closeAddToTripPopup());
            dispatch(closePopup());
            dispatch(resetTripType());
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
                {filterLoading ? (
                  <SidebarSkeleton />
                )
                  :
                  (
                    <Sidebar
                    handleShowMapPopup={handleShowMapPopup}
                    categories={categories}
                    ratings={RATINGS}
                    state={state}
                    setState={setState}
                  />
                  )
                }
              
                { placesLoading ? (
                  <MainContentSkeleton />
                ) : (
                  <MainContent
                    state={state}
                    setState={setState}
                    countries={countries}
                    cities={cities}
                    handleActions={handleActions}
                  />
                )}
              </div>
              <div className={styles.content}>
                <PromotionalBanner styles={styles3} />
              </div>
            </div>
          </>
        {/* )} */}

        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default PlacesPage;