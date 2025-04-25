import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <form className={styles.searchBar} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="searchInput" className={styles.visuallyHidden}>
        Buscar destinos
      </label>
      <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/23adcc496c13e14503025c9ac82cf17842b7cfed?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt=""
          className={styles.searchIcon}
        />
      <input
        type="text"
        id="searchInput"
        className={styles.searchInput}
        placeholder="Ciudad, país, eventos..."
        aria-label="Buscar destinos"
      />
      {/* <button type="submit" className={styles.searchButton} aria-label="Buscar">
        
      </button> */}
    </form>
  );
};

export default SearchBar;
