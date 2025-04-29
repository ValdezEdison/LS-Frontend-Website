import React from "react";
import styles from "./SuggestedStops.module.css";
import EventCard from "../common/EventCard";

const suggestedStops = [
  {
    id: 1,
    name: "Arc de Triomphe",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/3ffff18cec50ce8b27a2e0e083cbb899d59d2cbe?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    location: "París, Francia",
    category: "Puntos de interés, patrimonio histórico",
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 2,
    name: "Palacio de Versalles",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/a3103122324021a29e52fa5341d4af7d5e860913?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    location: "Versalles, Francia",
    category: "Puntos de interés, patrimonio histórico",
    rating: 4.3,
    reviews: 234,
  },
  {
    id: 3,
    name: "Musée Bourdelle",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/3af010c15a0d806fd735a73b6503eaa3c324a21b?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    location: "París, Francia",
    category: "Museos",
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 4,
    name: "Montmartre",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/9ee55d3e22b9236efe69c75b60b0feaa9d794452?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    location: "París, Francia",
    category: "Patrimonio histórico",
    rating: 5,
    reviews: 234,
  },
  {
    id: 5,
    name: "Musée du quai Branly",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/2bbdf23cb861bbbe495dbe5e1b21b2aed28754e4?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    location: "París, Francia",
    category: "Museos",
    rating: 4.1,
    reviews: 234,
  },
  {
    id: 6,
    name: "El Marais",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/ca9a8751eb7db3337acb08c1a614da8665c9f3dd?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    location: "París, Francia",
    category: "Patrimonio histórico",
    rating: 4.3,
    reviews: 234,
  },
];

const SuggestedStop = ({ stop }) => (
  <div className={styles.suggestedStop}>
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
      <p className={styles.stopLocation}>{stop.location}</p>
      <p className={styles.stopCategory}>{stop.category}</p>
      <div className={styles.stopRating}>
        <div className={styles.ratingScore}>{stop.rating}</div>
        <div className={styles.ratingInfo}>
          <div className={styles.ratingText}>Excelente</div>
          <div className={styles.reviewCount}>{stop.reviews} comentarios</div>
        </div>
      </div>
    </div>
    <div className={styles.stopActions}>
      <button className={styles.viewMoreButton}>Ver más</button>
      <button className={styles.addToTripButton}>
        <span className={styles.addIcon} />
        Añadir a viaje
      </button>
    </div>
  </div>
);

const SuggestedStops = () => {
  return (
    <section className={styles.suggestedStops}>
      <h2 className={styles.sectionTitle}>Añade más paradas a tu itinerario</h2>
      <div className={styles.stopsGrid}>
        {/* {suggestedStops.map((stop) => (
          <EventCard key={stop.id} stop={stop} />
        ))} */}
      </div>
      <button className={styles.showMoreButton}>Mostrar más</button>
    </section>
  );
};

export default SuggestedStops;
