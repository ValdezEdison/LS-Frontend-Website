import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import ItineraryForm from "../../components/TravelItinerary/ItineraryForm";
import ItineraryMap from "../../components/PlacesInfo/Itineries/ItineraryMap";
import ItineraryStops from "../../components/TravelItinerary/ItineraryStops";
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

const TravelItineraryEdit = () => {
  const location = useLocation();
  const { id } = location.state;

  const [formState, setFormState] = useState({
    mode: 'driving',
    page: 1
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { language } = useContext(LanguageContext);
  const { tripDetails, similarStops, loading, similarStopsLoading } = useSelector((state) => state.myTrips);

  useEffect(() => {
    if (id) {
      dispatch(fetchTripDetails(id));
      dispatch(fetchSimilarStops({ page: 1, tripId: id }));
      dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
    }
  }, [language, id, dispatch]);

  const handleViewMoreDetails = (id) => {
    navigate('/places/details', { state: { id } });
  };

  const handleActions = (e, action, id) => {
    if (action === 'editTrip') {
      navigate('/my-trips/edit', { state: { id: id } });
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

  return (
    <div className={styles.travelItineraryContainer}>
      <Header />
      <main className="page-center">
        <ItineraryForm 
          title={tripDetails?.title} 
          type={tripDetails?.type} 
          duration={calculateTripDuration()}
        />
        <ItineraryMap 
          places={tripDetails?.stops} 
          formState={formState} 
          setFormState={setFormState} 
        />
        <div className={styles.dropdown}>
          <div className={styles.filterBlock}>
            <div className={`${styles.filterHeader} ${styles.open}`}>
              <div className={styles.filterHeaderContent}>
                <div className={styles.filterTitle}>Familiar</div>
              </div>
            </div>
          </div>
          <div className={`${styles.filterContent} ${styles.active}`}>
            <ul className={styles.filterChecklist}>
              {similarStops?.map((stop, index) => (
                <li key={index}>{stop.name}</li>
              ))}
            </ul>
          </div>
        </div>
        {tripDetails?.stops?.length > 0 && (
         <StopList tripDetails={tripDetails} handleViewMoreDetails={handleViewMoreDetails} />
        )}
        <SuggestedStops />
        <SimilarPlaces />
      </main>
      <Footer />
    </div>
  );
};

export default TravelItineraryEdit;