import React from "react";
import styles from "./FilterSidebar.module.css";

function FilterSidebar({ onClose }) {
  return (
    <div className={styles.sidebarOverlay}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Filtros favoritos</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <i className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Destino</h3>
          <div className={styles.searchInput}>
            <i className={styles.searchIcon} />
            <input type="text" placeholder="Busca tu destino" />
          </div>
        </div>
        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Tipo</h3>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input type="radio" name="type" defaultChecked />
              <span>Eventos</span>
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="type" />
              <span>Lugares</span>
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="type" />
              <span>Todo</span>
            </label>
          </div>
        </div>
        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Búsqueda</h3>
          <select className={styles.select}>
            <option>Selecciona una búsqueda</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Subcategoría</h3>
          <select className={styles.select}>
            <option>Selecciona una categoría</option>
          </select>
        </div>
        <button className={styles.applyButton}>Aplicar</button>
      </div>
    </div>
  );
}

export default FilterSidebar;
