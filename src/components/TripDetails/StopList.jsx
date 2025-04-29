import React from "react";
import styles from "./TripDetails.module.css";
import ItineraryCard from "../PlacesInfo/Itineries/ItineraryCard";

const StopList = ({ tripDetails, handleViewMoreDetails }) => {
  // Calculate trip duration in days
  const getTripDuration = () => {
    if (!tripDetails?.initial_date || !tripDetails?.end_date) return '';
    const start = new Date(tripDetails.initial_date);
    const end = new Date(tripDetails.end_date);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return `${diffDays} days`;
  };

  // Get trip type based on the type from API
  // const getTripType = () => {
  //   switch(tripDetails?.type) {
  //     case 'romantic':
  //       return 'Romántico';
  //     case 'family':
  //       return 'Familiar';
  //     case 'adventure':
  //       return 'Aventura';
  //     default:
  //       return tripDetails?.type || 'Viaje';
  //   }
  // };

  return (
    <>
      <div className={styles.tripType}>
        <div className={styles.tripTypeTag}>{tripDetails?.type}</div>
        <div className={styles.icon}>
          <svg
            id="249:12022"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content for trip type icon */}
          </svg>
        </div>
      </div>
      
      <h2 className={styles.tripSummary}>
        {tripDetails?.stops?.length > 0 ? (
          `${tripDetails.stops.length} paradas`
        ) : (
          'No stops added yet'
        )}
      </h2>
      
      <div className={styles.stopList}>
        {tripDetails?.stops && tripDetails.stops.length > 0 ? (
          tripDetails.stops.map((stop, index) => (
            <ItineraryCard 
              key={stop.id} 
              place={stop} 
              index={index + 1} 
              handleViewMoreDetails={handleViewMoreDetails} 
            />
          ))
        ) : (
          <div className="no-results-wrapper">No stops available</div>
        )}
      </div>
    </>
  );
};

export default StopList;