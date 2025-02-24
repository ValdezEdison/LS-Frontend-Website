import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const categories = [
    "Alojamiento - Hotelería",
    "Arte y cultura",
    "Compras",
    "Emergencias",
    "Gastronomía",
    "Ocio y deporte",
    "Planificador de viajes y excursiones",
    "Salud y bienestar",
    "Servicios profesionales",
    "Vida nocturna",
  ];

  const ratings = [
    { label: "Excelente: 4 o más", value: 4 },
    { label: "Muy bueno: 3 o más", value: 3 },
    { label: "Bueno: 2 o más", value: 2 },
    { label: "Mejorable: menos de 2", value: 1 },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.mapContainer}>
        
        <div className={styles.mapFrame}>
          <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1be9944e10236113084d403d17d26bcff994236ff9a8f4b5fa063ceea9328db2?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Map"
          className={styles.map}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/df11d3e639a6734868b974ac4877f86bc7a88fb56257cdfa7b7842afa8e6a10c?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Map Pin"
          className={styles.mapPin}
        />
        </div>
        <button className={styles.viewMapButton}>Ver mapa</button>
      </div>
      <div className={styles.filters}>
        <h2 className={styles.filterTitle}>Filtrar por:</h2>
        <div className={styles.categoryFilters}>
          {categories.map((category, index) => (
            <label key={index} className={styles.categoryLabel}>
              {/* <input type="checkbox" className={styles.categoryCheckbox} /> */}
              {category}
            </label>
          ))}
        </div>
        <h3 className={styles.ratingTitle}>Puntuación</h3>
        <div className={styles.ratingFilters}>
          {ratings.map((rating, index) => (
            <span key={index} className={styles.ratingLabel}>
              {/* <input type="checkbox" className={styles.ratingCheckbox} /> */}
              <label key={index} className="check-container">
                {rating.label}
                <input type="checkbox"/>
                <span className="checkmark"></span>
              </label>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
