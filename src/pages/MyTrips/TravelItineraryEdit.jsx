import React from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import ItineraryForm from "../../components/TravelItinerary/ItineraryForm";
import ItineraryMap from "../../components/TravelItinerary/ItineraryMap";
import ItineraryStops from "../../components/TravelItinerary/ItineraryStops";
import SuggestedStops from "../../components/TravelItinerary/SuggestedStops";
import SimilarPlaces from "../../components/TravelItinerary/SimilarPlaces";
import styles from "./TravelItinerary.module.css";

const TravelItineraryEdit = () => {
  return (
    <div className={styles.travelItineraryContainer}>
      <Header />
      <main className="page-center">
        <ItineraryForm />
        <ItineraryMap />
         <div className={styles.dropdown}>
            <div className={styles.filterBlock}>
              <div className={`${styles.filterHeader} ${styles.open}`}>
                <div className={styles.filterHeaderContent}>
                  <div className={styles.filterTitle}>Familiar</div>
                </div>
                <img src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b177707cf3dcb933dc1e6538151f45728e247ea5114b8d8a465e0c87724ee044?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&amp;" className="dropdownIcon" alt="Toggle Dropdown"/>
              </div>
            </div>
            <div className={`${styles.filterContent} ${styles.active}`}>
              <ul className={styles.filterChecklist}>
                <li>test11</li>
                <li>test21</li>
                <li>test11</li>
                <li>test21</li>
              </ul>
            </div>
          </div>
        <ItineraryStops />
        <SuggestedStops />
        <SimilarPlaces />
      </main>
      <Footer />
    </div>
  );
};

export default TravelItineraryEdit;
