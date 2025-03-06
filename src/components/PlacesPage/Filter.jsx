import styles from "./Sidebar.module.css";
const Filter = ({categories, ratings}) => {
    return (
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
                
                <input type="checkbox"/>
                <span className="checkmark"></span>
                {rating.label}
              </label>
            </span>
          ))}
        </div>
      </div>
    )
}

export default Filter