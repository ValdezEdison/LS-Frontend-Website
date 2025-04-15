import React from "react";
import styles from "./TripDetails.module.css";
import StopCard from "./StopCard";
import ItineraryCard from "../PlacesInfo/Itineries/ItineraryCard";

const stops = [
  {
    number: 1,
    name: "Museo de la Armada",
    address: "129 Rue de Grenelle, 75007 Paris, Francia",
    images:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fa7c966e1c531c4adb9701082fd4069899d8a2fb",
    rating: 4.1,
    reviews: 234,
  },
  {
    number: 2,
    name: "Musée du Louvre",
    address: "75001 Paris, Francia",
    images:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2569026bfdc764dddbfb9391caf8dbd9391a92dd",
    rating: 4.5,
    reviews: 234,
  },
  {
    number: 3,
    name: "Catedral de Notre Dame",
    address: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, Francia",
    images:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/662ac0cc71d9ad5e12ee34285994622cf4600f34",
    rating: 4.2,
    reviews: 234,
  },
  {
    number: 4,
    name: "Disneyland Paris",
    address: "Boulevard de Parc, s/n 77700 París, Francia",
    images:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fe4e51665e76df4ba50ec786b6e5680114fb4349",
    rating: 4.1,
    reviews: 234,
  },
  {
    number: 5,
    name: "Tour Eiffel",
    address: "Av. Gustave Eiffel, 75007 Paris, Francia",
    images:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/85c8090215f3a085a80fbc7a7ce0f4ae100f010a",
    rating: 4.7,
    reviews: 234,
  },
];

const StopList = () => {
  return (
    <>
      <div className={styles.tripType}>
        <div className={styles.tripTypeTag}>Familiar</div>
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
      <h2 className={styles.tripSummary}>París - 5 paradas, 3h y 30 min</h2>
      <div className={styles.stopList}>
        {stops.map((stop) => (
          <ItineraryCard key={stop.number} place={stop} handleViewMoreDetails={() => {}}  />
        ))}
      </div>
    </>
  );
};

export default StopList;
