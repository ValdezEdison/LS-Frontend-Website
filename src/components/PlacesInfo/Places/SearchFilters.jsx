import React from "react";
import styles from "../../../pages/placesInfo/places/Places.module.css";


const SearchFilters = () => {
  return (
    <div className={styles.searchFilters}>
      <button className={styles.mapButton}>Ver mapa</button>
      <div className={styles.filterContainer}>
        <div className={styles.filterItem}>
          <label htmlFor="searchInput" className={styles.visuallyHidden}>
            Buscar
          </label>
          <input
            id="searchInput"
            type="text"
            className={styles.filterInput}
            placeholder="Selecciona una búsqueda"
            aria-label="Selecciona una búsqueda"
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="categoryInput" className={styles.visuallyHidden}>
            Categorías
          </label>
          <input
            id="categoryInput"
            type="text"
            className={styles.filterInput}
            placeholder="Selecciona una categoría"
            aria-label="Selecciona una categoría"
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="subcategoryInput" className={styles.visuallyHidden}>
            Subcategorías
          </label>
          <input
            id="subcategoryInput"
            type="text"
            className={styles.filterInput}
            placeholder="Selecciona una subcategoría"
            aria-label="Selecciona una subcategoría"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
