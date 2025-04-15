import React from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import ItineraryForm from "../../components/TravelItinerary/ItineraryForm";
import ItineraryMap from "../../components/TravelItinerary/ItineraryMap";
import ItineraryStops from "../../components/TravelItinerary/ItineraryStops";
import SuggestedStops from "../../components/TravelItinerary/SuggestedStops";
import SimilarPlaces from "../../components/TravelItinerary/SimilarPlaces";
import styles from "./TravelItinerary.module.css";

const TravelItinerary = () => {
  return (
    <div className={styles.travelItineraryContainer}>
      <Header />
      <main className="page-center">
        <ItineraryForm />
        <ItineraryMap />
        <ItineraryStops />
        <SuggestedStops />
        <SimilarPlaces />
      </main>
      <Footer />
    </div>
  );
};

export default TravelItinerary;
