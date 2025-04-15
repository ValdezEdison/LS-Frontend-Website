import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import TripInfo from "../../components/TripDetails/TripInfo";
import StopList from "../../components/TripDetails/StopList";
import SimilarPlaces from "../../components/TripDetails/SimilarPlaces";
import ItineraryMap from "../../components/PlacesInfo/Itineries/ItineraryMap";

const TripDetails = () => {

  const [formState, setFormState] = useState({
     
      mode: 'driving',
    
    });

  return (
    <>
      <Header />
      <main className="page-center">
        <TripInfo />
        <ItineraryMap places={[]} formState={formState} setFormState={setFormState} />
        <StopList />
        <SimilarPlaces />
      </main>
      <Footer />
    </>
  );
};

export default TripDetails;
