import React from "react";
import styles from "./ItineraryStops.module.css";

const stops = [
  {
    id: 1,
    name: "Museo de la Armada",
    address: "129 Rue de Grenelle, 75007 Paris, Francia",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/382b91d10ad6d826904592652177e4274b8183b0?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    rating: 4.1,
    reviews: 234,
  },
  {
    id: 2,
    name: "Musée du Louvre",
    address: "75001 Paris, Francia",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5ad119ac24fbafdb1505eeb8fe785b3a6d587271?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 3,
    name: "Catedral de Notre Dame",
    address: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, Francia",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/469af4c81f89a6d31ac08ef38df03adc4b23d54a?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    rating: 4.2,
    reviews: 234,
  },
  {
    id: 4,
    name: "Disneyland Paris",
    address: "Boulevard de Parc, s/n 77700 París, Francia",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/17f25763a069bf101cc021527fc78c73c43f7205?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    rating: 4.1,
    reviews: 234,
  },
  {
    id: 5,
    name: "Tour Eiffel",
    address: "Av. Gustave Eiffel, 75007 Paris, Francia",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/933d238ef6e50a83747a9c7d16f9b1db2de8a4cd?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    rating: 4.7,
    reviews: 234,
  },
];

const ItineraryStop = ({ stop }) => (
  <div className={styles.stopCard}>
    <div className={styles.stopImageContainer}>
      <img src={stop.image} alt={stop.name} className={styles.stopImage} />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/d4eff01f84d9396160aa0416ac405ccae9848863?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
        alt=""
        className={styles.stopIcon}
      />
    </div>
    <div className={styles.stopInfo}>
      <h3 className={styles.stopName}>{stop.name}</h3>
      <p className={styles.stopAddress}>{stop.address}</p>
      <div className={styles.stopRating}>
        Continuing from where we left off:
        <div className={styles.ratingScore}>{stop.rating}</div>
        <div className={styles.ratingInfo}>
          <div className={styles.ratingText}>Excelente</div>
          <div className={styles.reviewCount}>{stop.reviews} comentarios</div>
        </div>
      </div>
    </div>
    <button className={styles.removeButton}>Eliminar</button>
  </div>
);

const ItineraryStops = () => {
  return (
    <section className={styles.itineraryStops}>
      <h2 className={styles.sectionTitle}>París - 5 paradas, 3h y 30 min</h2>
      {stops.map((stop) => (
        <ItineraryStop key={stop.id} stop={stop} />
      ))}
    </section>
  );
};

export default ItineraryStops;
