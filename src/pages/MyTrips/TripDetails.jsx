import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import TripInfo from "../../components/TripDetails/TripInfo";
import StopList from "../../components/TripDetails/StopList";
import SimilarPlaces from "../../components/TripDetails/SimilarPlaces";
import ItineraryMap from "../../components/PlacesInfo/Itineries/ItineraryMap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchTripDetails } from "../../features/myTrips/MyTripsAction";
import { LanguageContext } from "../../context/LanguageContext";

const TripDetails = () => {

  const location = useLocation();

  const { id } = location.state;

  const [formState, setFormState] = useState({
     
      mode: 'driving',
    
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { language } = useContext(LanguageContext);
  const { tripDetails } = useSelector((state) => state.myTrips);

  useEffect(() => {
    if(id){
      dispatch(fetchTripDetails(id));
    }
    
  }, [language, id, dispatch]);

  const handleViewMoreDetails = (id) => {
    ;
    navigate('/places/details', { formState: { id } });
  };

  const handleActions = (e, action, id) => {
   if(action === 'editTrip') {
    navigate('/my-trips/edit', { state: { id: id } });
   }
  };

  return (
    <>
      <Header />
      <main className="page-center">
        <TripInfo handleActions={handleActions} id={id}/>
        <ItineraryMap places={[]} formState={formState} setFormState={setFormState} />
        <StopList tripDetails={tripDetails} handleViewMoreDetails={handleViewMoreDetails} />
        <SimilarPlaces />
      </main>
      <Footer />
    </>
  );
};

export default TripDetails;
