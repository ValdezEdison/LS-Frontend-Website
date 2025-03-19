import React from "react";
import styles from "../../../pages/placesInfo/places/Places.module.css";

const recommendedPlaces = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/4916cdf9cb17ddef1e4ad7dbaaf1c89024cc97611b134b14a23062d9123ae362?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    name: "Las Artes y las Ciencias",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f9acaf96f5ad9aaea5498a023804ae3686edc4aa7e51a8338af63bfb445bd6df?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    name: "Praça do Comércio",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8b26986555462676c202b43b45a9a9772bfd08cf881aab3118d4ee9c7b8985df?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    name: "Gendarmenmarkt",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/505edea46418a6c61db45ce434fe208a3b2c89ef800ed90149a6a6dff1ffc69e?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    name: "Ámsterdam",
  },
];

const RecommendedPlaces = () => {
  return (
    <section className={styles.recommendedPlaces}>
      <h2 className={styles.recommendedTitle}>
        Otras personas tambien han visto
      </h2>
      <div className={styles.recommendedGrid}>
        {recommendedPlaces.map((place, index) => (
          <div key={index} className={styles.recommendedItem}>
            <img
              src={place.image}
              alt={place.name}
              className={styles.recommendedImage}
            />
            <p className={styles.recommendedName}>{place.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedPlaces;
