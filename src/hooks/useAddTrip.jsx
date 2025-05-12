import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

// Actions
import {
  fetchStops,
  fetchTravelLiteList,
  addSite,
  addTrip,
  addToExistingTrip
} from '../features/places/placesInfo/itinerary/ItineraryAction';

import { fetchCities } from "../features/common/cities/CityAction";
import {
  openPopup,
  closePopup,
  openAddToTripPopup,
  closeAddToTripPopup
} from '../features/popup/PopupSlice';
import {
  resetTripType,
  setTripType
} from '../features/places/placesInfo/itinerary/ItinerarySlice';

export const useAddTrip = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { travelLiteList } = useSelector((state) => state.itineriesInCity);
  const { isOpen, isAddToPopupOpen } = useSelector((state) => state.popup);

  const { t } = useTranslation("AddTrip");

  // Trip state
  const [tripState, setTripState] = useState({
    selectedTripId: "new",
    selectedPlaceId: null,
    selectedPlaceName: "",
    existingTripName: ""
  });

  // Form state
  const [formState, setFormState] = useState({
    tripType: JSON.parse(localStorage.getItem('tripType'))?.type || "solo",
    tripName: '',
    startDate: null,
    endDate: null,
    mode: 'driving',
    destinations: [{
      destinationSearchQuery: '',
      destinationId: null,
      destinationName: ''
    }],
    stops: [],
    selectedPlaceName: "",
    type:"place",
  });


  
  const resetAllStates = () => {
    // Reset trip state
    setTripState({
      selectedTripId: "new",
      selectedPlaceId: null,
      selectedPlaceName: "",
      existingTripName: ""
    });
  
    // Reset form state
    setFormState({
      tripType: JSON.parse(localStorage.getItem('tripType'))?.type || "solo",
      tripName: '',
      startDate: null,
      endDate: null,
      mode: 'driving',
      destinations: [{
        destinationSearchQuery: '',
        destinationId: null,
        destinationName: ''
      }],
      stops: [],
      selectedPlaceName: "",
      type: "place",
    });
  
    // Reset other states
    setFormErrors({});
    setActiveDestinationIndex(0);
    setCitiesSearchResults([]);
    setIsSearchingCities(false);
    setSuccessData({
      message: "",
      title: "",
      show: false
    });
  };

  const [formErrors, setFormErrors] = useState({});
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [citiesSearchResults, setCitiesSearchResults] = useState([]);
  const [isSearchingCities, setIsSearchingCities] = useState(false);
  const [successData, setSuccessData] = useState({
    message: "",
    title: "",
    show: false
  });

  const [tripPopupState, setTripPopupState] = useState({
    addTripPopup: false,
    addToTripPopup: false
  });

  useEffect(() => {
    if(isAuthenticated){
      dispatch(fetchTravelLiteList());
    }
  
   return () => {
    // Cleanup function that runs when component unmounts
    resetAllStates();
    
    // Close any open popups
    dispatch(closePopup());
    dispatch(closeAddToTripPopup());
  };
   
  }, []);

  useEffect(() => {
    if (tripState.selectedPlaceName) {
      setFormState(prev => ({
        ...prev,
        selectedPlaceName: tripState.selectedPlaceName
      }))
    }
   
  }, [tripState.selectedPlaceName]);

  // Debounced city search
  const debouncedFetchCitiesForAddTrip = useCallback(
    debounce(async (query) => {
      if (query.trim()) {
        setIsSearchingCities(true);
        try {
          const result = await dispatch(fetchCities({ searchQuery: query }));
          setCitiesSearchResults(result.payload || []);
        } catch (error) {
          
          setCitiesSearchResults([]);
        } finally {
          setIsSearchingCities(false);
        }
      } else {
        setCitiesSearchResults([]);
      }
    }, 1000),
    [dispatch]
  );

  // Update destination in form
  const updateDestination = (index, field, value) => {
    setFormState(prev => {
      const newDestinations = [...prev.destinations];
      newDestinations[index] = {
        ...newDestinations[index],
        [field]: value
      };
      return { ...prev, destinations: newDestinations };
    });

    if(field === "destinationSearchQuery") {
      setActiveDestinationIndex(index);
      debouncedFetchCitiesForAddTrip(value);
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formState.tripName.trim()) {
      errors.tripName = t('AddTrip.popups.validation.tripNameRequired');
    }

    if (!formState.startDate) {
      errors.startDate = t('AddTrip.popups.validation.startDateRequired');
    }
    if (!formState.endDate) {
      errors.endDate = t('AddTrip.popups.validation.endDateRequired');
    }

    if (formState.startDate && formState.endDate && formState.endDate < formState.startDate) {
      errors.endDate = t('AddTrip.popups.validation.endDateBeforeStart');
    }

    if (formState.destinations.length === 0) {
      errors.destinations = t('AddTrip.popups.validation.destinationRequired');
    } else {
      formState.destinations.forEach((dest, index) => {
        if (!dest.destinationName.trim()) {
          errors[`destinations[${index}]`] = t('AddTrip.popups.validation.specificDestinationRequired');
        }
      });
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle adding to existing trip
  const handleSubmitTrip = () => {
    if (tripState.selectedTripId !== "new") {
      dispatch(formState.type === "event" || formState.type === "place" ? addSite({ id: tripState.selectedTripId, siteId: tripState.selectedPlaceId, order: 5 }) : addToExistingTrip({ tripId: tripState.selectedTripId, siteId: tripState.selectedPlaceId }))
        .then((res) => {
          
          
          if (res.type === "places/addSite/fulfilled" || res.type === "places/addToExistingTrip/fulfilled") {
           if(res.payload?.detail){
            toast.success(res.payload.detail);
           }
            closeAddTripPopup();
            resetAllStates();
          } else if (res.type === "places/addSite/rejected" || res.type === "places/addToExistingTrip/rejected") {
            const errorMsg = res.payload?.error_description ||  t('AddTrip.errors.addPlaceFailed');
            toast.error(`Error: ${errorMsg}`);
          }
        })
        .catch((error) => {
          
          toast.error(t('AddTrip.errors.unexpectedError'));
        });
    } else {
      closeAddTripPopup();
      dispatch(openAddToTripPopup());
      dispatch(openPopup());
    }
  };

  // Handle creating new trip
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    const storedTripType = localStorage.getItem('tripType');
    if (!storedTripType) {
      dispatch(setTripType({ id: tripState.selectedPlaceId, type: formState.tripType }));
      return;
    }

    if (!validateForm()) return;

    try {
      dispatch(setTripType({ id: tripState.selectedPlaceId, type: formState.tripType }));
      
      const tripData = {
        title: formState.tripName,
        type: formState.tripType,
        cities: formState.destinations.map(d => d.destinationId),
        initial_date: formState.startDate.toISOString().split('T')[0],
        end_date: formState.endDate.toISOString().split('T')[0],
        stops: formState.stops,
      };

      const result = await dispatch(addTrip(tripData));
      
      if (result.type === "places/addTrip/fulfilled") {
        setSuccessData({
          message: t('AddTrip.success.tripAdded.message'),
          title: t('AddTrip.success.tripAdded.title'),
          show: true
        });
        dispatch(resetTripType());
        resetAllStates(); 
      } else {
        setSuccessData({
          message: result.payload?.error_description || 
                  t('AddTrip.errors.createTripFailed'),
          title: 'Error',
          show: true
        });
      }

      dispatch(closeAddToTripPopup());
      dispatch(closePopup());
    } catch (error) {
      
      setSuccessData({
        message: t('AddTrip.errors.unexpectedError'),
        title: 'Error',
        show: true
      });
    }
  };

  // Open add trip popup
  const openAddTripPopup = (placeId, placeName) => {
    setTripState(prev => ({
      ...prev,
      selectedPlaceId: placeId,
      selectedPlaceName: placeName
    }));
    dispatch(openPopup());
    setTripPopupState(prev => ({ ...prev, addTripPopup: true }));
  };

  // Close add trip popup
  const closeAddTripPopup = () => {
    dispatch(closePopup());
    setTripPopupState(prev => ({ ...prev, addTripPopup: false }));
  };

  const closeAddToTrip = () => {
    dispatch(closePopup());
    dispatch(closeAddToTripPopup());
    setFormErrors({});
    resetAllStates();
  };

  // Handle trip click (main entry point)
  const handleTripClick = (e, id, name) => {
    
    e.stopPropagation();
    if (isAuthenticated) {
      openAddTripPopup(id, name);
      setTripState(prev => ({ ...prev, selectedPlaceName: name }));
      return { needsAuth: false };
    }
    return { needsAuth: true };
  };

  // Close success message
  const closeSuccessMessage = () => {
    setSuccessData(prev => ({ ...prev, show: false }));
  };

  // Fetch stops when destinations change
  useEffect(() => {
    if (formState.destinations.length > 0 && formState.destinations[0].destinationId !== null) {
      
      dispatch(fetchStops({ cityId: formState.destinations
        .map((destination) => destination.destinationId)
        .filter(id => id) // This removes any falsy values (undefined, null, empty strings)
        .join(','), type: formState.type === "itinerary" ? "place" : formState.type, page: 1 }))
    }

  }, [formState.destinations])

  // Auto-close success message
  useEffect(() => {
    let timer;
    if (successData.show) {
      timer = setTimeout(() => {
        closeSuccessMessage();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [successData.show]);

  return {
    // State
    tripState,
    formState,
    formErrors,
    citiesSearchResults,
    isSearchingCities,
    activeDestinationIndex,
    successData,
    isOpen,
    isAddToPopupOpen,
    travelLiteList,
    tripPopupState,

    // Setters
    setFormState,
    setTripState,
    setFormErrors,
    setTripPopupState,

    // Functions
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
  };
};