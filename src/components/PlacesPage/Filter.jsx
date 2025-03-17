import React, { useState } from 'react';
import styles from './Sidebar.module.css'; // Assuming you have a CSS module for styles

const Filter = ({ categories, ratings, state, setState }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [visibleSubcategories, setVisibleSubcategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleFilterChange = (subcategoryId, subcategoryTitle, categoryTitle = null, levelId, parentCategoryId = null, isSubcategory = false) => {
    console.log(subcategoryId, subcategoryTitle, categoryTitle, levelId, parentCategoryId, isSubcategory, 'handleFilterChange');
  
    // Update selected filters
    setSelectedFilters((prev) =>
      prev.includes(subcategoryTitle)
        ? prev.filter((f) => f !== subcategoryTitle)
        : [...prev, subcategoryTitle]
    );
  
    if (isSubcategory) {
      setSelectedFilters((prev) =>
        prev.includes(categoryTitle)
          ? prev.filter((f) => f !== categoryTitle)
          : [...prev, categoryTitle]
      );
    }
  
    setState((prevState) => {
      // Split and clean current categories, subcategories, and levels
      const currentCategories = prevState.categories ? prevState.categories.split(',').filter(Boolean) : [];
      const currentSubcategories = prevState.subcategories ? prevState.subcategories.split(',').filter(Boolean) : [];
      const currentLevels = prevState.levels ? prevState.levels.split(',').filter(Boolean) : [];
  
      // Trim whitespace and ensure consistent types
      const trimmedSubcategoryId = subcategoryId.toString().trim();
      const trimmedParentCategoryId = parentCategoryId ? parentCategoryId.toString().trim() : null;
      const trimmedLevelId = levelId.toString().trim();
  
      if (isSubcategory) {
        // Logic for subcategories
        if (currentSubcategories.includes(trimmedSubcategoryId)) {
          // Uncheck logic for subcategories
          const updatedSubcategories = currentSubcategories.filter((id) => id !== trimmedSubcategoryId);
          const updatedCategories = currentCategories.filter((id) => id !== trimmedParentCategoryId);
  
          // Check if any other subcategories under the same parent category are selected
          const hasOtherSubcategories = updatedSubcategories.some((id) =>
            categories.find((cat) => cat.id === trimmedParentCategoryId)?.categories.some((subcat) => subcat.id === id)
          );
  
          // Remove parentCategoryId from levels only if no subcategories are selected under it
          const updatedLevels = hasOtherSubcategories
            ? currentLevels
            : currentLevels.filter((id) => id !== trimmedLevelId);
  
          return {
            ...prevState,
            subcategories: updatedSubcategories.join(','),
            categories: updatedCategories.join(','),
            levels: updatedLevels.join(','),
          };
        } else {
          // Check logic for subcategories
          const updatedSubcategories = [...new Set([...currentSubcategories, trimmedSubcategoryId])];
          const updatedCategories = [...new Set([...currentCategories, trimmedParentCategoryId])];
          const updatedLevels = [...new Set([...currentLevels, trimmedLevelId])];
  
          return {
            ...prevState,
            subcategories: updatedSubcategories.join(','),
            categories: updatedCategories.join(','),
            levels: updatedLevels.join(','),
          };
        }
      } else {
        // Logic for normal categories
        if (currentCategories.includes(trimmedSubcategoryId)) {
          // Uncheck logic for categories
          const updatedCategories = currentCategories.filter((id) => id !== trimmedSubcategoryId);
  
          // Count the number of selected categories under the same level
          const selectedCategoriesUnderLevel = updatedCategories.filter((id) =>
            categories.find((cat) => cat.id === trimmedLevelId)?.categories.some((subcat) => subcat.id === id)
          ).length;
  
          // Remove levelId from levels only if no categories are selected under it
          const updatedLevels = selectedCategoriesUnderLevel > 0
            ? currentLevels
            : currentLevels.filter((id) => id !== trimmedLevelId);
  
          return {
            ...prevState,
            categories: updatedCategories.join(','),
            levels: updatedLevels.join(','),
          };
        } else {
          // Check logic for categories
          const updatedCategories = [...new Set([...currentCategories, trimmedSubcategoryId])];
          const updatedLevels = [...new Set([...currentLevels, trimmedLevelId])];
  
          return {
            ...prevState,
            categories: updatedCategories.join(','),
            levels: updatedLevels.join(','),
          };
        }
      }
    });
  };

  const handleRatingChange = (ratingValue) => {
    setState((prevState) => {
      const currentRatings = prevState.ratings ? prevState.ratings.split(',') : [];
      const trimmedRatingValue = ratingValue.toString().trim();
      const trimmedCurrentRatings = currentRatings.map((id) => id.toString().trim());

      if (trimmedCurrentRatings.includes(trimmedRatingValue)) {
        // If the rating is already selected, remove it
        const updatedRatings = trimmedCurrentRatings.filter((value) => value !== trimmedRatingValue);
        return {
          ...prevState,
          ratings: updatedRatings.join(','),
        };
      } else {
        // If the rating is not selected, add it
        const updatedRatings = [...trimmedCurrentRatings, trimmedRatingValue];
        return {
          ...prevState,
          ratings: updatedRatings.join(','),
        };
      }
    });
  };

  const toggleSubcategories = (categoryId) => {
    setVisibleSubcategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setState((prevState) => ({
      ...prevState,
      levels: '',
      categories: '',
      subcategories: '',
      ratings: '',
    }));
  };

  const renderSubcategories = (subcategories, parentCategoryId, parentCategoryTitle, mainCategoryId) => {
    return subcategories.map((subcategory) => (
      <div key={subcategory.id} className='subCategoryList'>
        <label className="check-container">
          <input
            type="checkbox"
            className={styles.subcategoryCheckbox}
            checked={selectedFilters.includes(subcategory.title)}
            onChange={() => handleFilterChange(subcategory.id, subcategory.title, parentCategoryTitle, mainCategoryId, parentCategoryId, true)}
          />
          <span className="checkmark"></span>
          {subcategory.title}
        </label>
        {subcategory.subcategories && subcategory.subcategories.length > 0 && (
          <div className={styles.nestedSubcategories}>
            {renderSubcategories(subcategory.subcategories, mainCategoryId)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.filterTitle}>Filtrar por:</h2>
      <div className={styles.clearFilters} onClick={clearFilters}>
        Eliminar filtros
      </div>
      {categories.map((mainCategory) => (
        <div key={mainCategory.id} className={styles.mainCategory}>
          <div
            className={styles.mainCategoryHeader}
            onClick={() => toggleCategory(mainCategory.id)}
          >
            <h3 className={styles.ratingTitle}>{mainCategory.title}</h3>
          </div>

          {expandedCategories[mainCategory.id] && (
            <div className={styles.categoryFilters}>
              {mainCategory.categories
                .slice(0, visibleSubcategories[mainCategory.id] ? mainCategory.categories.length : 4)
                .map((subcategory) => (
                  <>
                    <div className="categoryLabel" key={subcategory.id}>
                      <label className="check-container">
                        <input
                          type="checkbox"
                          className={styles.subcategoryCheckbox}
                          checked={selectedFilters.includes(subcategory.title)}
                          onChange={() => handleFilterChange(
                            subcategory.id, // subcategoryId
                            subcategory.title, // subcategoryTitle
                            null, // categoryTitle (not needed for categories)
                            mainCategory.id, // levelId
                            null, // parentCategoryId (not needed for categories)
                            false // isSubcategory
                          )}
                        />
                        <span className="checkmark"></span>
                        {subcategory.title}
                      </label>
                    </div>

                    {subcategory.subcategories && subcategory.subcategories.length > 0 && (
                      <div className={styles.nestedSubcategories}>
                        {renderSubcategories(subcategory.subcategories, subcategory.id, subcategory.title, mainCategory.id)}
                      </div>
                    )}
                  </>
                ))}
              {mainCategory.categories.length > 4 && (
                <span
                  className={styles.seeMoreFilterItems}
                  onClick={() => toggleSubcategories(mainCategory.id)}
                >
                  {visibleSubcategories[mainCategory.id] ? 'See Less' : 'See More'}
                </span>
              )}
            </div>
          )}
        </div>
      ))}

      <div className={styles.punctuationWrapper}>
        <h3 className={styles.ratingTitle}>Puntuación</h3>
        <div className={styles.ratingFilters}>
          {ratings.map((rating, index) => (
            <span key={index} className={styles.ratingLabel}>
              <label key={index} className="check-container">
                <input type="checkbox" checked={state.ratings?.includes(rating.value)}
                  onChange={() => handleRatingChange(rating.value)}/>
                <span className="checkmark"></span>
                {rating.label}
              </label>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;