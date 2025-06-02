import React, { useState } from "react";
import styles from "../../pages/Blog/BlogPage.module.css";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function BlogCategories({ categories, loading, state, setState }) {

   const { t: tCommon } = useTranslation('Common');

  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 5;

  const displayedCategories = showAll ? categories : categories.slice(0, VISIBLE_COUNT);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const handleCategoriesSelect = (categoryId) => {
    console.log(categoryId, 'categoryId');
    setState((prev) => {
      // If the selected category is the same as the current one, reset
      if (prev.category === categoryId) {
        return { ...prev, category: null, categoryName: null };
      }
      // Otherwise, set the new category
      return {
        ...prev,
        category: categoryId,
        categoryName: categories.find(category => category.id === categoryId)?.name,
        tag: null,
        tagName: ""
      };
    });
  };

  if (loading) {
    return (
      <div className={styles.categoriesContainer}>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} width={80} height={32} style={{ marginRight: "8px" }} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.categoriesContainer}>
      {displayedCategories.map((category) => (
        <button key={category.id} className={`${styles.categoryButton} ${state.category === category.id ? styles.active : ""}`} onClick={() => handleCategoriesSelect(category.id)}>
          {category.name}
        </button>
      ))}
      {categories.length > VISIBLE_COUNT && (
        <span className={styles.viewMore} onClick={toggleShowAll}>
          {showAll ? tCommon('seeLess') : tCommon('seeMore')}
        </span>
      )}
    </div>
  );
}

export default BlogCategories;
