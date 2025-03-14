import React from "react";
import styles from "./NearbyPlaces.module.css";

const nearbyPlacesData = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8a15037f35b363b8ba2c30c571b2d2de0084527b86ad043ebd1164dc7da4f370?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    name: "Las Artes y las Ciencias",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/54be879776329e326ee81dd14e863f9f6f9bb8b51718e7ad2d96b4efa528aa00?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    name: "Praça do Comércio",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/15b2c0f9f0c9e978b03535cfe05921f39d192e3e95274c1188c7e2c3fc3fe945?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    name: "Gendarmenmarkt",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/626e62c21e4c2871ebba886d97d701610007f52a85cbad0d0ec3f870be7051f1?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    name: "Ámsterdam",
  },
];

const NearbyPlaces = () => {
  return (
    <section className={styles.nearbyPlaces}>
      <div className="page-center">
        <h2 className={styles.title}>Otros lugares cercanos</h2>
        <div className={styles.placesList}>
          {nearbyPlacesData.map((place, index) => (
            <div key={index} className={styles.placeCard}>
              <img
                src={place.image}
                alt={place.name}
                className={styles.placeImage}
              />
              <p className={styles.placeName}>{place.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyPlaces;
