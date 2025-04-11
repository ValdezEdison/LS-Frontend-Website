import React from "react";
import styles from "./RecommendedEvents.module.css";

const events = [
  {
    id: 1,
    title: "Kensington Dollshouse Festival",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/6abe00b431936187be2d4bffd8d4a14e2133d5a7?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    id: 2,
    title: "Summer Social 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/06be83c0c86c2b4f9f95f7126d2141f946506f8f?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    id: 3,
    title: "Open Bar Afro Caribbean",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5e156a4a5130dc91abb2ab162b45b9f32afeacb3?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    id: 4,
    title: "Asbury Park Vegan Food Festival",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/0bb18e49f85c62158598e8283bfa8cfc47c96f64?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
];

const RecommendedEvents = () => {
  return (
    <section className={styles.recommendedEvents}>
      <h2 className={styles.sectionTitle}>Otras personas tambien han visto</h2>
      <div className={styles.eventGrid}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <img
              src={event.image}
              alt={event.title}
              className={styles.eventImage}
            />
            <h3 className={styles.eventTitle}>{event.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedEvents;
