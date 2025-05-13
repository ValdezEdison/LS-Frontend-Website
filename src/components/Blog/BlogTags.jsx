import React, { useState } from "react";
import styles from "../../pages/Blog/BlogPage.module.css";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function BlogTags({ tags, loading, state, setState }) {

   const { t: tCommon } = useTranslation('Common');

  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 5;

  const displayedTags = showAll ? tags : tags.slice(0, VISIBLE_COUNT);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const handleTagSelect = (tagId) => {
    setState((prev) => {
      // If the selected tag is the same as the current one, reset
      if (prev.tag === tagId) {
        return { ...prev, tag: null, tagName: null };
      }
      // Otherwise, set the new tag
      return {
        ...prev,
        tag: tagId,
        tagName: tags.find(tag => tag.id === tagId)?.name
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
      {displayedTags.map((tag) => (
        <button key={tag.id} className={`${styles.categoryButton} ${state.tag === tag.id ? styles.active : ""}`} onClick={() => handleTagSelect(tag.id)}>
          {tag.name}
        </button>
      ))}
      {tags.length > VISIBLE_COUNT && (
        <span className={styles.viewMore} onClick={toggleShowAll}>
          {showAll ? tCommon('seeLess') : tCommon('seeMore')}
        </span>
      )}
    </div>
  );
}

export default BlogTags;
