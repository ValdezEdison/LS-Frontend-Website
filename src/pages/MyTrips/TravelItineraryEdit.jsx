import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import ItineraryForm from "../../components/TravelItinerary/ItineraryForm";
import ItineraryMap from "../../components/PlacesInfo/Itineries/ItineraryMap";
// import ItineraryStops from "../../components/TravelItinerary/ItineraryStops";
import SuggestedStops from "../../components/TravelItinerary/SuggestedStops";
import SimilarPlaces from "../../components/TravelItinerary/SimilarPlaces";
import styles from "./TravelItinerary.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilarStops, fetchTripDetails, fetchTravelTime } from "../../features/myTrips/MyTripsAction";
import { LanguageContext } from "../../context/LanguageContext";
import Widget from "../../components/common/Widget";
import { WidgetSkeleton } from "../../components/skeleton/common/WidgetSkeleton";
import StopList from "../../components/TripDetails/StopList";
import { Arrow, Down } from "../../components/common/Images";
import { fetchCities } from "../../features/common/cities/CityAction";
import { debounce } from "lodash";
import { useTripsTypes } from "../../constants/TripTypeList";
import { useTranslation } from "react-i18next";
import { updateTrip, updateStops } from "../../features/myTrips/MyTripsAction";


const TravelItineraryEdit = () => {
  const location = useLocation();
  const { id } = location.state;

  const tripTypeRef = useRef(null);
  const previousSitesRef = useRef([]);
  const hasStopsChangedRef = useRef(false);

  const [formState, setFormState] = useState({
    mode: 'driving',
    page: 1,
    sites: [],
    tripName: '',
    startDate: null,
    endDate: null,
    destinations: [{
      destinationSearchQuery: '',
      destinationId: null,
      destinationName: ''
    }],
    stops: [],
    tripType: '',
  });

  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [citiesSearchResults, setCitiesSearchResults] = useState([]);
  const [isSearchingCities, setIsSearchingCities] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation('TravelItinerary');

  const { language } = useContext(LanguageContext);
  const { tripDetails, similarStops, loading, similarStopsLoading } = useSelector((state) => state.myTrips);
  const { cities } = useSelector((state) => state.cities);

  const tripTypes = useTripsTypes();

  // Add state to manage the selected trip type and dropdown visibility
  const [selectedTripType, setSelectedTripType] = useState(tripDetails?.type || 'familiar');
  const [isTripTypeDropdownOpen, setIsTripTypeDropdownOpen] = useState(false);

  // Create a function to handle trip type selection
  const handleTripTypeSelect = (type) => {
    setSelectedTripType(type);
    setIsTripTypeDropdownOpen(false);
    // You might want to update the formState or make an API call here
    setFormState(prev => ({
      ...prev,
      tripType: type
    }));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchTripDetails(id));
      dispatch(fetchSimilarStops({ page: 1, tripId: id }));
      dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
      dispatch(fetchCities({}));
    }
  }, [language, id, dispatch]);

  const handleViewMoreDetails = (e, id) => {
    e.stopPropagation();
    navigate('/places/details', { state: { id } });
  };

 

  useEffect(() => {
    if (formState.mode) {
      dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
    }
  }, [formState.mode, dispatch, id]);



  useEffect(() => {
    if (tripDetails) {
      setFormState(prev => ({
        ...prev,
        tripName: tripDetails.title || '',
        startDate: tripDetails.initial_date || null,
        endDate: tripDetails.end_date || null,
        tripType: tripDetails.type || '',
        destinations: tripDetails.cities?.map(city => ({
          destinationSearchQuery: city.name,
          destinationId: city.id,
          destinationName: city.name
        })) || [{
          destinationSearchQuery: '',
          destinationId: null,
          destinationName: ''
        }],
        stops: tripDetails.stops || []
      }));

      const newSites = tripDetails.stops?.map(stop => stop.id) || [];
      
      setFormState(prev => ({
        ...prev,
        // ... other state updates ...
        sites: newSites,
      }));
      previousSitesRef.current = newSites;
      hasStopsChangedRef.current = false;
    }
  }, [tripDetails, setFormState]);


  useEffect(() => {
    if (JSON.stringify(previousSitesRef.current) !== JSON.stringify(formState.sites)) {
      hasStopsChangedRef.current = true;
    }
  }, [formState.sites]);

  

  const debouncedSearch = debounce((query) => {
    if (query) {
      dispatch(fetchCities({ searchQuery: query }));
    }
  }, 300);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formatDate = (date) => {
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      // If it's already in YYYY-MM-DD format, return as-is
      if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date;
      }
      // Fallback - try to parse or use current date
      return new Date(date).toISOString().split('T')[0];
    };

    const tripData = {
      title: formState.tripName,
      type: formState.tripType,
      cities: formState.destinations.map(d => d.destinationId),
      initial_date: formatDate(formState.startDate),
      end_date: formatDate(formState.endDate),
      stops: formState.sites,
    };
    
    dispatch(updateTrip({ tripId: id, tripData: tripData }));
    if (hasStopsChangedRef.current) {
      dispatch(updateStops({ tripId: id, sites: formState.sites }));
      hasStopsChangedRef.current = false; // Reset change flag
      previousSitesRef.current = formState.sites; // Update reference
    }
  }


  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown wrapper
    if (tripTypeRef.current && !tripTypeRef.current.contains(event.target)) {
      setIsTripTypeDropdownOpen(false); // Close the dropdown
    }
  };
  
  useEffect(() => {
    // Only add the event listener if the dropdown is open
    if (isTripTypeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Always remove the event listener when the dropdown closes or component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTripTypeDropdownOpen]);


  return (
    <div className={styles.travelItineraryContainer}>
      <Header />
      <main className="page-center">
        <ItineraryForm
          tripDetails={tripDetails}
          setFormState={setFormState}
          formState={formState}
          activeDestinationIndex={activeDestinationIndex}
          setActiveDestinationIndex={setActiveDestinationIndex}
          cities={cities}
          debouncedSearch={debouncedSearch}
          handleSubmit={handleSubmit}
        />
        <ItineraryMap
          places={tripDetails?.stops}
          formState={formState}
          setFormState={setFormState}
        />
        <div className={styles.dropdownWrapper} ref={tripTypeRef}>
          <label>{t('AddTrip.tripType')}</label>
          <div className={styles.dropdown}>
            <div className={styles.filterBlock}>
              <div
                className={`${styles.filterHeader} ${isTripTypeDropdownOpen ? styles.open : ''}`}
                onClick={() => setIsTripTypeDropdownOpen(!isTripTypeDropdownOpen)}
              >
                <div className={styles.filterHeaderContent}>
                  <div className={styles.filterTitle}>{tripTypes[formState.tripType]}</div>
                </div>
                <div className={styles.dropdownIcon}><img src={Down} /></div>
              </div>
            </div>
            <div className={`${styles.filterContent} ${isTripTypeDropdownOpen ? styles.active : ''}`}>
              <ul className={styles.filterChecklist}>
                {Object.entries(tripTypes).map(([key, value]) => (
                  <li
                    key={key}
                    className={formState.tripType === key ? styles.selected : ''}
                    onClick={() => handleTripTypeSelect(key)}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {tripDetails?.stops?.length > 0 && (
          <StopList tripDetails={tripDetails} handleViewMoreDetails={handleViewMoreDetails} setFormState={setFormState} />
        )}
        <SuggestedStops />
        {similarStopsLoading ? (
          <WidgetSkeleton />
        ) : (
          <Widget data={similarStops} title="Similar places" count={4} seeMore={false} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TravelItineraryEdit;