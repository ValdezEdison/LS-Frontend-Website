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
import { fetchStops } from "../../features/places/placesInfo/itinerary/ItineraryAction";
import EventCard from "../../components/common/EventCard";
import EventCardSkeleton from "../../components/skeleton/PlacesPage/PlacesInfo/events/EventCardSkeleton";
import useSeeMore from "../../hooks/useSeeMore";
import { listUpdater, setFavTogglingId } from "../../features/places/placesInfo/itinerary/ItinerarySlice";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import Loader from "../../components/common/Loader";
import { toggleFavorite } from "../../features/favorites/FavoritesAction";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


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
    cityIds: null,
    type: "place",
  });

  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [citiesSearchResults, setCitiesSearchResults] = useState([]);
  const [isSearchingCities, setIsSearchingCities] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation('TravelItinerary');

  const { language } = useContext(LanguageContext);
  const { tripDetails, similarStops, loading: tripDetailsLoading, similarStopsLoading } = useSelector((state) => state.myTrips);
  const { favTogglingId, isFavoriteToggling, stops, stopsLoading, itineraryDetails, stopsNext } = useSelector((state) => state.itineriesInCity);
  const { data: visibleStops, loading, next: hasNext, loadMore } = useSeeMore(stops, stopsNext, listUpdater, 'stops');
  const { cities } = useSelector((state) => state.cities);
  const { isAuthenticated } = useSelector((state) => state.auth);

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
        stops: tripDetails.stops || [],
        cityIds: tripDetails.cities?.map(city => city.id)
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

  console.log(formState, 'formState');

  useEffect(() => {
    if (formState.cityIds) {
      console.log(formState.cityIds, 'formState.cityIds');
      const cityIdsString = formState.cityIds.join(',');
      console.log(cityIdsString, 'cityIdsString');
      dispatch(fetchStops({
        cityId: cityIdsString,
        type: formState.type,
        page: 1
      }));
    }

  }, [formState.cityIds, dispatch]);


  // const handleActions = (e, action, id) => {
  //   e.stopPropagation();
  //   if (action === 'showSites') {
  //     navigate('/places/destination', { state: { id: id } });
  //   }
  // }

  const handleActions = (e, action, id, name) => {

    e.stopPropagation();
    switch (action) {
      case 'addToFavorites':
        handleFavClick(e, id);
        break;
      case 'addToTrip':
        handleAddToTripClick(e, id, name);
        setFormState(prev => ({ ...prev, type: "place" }));
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

  const handleFavClick = (e, id) => {
    e.stopPropagation();
    if (isAuthenticated) {
      dispatch(toggleFavorite(id));
      dispatch(setFavTogglingId(id));
    } else {
      togglePopup("alert", true);
    }
  };

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
            loading={tripDetailsLoading}
          />
        <ItineraryMap
          places={tripDetails?.stops}
          formState={formState}
          setFormState={setFormState}
        />
         {tripDetailsLoading ? (
          <div style={{ marginBottom: '2rem' }} className={styles.dropdownWrapper}>
            <Skeleton height={20} width={'20%'} style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={50} width={'30%'}/>
          </div>
        ) : (
          <div className={styles.dropdownWrapper} ref={tripTypeRef}>
            <label>Tipo de viaje</label>
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
        )}


        <StopList tripDetails={tripDetails} handleViewMoreDetails={handleViewMoreDetails} setFormState={setFormState} />

        {/* <SuggestedStops /> */}
        <h2 className={styles.sectionTitle}>Añade más paradas a tu itinerario</h2>
        <div className={styles.eventGrid}>
          {stopsLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))
          ) : visibleStops.length > 0 && (
            // Render visible events if available
            visibleStops.map((event, index) => (
              <EventCard key={index} event={event} handleActions={handleActions}
                isFavoriteToggling={isFavoriteToggling && favTogglingId === event.id} />
            ))
          )}
        </div>
        <div className={styles.showMoreWrapper}>
          {loading ? <Loader /> : stopsNext && isAuthenticated && <SeeMoreButton
            onClick={loadMore}
            loading={loading}
            next={hasNext}
            translate={''}
          />}

        </div>
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