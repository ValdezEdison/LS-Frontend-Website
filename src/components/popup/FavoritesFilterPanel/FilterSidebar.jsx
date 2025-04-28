import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterSidebar.module.css";
import { SearchBlack } from "../../common/Images";
import SearchInput from "../../common/SearchInput";
import { useTranslation } from "react-i18next";

function FilterSidebar({ 
  onClose, 
  state, 
  setState,
  cities,
  categories,
  handleTypeChange,
  handleLevelChange,
  handleCategoryChange,
  handleSubcategoryChange,
  applyFilters,
  resetFilters
}) {
  const [openDropdown, setOpenDropdown] = useState({
    levels: false,
    categories: false,
    subcategories: false
  });

    const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);
     const suggestionRef = useRef(null);
     const levelDropdownRef = useRef(null);
     const categoryDropdownRef = useRef(null);
     const subcategoryDropdownRef = useRef(null);

     const { t } = useTranslation('FavoritesPage');
     const { t: tCommon } = useTranslation('Common');

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Get unique levels from categories data
  const levels = categories?.map(level => ({
    id: level.id,
    title: level.title
  })) || [];

  // Get categories for selected level
  const filteredCategories = categories
    ?.find(level => level.id === state.levelId)
    ?.categories || [];

  // Get subcategories for selected category
  const filteredSubcategories = filteredCategories
    ?.find(category => category.id === state.categoryId)
    ?.subcategories || [];


    const handleSearch = (value) => {
      updateState("destinationSearchQuery", value);
  
    };

    const handleSearchClose = (e) => {
      e.stopPropagation();
      updateState("destinationSearchQuery", "");
      updateState("selectedDestinationId", null);
      setShowSuggestionDropDown(false);
    };


    const updateState = (key, value) => {
      setState((prev) => ({ ...prev, [key]: value }));
      if (key === "selectedCountryId" && value) {
        setState((prev) => ({ ...prev, "selectedCountryName": countries.find((country) => country.id === value).name }));
      }
      // setShowSuggestionDropDown(false);
    };


    useEffect(() => {
      const handleClickOutside = (event) => {
        if (levelDropdownRef.current && !levelDropdownRef.current.contains(event.target)) {
          setOpenDropdown(prev => ({ ...prev, levels: false }));
        }
        if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
          setOpenDropdown(prev => ({ ...prev, categories: false }));
        }
        if (subcategoryDropdownRef.current && !subcategoryDropdownRef.current.contains(event.target)) {
          setOpenDropdown(prev => ({ ...prev, subcategories: false }));
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <div className={styles.sidebarOverlay}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>{t('filters.title')}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <i className={styles.popupcloseIcon} />
          </button>
        </div>
        
           <div className={styles.filterSection}>
          <h3 className={styles.title}>{t('filters.destination')}</h3>
          {/* <div className={styles.searchInput}> */}
            {/* <i className={styles.searchIcon} /> */}
            {/* <img src={SearchBlack}/> */}
            <div className={styles.searchContainer}>
            <SearchInput
            handleSearchClick={() => setShowSuggestionDropDown(true)}
            suggestionRef={suggestionRef}
            handleSearch={handleSearch}
            showSuggestionDropDown={showSuggestionDropDown}
            handleSearchClose={handleSearchClose}
            searchValue={state.destinationSearchQuery}
            suggestionsList={cities}
            placeholder={t("search.placeholder")}
            onSelect={(value) => updateState("selectedDestinationId", value)}
            customClassName="placesSearchInputContainer"
            selectedValue={state.selectedDestinationId}
          />
            </div> 
          {/* </div> */}
        </div>
        
        {/* Type Selection */}
        <div className={styles.filterSection}>
          <h3 className={styles.title}>{t('filters.type')}</h3>
          <div className={styles.radioGroup}>
            <div className={styles.typesRadiowrapper}>
              <label className="radioContainer">
                <input 
                  type="radio" 
                  name="type" 
                  value="event"
                  checked={state.type === "event"}
                  onChange={() => handleTypeChange("event")}
                />
                <span className="checkmark"></span>
              </label>
              <span>{t('filters.types.event')}</span>
            </div>
            <div className={styles.typesRadiowrapper}>
              <label className="radioContainer">
                <input 
                  type="radio" 
                  name="type" 
                  value="place"
                  checked={state.type === "place"}
                  onChange={() => handleTypeChange("place")}
                />
                <span className="checkmark"></span>
              </label>
              <span>{t('filters.types.place')}</span>
            </div>
            <div className={styles.typesRadiowrapper}>
              <label className="radioContainer">
                <input 
                  type="radio" 
                  name="type" 
                  value=""
                  checked={state.type === ""}
                  onChange={() => handleTypeChange("")}
                />
                <span className="checkmark"></span>
              </label>
              <span>{t('filters.types.all')}</span>
            </div>
          </div>
        </div>

        {/* Level Selection */}
        <div className={styles.filterSection}>
          <h3 className={styles.title}>{t('filters.level')}</h3>
          <div className={styles.dropdown} ref={levelDropdownRef}>
            <div 
              className={styles.filterBlock} 
              onClick={() => toggleDropdown('levels')}
            >
              <div className={styles.filterHeader}>
                <div className={styles.filterHeaderContent}>
                  <div className={styles.filterTitle}>
                    {state.levelId ? 
                      levels.find(l => l.id === state.levelId)?.title || t('filters.selected') 
                      : t('filters.selectLevel')}
                  </div>
                </div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b177707cf3dcb933dc1e6538151f45728e247ea5114b8d8a465e0c87724ee044?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                  className={`${styles.dropdownIcon} ${openDropdown.levels ? styles.rotated : ''}`}
                  alt="Toggle Dropdown"
                />
              </div>
            </div>
            
            {openDropdown.levels && (
              <div className={styles.filterContent}>
                <ul className={styles.filterList}>
                  {levels.map(level => (
                    <li 
                      key={level.id}
                      className={state.levelId === level.id ? styles.selected : ''}
                      onClick={() => {
                        handleLevelChange(level.id);
                        toggleDropdown('levels');
                      }}
                    >
                      {level.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Category Selection (only shown if level is selected) */}
        {state.levelId && (
          <div className={styles.filterSection}>
            <h3 className={styles.title}>{t('filters.category')}</h3>
            <div className={styles.dropdown} ref={categoryDropdownRef}>
              <div 
                className={styles.filterBlock} 
                onClick={() => toggleDropdown('categories')}
              >
                <div className={styles.filterHeader}>
                  <div className={styles.filterHeaderContent}>
                    <div className={styles.filterTitle}>
                      {state.categoryId ? 
                        filteredCategories.find(c => c.id === state.categoryId)?.title || t('filters.selected') 
                        : t('filters.selectCategory')}
                    </div>
                  </div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b177707cf3dcb933dc1e6538151f45728e247ea5114b8d8a465e0c87724ee044?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                    className={`${styles.dropdownIcon} ${openDropdown.categories ? styles.rotated : ''}`}
                    alt="Toggle Dropdown"
                  />
                </div>
              </div>
              
              {openDropdown.categories && (
                <div className={styles.filterContent}>
                  <ul className={styles.filterList}>
                    {filteredCategories.map(category => (
                      <li 
                        key={category.id}
                        className={state.categoryId === category.id ? styles.selected : ''}
                        onClick={() => {
                          handleCategoryChange(category.id);
                          toggleDropdown('categories');
                        }}
                      >
                        {category.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Subcategory Selection (only shown if category is selected and has subcategories) */}
        {state.categoryId && filteredSubcategories.length > 0 && (
          <div className={styles.filterSection}>
            <h3 className={styles.title}>{t('filters.subcategory')}</h3>
            <div className={styles.dropdown} ref={subcategoryDropdownRef}>
              <div 
                className={styles.filterBlock} 
                onClick={() => toggleDropdown('subcategories')}
              >
                <div className={styles.filterHeader}>
                  <div className={styles.filterHeaderContent}>
                    <div className={styles.filterTitle}>
                      {state.subcategoryId ? 
                        filteredSubcategories.find(s => s.id === state.subcategoryId)?.title || t('filters.selected') 
                        : t('filters.selectSubcategory')}
                    </div>
                  </div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b177707cf3dcb933dc1e6538151f45728e247ea5114b8d8a465e0c87724ee044?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                    className={`${styles.dropdownIcon} ${openDropdown.subcategories ? styles.rotated : ''}`}
                    alt="Toggle Dropdown"
                  />
                </div>
              </div>
              
              {openDropdown.subcategories && (
                <div className={styles.filterContent}>
                  <ul className={styles.filterList}>
                    {filteredSubcategories.map(subcategory => (
                      <li 
                        key={subcategory.id}
                        className={state.subcategoryId === subcategory.id ? styles.selected : ''}
                        onClick={() => {
                          handleSubcategoryChange(subcategory.id);
                          toggleDropdown('subcategories');
                        }}
                      >
                        {subcategory.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button 
            className={styles.clearButton}
            onClick={resetFilters}
          >
            {t('filters.buttons.clear')}
          </button>
          <button 
            className={styles.applyButton}
            onClick={applyFilters}
          >
            {t('filters.buttons.apply')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;