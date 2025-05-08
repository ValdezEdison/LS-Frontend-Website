import React from "react";
import styles from "../../pages/Blog/BlogPage.module.css";

function BlogCategories() {
  return (
    <div className={styles.categoriesContainer}>
      <button className={styles.categoryButtonActive}>Todos (120 post)</button>
      <button className={styles.categoryButton}>Curiosidades</button>
      <button className={styles.categoryButton}>Imprescindibles</button>
      <button className={styles.categoryButton}>Mercados</button>
      <button className={styles.categoryButton}>Eventos</button>
    </div>
  );
}

export default BlogCategories;
