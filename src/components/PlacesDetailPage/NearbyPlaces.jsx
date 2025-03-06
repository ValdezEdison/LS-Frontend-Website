import React from "react";
import styles from "./NearbyPlaces.module.css";

const NearbyPlaces = () => {
  const places = [
    {
      name: "Las Artes y las Ciencias",
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/4916cdf9cb17ddef1e4ad7dbaaf1c89024cc97611b134b14a23062d9123ae362?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    },
    {
      name: "Praça do Comércio",
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f9acaf96f5ad9aaea5498a023804ae3686edc4aa7e51a8338af63bfb445bd6df?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    },
    {
      name: "Gendarmenmarkt",
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8b26986555462676c202b43b45a9a9772bfd08cf881aab3118d4ee9c7b8985df?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    },
    {
      name: "Ámsterdam",
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/54a5c0012f59d5517bf63691d57b74e909fbc65b11749b981bae5cb1bc2018dc?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    },
  ];

  return (
    <section className={styles.nearbyPlaces}>
      <h2 className={styles.sectionTitle}>Otros lugares cercanos</h2>
      <div className={styles.placesList}>
        {places.map((place, index) => (
          <div key={index} className={styles.placeCard}>
            <img
              src={place.image}
              alt={place.name}
              className={styles.placeImage}
            />
            <h3 className={styles.placeName}>{place.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyPlaces;
