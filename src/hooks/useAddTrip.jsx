import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

// Actions
import {
  fetchStops,
  fetchTravelLiteList,
  addSite,
  addTrip
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
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formState.tripName.trim()) {
      errors.tripName = 'Trip name is required';
    }

    if (!formState.startDate) {
      errors.startDate = 'Start date is required';
    }
    if (!formState.endDate) {
      errors.endDate = 'End date is required';
    }

    if (formState.startDate && formState.endDate && formState.endDate < formState.startDate) {
      errors.endDate = 'End date cannot be before start date';
    }

    if (formState.destinations.length === 0) {
      errors.destinations = 'At least one destination is required';
    } else {
      formState.destinations.forEach((dest, index) => {
        if (!dest.destinationName.trim()) {
          errors[`destinations[${index}]`] = 'Destination is required';
        }
      });
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle adding to existing trip
  const handleSubmitTrip = () => {
    if (tripState.selectedTripId !== "new") {
      dispatch(addSite({ id: tripState.selectedPlaceId, order: 5 }))
        .then((res) => {
          if (res.type === "places/addSite/fulfilled") {
            toast.success(<>
              Place added to itinerary!<br />
              A new place has been added to your "{tripState.existingTripName}". Keep adding destinations and events.
            </>);
            closeAddTripPopup();
          } else if (res.type === "places/addSite/rejected") {
            const errorMsg = res.payload?.error_description || "Failed to add place";
            toast.error(`Error: ${errorMsg}`);
          }
        })
        .catch((error) => {
          console.error("Dispatch error:", error);
          toast.error("An unexpected error occurred");
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
          message: "A new trip has been added to your account. Continue adding destinations and events.",
          title: "Trip added!",
          show: true
        });
        dispatch(resetTripType());
      } else {
        setSuccessData({
          message: result.payload?.error_description || "Failed to create trip",
          title: "Error",
          show: true
        });
      }

      dispatch(closeAddToTripPopup());
      dispatch(closePopup());
    } catch (error) {
      console.error('Error adding trip:', error);
      setSuccessData({
        message: "An unexpected error occurred",
        title: "Error",
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
  };

  // Handle trip click (main entry point)
  const handleTripClick = (e, id, name) => {
    console.log('handleTripClick', id, name);
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
      console.log("formState.destinations", formState.destinations);
      dispatch(fetchStops({ cityId: formState.destinations.map((destination) => destination.destinationId), type: formState.type, page: 1 }))
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