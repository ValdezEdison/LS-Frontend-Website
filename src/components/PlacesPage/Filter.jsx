import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css'; // Assuming you have a CSS module for styles
import { useTranslation } from 'react-i18next';

const Filter = ({ categories, ratings, state, setState, onSearch=() => {} }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [visibleSubcategories, setVisibleSubcategories] = useState({});
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  const { t } = useTranslation('Places');
  const { t: tCommon } = useTranslation('Common');

  // Update selectedFilters and expandedCategories whenever filter state changes
  useEffect(() => {
    const newSelectedFilters = [];
    const newExpandedCategories = {};
    
    // Check active filters (independent of expansion state)
    const hasLevels = Boolean(state.levels && state.levels.length > 0);
    const hasCategories = Boolean(state.categories && state.categories.length > 0);
    const hasSubcategories = Boolean(state.subcategories && state.subcategories.length > 0);
    const hasAnyFilters = hasLevels || hasCategories || hasSubcategories;

    // Update active filters state (independent of UI expansion)
    setHasActiveFilters(hasAnyFilters);

    // If no filters, reset expansion and selected filters
    if (!hasAnyFilters) {
        setExpandedCategories({});
        setSelectedFilters([]);
        return;
    }

    // Process levels for expansion and filter titles
    if (hasLevels) {
      const levelIds = state.levels.split(',').filter(Boolean);
      
      // First, remove any expanded categories that are no longer in levelIds
      Object.keys(expandedCategories).forEach(expandedId => {
          if (!levelIds.includes(expandedId)) {
              delete expandedCategories[expandedId];

          }
      });

      // Then process current levelIds
      levelIds.forEach(levelId => {
          const level = categories.find(cat => cat.id.toString() === levelId.toString());
          if (level) {
              newSelectedFilters.push(level.title);
              newExpandedCategories[level.id] = true;
          }
      });
    }

    // Process categories for expansion and filter titles
    if (hasCategories) {
        const categoryIds = state.categories.split(',').filter(Boolean);
        categoryIds.forEach(categoryId => {
            for (const level of categories) {
                const category = level.categories?.find(cat => cat.id.toString() === categoryId.toString());
                if (category) {
                    newSelectedFilters.push(category.title);
                    newExpandedCategories[level.id] = true; // Expand parent level
                    break;
                }
            }
        });
    }

    // Process subcategories for expansion and filter titles
    if (hasSubcategories) {
        const subcategoryIds = state.subcategories.split(',').filter(Boolean);
        subcategoryIds.forEach(subcategoryId => {
            for (const level of categories) {
                for (const category of level.categories || []) {
                    const subcategory = category.subcategories?.find(
                        sub => sub.id.toString() === subcategoryId.toString()
                    );
                    if (subcategory) {
                        newSelectedFilters.push(subcategory.title);
                        newExpandedCategories[level.id] = true; // Expand parent level
                        break;
                    }
                }
            }
        });
    }

    // Update states
    setSelectedFilters([...new Set(newSelectedFilters)]);
    setExpandedCategories(prev => ({
        ...prev, // Preserve any manually expanded categories
        ...newExpandedCategories // Add required expansions
    }));

}, [state.levels, state.categories, state.subcategories, state.ratings, categories]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleFilterChange = (subcategoryId, subcategoryTitle, categoryTitle = null, levelId, parentCategoryId = null, isSubcategory = false) => {
    ;
  
    // Update selected filters
    setSelectedFilters((prev) =>
      prev.includes(subcategoryTitle)
        ? prev.filter((f) => f !== subcategoryTitle)
        : [...prev, subcategoryTitle]
    );
  
    if (isSubcategory) {
      setSelectedFilters((prev) => {
        const alreadySelected = prev.includes(categoryTitle);
    
        // If subcategories exist and category is already selected, do not remove it
        if (alreadySelected && state.subcategories.length >= 0) {
          return prev;
        }
    
        return alreadySelected
          ? prev.filter((f) => f !== categoryTitle)
          : [...prev, categoryTitle];
      });
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
          // const hasOtherSubcategories = updatedSubcategories.some((id) =>
          //   categories.find((cat) => cat.id === trimmedParentCategoryId)?.categories.some((subcat) => subcat.id === id)
          // );

          const hasOtherSubcategories = updatedCategories.filter((id) =>
            categories.find((cat) => cat.id.toString() === trimmedLevelId)?.categories.some((subcat) => subcat.id.toString() === id)
          ).length;
  
          // Remove parentCategoryId from levels only if no subcategories are selected under it
          const updatedLevels = hasOtherSubcategories
            ? currentLevels
            : currentLevels.filter((id) => id !== trimmedLevelId);
  
          return {
            ...prevState,
            subcategories: updatedSubcategories.join(','),
            // categories: updatedCategories.join(','),
            // levels: updatedLevels.join(','),
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
            categories.find((cat) => cat.id.toString() === trimmedLevelId)?.categories.some((subcat) => subcat.id.toString() === id)
          ).length;
          
  
          // Remove levelId from levels only if no categories are selected under it
          const updatedLevels = selectedCategoriesUnderLevel > 0
            ? currentLevels
            : currentLevels.filter((id) => id !== trimmedLevelId);
  
          return {
            ...prevState,
            categories: updatedCategories.join(','),
            // levels: updatedLevels.join(','),
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
  const [hasFiltersChanged, setHasFiltersChanged] = useState(false);
  const [lastClearEvent, setLastClearEvent] = useState(null);

  const clearFilters = (e) => {
    setLastClearEvent(e);
    setSelectedFilters([]);
    setState((prevState) => ({
      ...prevState,
      levels: '',
      categories: '',
      subcategories: '',
      ratings: '',
    }));
    setExpandedCategories({});
    setHasFiltersChanged(true);
  };

     
  
    useEffect(() => {
    if (hasFiltersChanged) {
          onSearch(lastClearEvent);
        setHasFiltersChanged(false);
        setLastClearEvent(null);
    }
    }, [state, hasFiltersChanged]);

  useEffect(() => {
    const hasFilters = 
      (state.levels && state.levels.length > 0) ||
      (state.categories && state.categories.length > 0) ||
      (state.subcategories && state.subcategories.length > 0) ||
      (state.ratings && state.ratings.length > 0);
    
    setHasActiveFilters(hasFilters);
  }, [state.levels, state.categories, state.subcategories, state.ratings]);



  const handleMainCategoryChange = (mainCategoryId, mainCategoryTitle) => {
    setState((prevState) => {
      const currentLevels = prevState.levels ? prevState.levels.split(',').filter(Boolean) : [];
      const currentCategories = prevState.categories ? prevState.categories.split(',').filter(Boolean) : [];
      const currentSubcategories = prevState.subcategories ? prevState.subcategories.split(',').filter(Boolean) : [];
      
      const trimmedMainCategoryId = mainCategoryId.toString().trim();
      const mainCategory = categories.find(cat => cat.id.toString() === trimmedMainCategoryId);

      if (currentLevels.includes(trimmedMainCategoryId)) {
        // Unselecting the main category - remove it and all its categories/subcategories
        const updatedLevels = currentLevels.filter(id => id !== trimmedMainCategoryId);
        
        // Get all category IDs under this main category
        const categoryIdsToRemove = mainCategory.categories.map(cat => cat.id.toString());
        
        // Get all subcategory IDs under this main category
        const subcategoryIdsToRemove = mainCategory.categories.flatMap(cat => 
          cat.subcategories ? cat.subcategories.map(sub => sub.id.toString()) : []
        );

        // Remove these categories and subcategories
        const updatedCategories = currentCategories.filter(id => !categoryIdsToRemove.includes(id));
        const updatedSubcategories = currentSubcategories.filter(id => !subcategoryIdsToRemove.includes(id));

        // Update selected filters by removing all related titles
        const titlesToRemove = [
          mainCategoryTitle,
          ...mainCategory.categories.map(cat => cat.title),
          ...mainCategory.categories.flatMap(cat => 
            cat.subcategories ? cat.subcategories.map(sub => sub.title) : []
          )
        ];
        setSelectedFilters(prev => prev.filter(f => !titlesToRemove.includes(f)));

        return {
          ...prevState,
          levels: updatedLevels.join(','),
          categories: updatedCategories.join(','),
          subcategories: updatedSubcategories.join(','),
        };
      } else {
        // Selecting the main category - just add it to levels
        const updatedLevels = [...new Set([...currentLevels, trimmedMainCategoryId])];
        
        // Add main category title to selected filters
        setSelectedFilters(prev => [...new Set([...prev, mainCategoryTitle])]);

        return {
          ...prevState,
          levels: updatedLevels.join(','),
        };
      }
    });
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
      <h2 className={styles.filterTitle}>{t("filter.filterBy")}</h2>
      {hasActiveFilters && (
        <div className={styles.clearFilters} onClick={(e) => clearFilters(e)}>
          {tCommon("removeFilters")}
        </div>
      )}
      {categories.map((mainCategory) => (
        <div key={mainCategory.id} className={styles.mainCategory}>
          <div
            className={styles.mainCategoryHeader}
            // onClick={() => toggleCategory(mainCategory.id)}
            onClick={() => {
              toggleCategory(mainCategory.id);
              handleMainCategoryChange(mainCategory.id, mainCategory.title);
            }}
          >
            <h3 className={styles.ratingTitle}>{mainCategory.title}</h3>
          </div>

          {expandedCategories[mainCategory.id] && (
            <div className={styles.categoryFilters} key={mainCategory.id}>
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
                  {visibleSubcategories[mainCategory.id] ? tCommon('seeLess') : tCommon('seeMore')}
                </span>
              )}
            </div>
          )}
        </div>
      ))}

      <div className={styles.punctuationWrapper}>
        <h3 className={styles.ratingTitle}>{t('ratings.title')}</h3>
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