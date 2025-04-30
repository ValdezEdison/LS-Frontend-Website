import React, { useState, useEffect, useContext, useCallback } from "react";
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

const TravelItineraryEdit = () => {
  const location = useLocation();
  const { id } = location.state;

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
  });

  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [citiesSearchResults, setCitiesSearchResults] = useState([]);
  const [isSearchingCities, setIsSearchingCities] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { language } = useContext(LanguageContext);
  const { tripDetails, similarStops, loading, similarStopsLoading } = useSelector((state) => state.myTrips);
  const { cities } = useSelector((state) => state.cities);

  useEffect(() => {
    if (id) {
      dispatch(fetchTripDetails(id));
      dispatch(fetchSimilarStops({ page: 1, tripId: id }));
      dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
      dispatch(fetchCities({}));
    }
  }, [language, id, dispatch]);

  const handleViewMoreDetails = (e,id) => {
    navigate('/places/details', { state: { id } });
  };

  const handleActions = (e, action, id) => {
    e.stopPropagation();
    if (action === 'dragAndDrop') {
      
    }else if(action === 'delete') {

    }
  };

  useEffect(() => {
    if (formState.mode) {
      dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
    }
  }, [formState.mode, dispatch, id]);

  // Calculate trip duration in days
  const calculateTripDuration = () => {
    if (!tripDetails?.initial_date || !tripDetails?.end_date) return 0;
    const start = new Date(tripDetails.initial_date);
    const end = new Date(tripDetails.end_date);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
  };

  useEffect(() => {
    if (tripDetails) {
      setFormState(prev => ({
        ...prev,
        tripName: tripDetails.title || '',
        startDate: tripDetails.initial_date || null,
        endDate: tripDetails.end_date || null,
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
    }
  }, [tripDetails, setFormState]);

  console.log(formState, 'formState');

  const debouncedSearch = debounce((query) => {
    if (query) {
      dispatch(fetchCities({ searchQuery: query  }));
    }
  }, 300);

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
        />
        <ItineraryMap
          places={tripDetails?.stops}
          formState={formState}
          setFormState={setFormState}
        />
        <div className={styles.dropdownWrapper}>
          <label>Tipo de viaje</label>
          <div className={styles.dropdown}>
            <div className={styles.filterBlock}>
              <div className={`${styles.filterHeader} `}> {/* ${styles.open} */}
                <div className={styles.filterHeaderContent}>
                  <div className={styles.filterTitle}>Familiar</div>
                </div>
                <div className={styles.dropdownIcon}><img src={Down} /></div>
              </div>
            </div>
            <div className={`${styles.filterContent} }`}> {/* ${styles.active*/}
              <ul className={styles.filterChecklist}>
                {similarStops?.map((stop, index) => (
                  <li key={index}>{stop.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {tripDetails?.stops?.length > 0 && (
         <StopList tripDetails={tripDetails} handleViewMoreDetails={handleViewMoreDetails} setFormState={setFormState} handleActions={handleActions}/>
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