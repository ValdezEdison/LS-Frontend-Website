import React from "react";
import styles from "./SimilarPlaces.module.css";

const similarPlaces = [
  {
    id: 1,
    name: "Hotel des Invalides",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/9ecc41eeb79266e5f72c0be54eb4b876eb49fad7?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    id: 2,
    name: "El panteón de París",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/77624445f07a8f2f9f0284a12f23a5047af7f990?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    id: 3,
    name: "Ópera Garnier",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/cb553dbfb5dd7f8e7c3fbb739b4ceba375ac9be3?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    id: 4,
    name: "Plaza de la Concordia",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f502fba828effc711f3c585ab81bfc8abf8779b9?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
];

const SimilarPlaces = () => {
  return (
    <section className={styles.similarPlaces}>
      <h2 className={styles.sectionTitle}>Lugares similares</h2>
      <div className={styles.placesGrid}>
        {similarPlaces.map((place) => (
          <div key={place.id} className={styles.placeCard}>
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

export default SimilarPlaces;
