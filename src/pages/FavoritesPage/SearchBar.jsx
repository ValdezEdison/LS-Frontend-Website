import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({togglePopup, handleSearch, state}) => {
  return (
    <div className={styles.eventSearch}>
      <div className={styles.searchContainer}>
        <h2 className={styles.searchTitle}>Encuentra tu evento</h2>
        <form className={styles.searchForm}>
          <div className={styles.inputWrapper}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c60a664a23f01dbed983b94542acfa8a942029c1?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt=""
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Busca por palabras clave"
              className={styles.searchInput}
              aria-label="Busca por palabras clave"
              value={state.keyword}
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </form>
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.filterButton} onClick={() => togglePopup('filterPanel', true)}>Filtros <img src={Filter}/></button>
      </div>
    </div>
  );
};

export default SearchBar;
