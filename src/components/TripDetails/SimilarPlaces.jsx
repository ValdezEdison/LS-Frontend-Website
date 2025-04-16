import React from "react";
import styles from "./TripDetails.module.css";

const similarPlaces = [
  {
    name: "Hotel des Invalides",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7659eb5d9667692e4af025c900c9f531fbb3b4f9",
  },
  {
    name: "El panteón de París",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/392c8b090f51237c9240b8933a2c7248c65c7f15",
  },
  {
    name: "Ópera Garnier",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8a9e7bd00101821ab9c06f031002fbd9e57909e6",
  },
  {
    name: "Plaza de la Concordia",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/871ba08dda03790e261f87cb2e7d0d2d2dd462a9",
  },
];

const SimilarPlaces = () => {
  return (
    <div className={styles.similarPlaces}>
      <div className={styles.divider} />
      <h2 className={styles.sectionTitle}>Lugares similares</h2>
      <div className={styles.placeList}>
        {similarPlaces.map((place, index) => (
          <div key={index} className={styles.placeItem}>
            <img
              src={place.image}
              alt={place.name}
              className={styles.placeImage}
            />
            <div className={styles.placeName}>{place.name}</div>
            {index === similarPlaces.length - 1 && (
              <button
                className={styles.placeArrow}
                aria-label="Ver más lugares similares"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG content for arrow icon */}
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarPlaces;
