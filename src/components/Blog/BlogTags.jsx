import React from "react";
import styles from "../../pages/Blog/BlogPage.module.css";

function BlogTags({ tags }) {
  return (
    <div className={styles.categoriesContainer}>
      {tags.map((tag) => (
        <button 
          key={tag.id} 
          className={styles.categoryButton}
        >
          {tag.name}
        </button>
      ))}
      <span className={styles.viewMore}>More</span>
    </div>
  );
}

export default BlogTags;