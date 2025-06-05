import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterPanel.module.css";
import SearchInput from "../../common/SearchInput";
import { CalendarIcon } from "../../common/Images";
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';

const FilterPanel = ({ onClose, categories, cities, state, setState, onApplyFilters }) => {
  
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [expandedSections, setExpandedSections] = useState({
    levels: false,
    categories: false,
    search: false,
    sort: false
  });

  const { t } = useTranslation("FilterPanel");
  const isClearing = useRef(false);

  const [availableCategories, setAvailableCategories] = useState([]);

  // Initialize selected levels and categories from state, ensuring they're strings
  const [selectedLevels, setSelectedLevels] = useState(
    state.selectedLevel ? String(state.selectedLevel).split(',').filter(Boolean) : []
  );
  const [selectedCategories, setSelectedCategories] = useState(
    state.selectedCategory ? String(state.selectedCategory).split(',').filter(Boolean) : []
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState(
    state.selectedSubcategory ? String(state.selectedSubcategory).split(',').filter(Boolean) : []
  );

  // Number of items to show when collapsed
  const VISIBLE_ITEMS = 5;

  const suggestionRef = useRef(null);
  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);

  // Initialize with first level selected by default if none selected
  // useEffect(() => {
  //   if (categories?.length > 0 && selectedLevels.length === 0) {
  //     const defaultLevel = categories[0].id;
  //     setSelectedLevels([String(defaultLevel)]);
  //     updateState("selectedLevel", String(defaultLevel));
  //   }
  // }, [categories]);

  // Update available categories when selected levels change
  useEffect(() => {
    if (categories && selectedLevels.length > 0) {
      const cats = [];
      selectedLevels.forEach(levelId => {
        const level = categories.find(l => String(l.id) === String(levelId));
        if (level && level.categories) {
          cats.push(...level.categories);
        }
      });
      setAvailableCategories(cats);
    } else {
      setAvailableCategories([]);
    }
  }, [selectedLevels, categories]);

  const toggleLevel = (levelId) => {
    const levelIdStr = String(levelId);
    const newSelectedLevels = selectedLevels.includes(levelIdStr)
      ? selectedLevels.filter(id => id !== levelIdStr)
      : [...selectedLevels, levelIdStr];

    setSelectedLevels(newSelectedLevels);
    updateState("selectedLevel", newSelectedLevels.join(','));
  };

  const toggleCategory = (categoryId) => {
    const categoryIdStr = String(categoryId);
    const newSelectedCategories = selectedCategories.includes(categoryIdStr)
      ? selectedCategories.filter(id => id !== categoryIdStr)
      : [...selectedCategories, categoryIdStr];

    setSelectedCategories(newSelectedCategories);
    updateState("selectedCategory", newSelectedCategories.join(','));
  };

  const toggleSubcategory = (subcategoryId) => {
    const subcategoryIdStr = String(subcategoryId);
    const newSelectedSubcategories = selectedSubcategories.includes(subcategoryIdStr)
      ? selectedSubcategories.filter(id => id !== subcategoryIdStr)
      : [...selectedSubcategories, subcategoryIdStr];

    setSelectedSubcategories(newSelectedSubcategories);
    updateState("selectedSubcategory", newSelectedSubcategories.join(','));
  };

  // const toggleTag = (tag) => {
  //   setSelectedTags((prevTags) =>
  //     prevTags.includes(tag)
  //       ? prevTags.filter((t) => t !== tag)
  //       : [...prevTags, tag],
  //   );
  // };

  const toggleTag = (tag, sectionKey) => {
    if (sectionKey === 'sort') {
      // For sort section, only allow one selection at a time
      setSelectedTags(prevTags => 
        prevTags.includes(tag) ? [] : [tag]
      );
      // Update the sort value in state
      updateState("selectedOrder", SORT_OPTIONS[tag]);
    } else {
      // Original behavior for other sections
      setSelectedTags(prevTags =>
        prevTags.includes(tag)
          ? prevTags.filter(t => t !== tag)
          : [...prevTags, tag]
      );
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSearch = (value) => {
    updateState("destinationSearchQuery", value);
  };

  const handleSearchClose = (e) => {
    e.stopPropagation();
    updateState("destinationSearchQuery", "");
    updateState("selectedDestinationId", null);
    setShowSuggestionDropDown(false);
  };

  const handleClickOutside = (event) => {
    if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
      setShowSuggestionDropDown(false);
    }
  };

  useEffect(() => {
    if (showSuggestionDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestionDropDown]);

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
    if (key === "selectedDestinationId" && value) {
      setState((prev) => ({ ...prev, "destinationSearchQuery": "" }));
      setShowSuggestionDropDown(false);
    } else if (key === "destinationSearchQuery") {
      setShowSuggestionDropDown(true);
    }

  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange(dates);
    updateState("startDate", start);
    updateState("endDate", end);
  };

  const clearAllFilters = () => {
    isClearing.current = true;
    setSelectedLevels([]);
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedTags([]);
    setDateRange([null, null]);
    setState({
      selectedLevel: "",
      selectedCategory: "",
      selectedSubcategory: "",
      selectedDateRange: { startDate: null, endDate: null },
      page: 1,
      type: "event",
      // selectedCityId: null,
      selectedDestinationId: null,
      destinationSearchQuery: "",
      startDate: null,
      endDate: null,
      seletedOrder: null
    });
    //  applyFilters();
  };



  useEffect(() => {
    if (isClearing.current) {
      const areAllFiltersEmpty = 
        selectedLevels.length === 0 &&
        selectedCategories.length === 0 &&
        selectedSubcategories.length === 0 &&
        selectedTags.length === 0 &&
        dateRange.every(date => date === null) &&
        state.selectedLevel === "" &&
        state.selectedCategory === "" &&
        state.selectedSubcategory === "" &&
        state.selectedDestinationId === null &&
        state.destinationSearchQuery === "" &&
        state.startDate === null &&
        state.endDate === null;

      if (areAllFiltersEmpty) {
        applyFilters();
        isClearing.current = false; // Reset for next time
      }
    }
  }, [isClearing, state]);

  const applyFilters = () => {
    onApplyFilters();
    onClose();
  };

  const SORT_OPTIONS = {
    [t('filterPanel.sortOptions.recent')]: 1,
    [t('filterPanel.sortOptions.rated')]: 2,
    [t('filterPanel.sortOptions.recommended')]: 3
  };

  const renderLevelSection = () => (
    <div className={styles.categorySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t('filterPanel.levels')}</h2>
        {categories.length > VISIBLE_ITEMS && (
          <span
            className={styles.toggleLink}
            onClick={() => toggleSection('levels')}
          >
            {expandedSections.levels ? t('filterPanel.viewLess') : t('filterPanel.viewMore')}
          </span>
        )}
      </div>
      <div className={`${styles.tagContainer} ${!expandedSections.levels && styles.tagMore
        }`}>
        {categories?.map(level => (
          <span
            key={level.id}
            className={`${styles.tag} ${selectedLevels.includes(String(level.id)) ? styles.tagSelected : ""
              }`}
            onClick={() => toggleLevel(level.id)}
          >
            {level.title}
          </span>
        ))}
      </div>
    </div>
  );

  const renderCategorySection = () => (
    <div className={styles.categorySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t('filterPanel.categories')}</h2>
        {availableCategories.length > VISIBLE_ITEMS && (
          <span
            className={styles.toggleLink}
            onClick={() => toggleSection('categories')}
          >
            {expandedSections.categories ? t('filterPanel.viewLess') : t('filterPanel.viewMore')}
          </span>
        )}
      </div>
      <div className={`${styles.tagContainer} ${!expandedSections.categories && styles.tagMore
        }`}>
        {availableCategories?.map(category => (
          <span
            key={category.id}
            className={`${styles.tag} ${selectedCategories.includes(String(category.id)) ? styles.tagSelected : ""
              }`}
            onClick={() => toggleCategory(category.id)}
          >
            {category.title}
          </span>
        ))}
      </div>
    </div>
  );

  const renderSubcategorySection = () => (
    <div className={styles.categorySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t('filterPanel.subcategories')}</h2>
      </div>
      <div className={styles.tagContainer}>
        {availableCategories
          .filter(cat => selectedCategories.includes(String(cat.id)))
          .flatMap(cat => cat.subcategories || [])
          .map(subcategory => (
            <span
              key={subcategory.id}
              className={`${styles.tag} ${selectedSubcategories.includes(String(subcategory.id)) ? styles.tagSelected : ""
                }`}
              onClick={() => toggleSubcategory(subcategory.id)}
            >
              {subcategory.title}
            </span>
          ))}
      </div>
    </div>
  );

  const renderTagSection = (title, tags, sectionKey) => (
    <div className={styles.categorySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t(title)}</h2>
        {tags.length > VISIBLE_ITEMS && (
          <span
            className={styles.toggleLink}
            onClick={() => toggleSection(sectionKey)}
          >
            {expandedSections[sectionKey] ? t('filterPanel.viewLess') : t('filterPanel.viewMore')}
          </span>
        )}
      </div>
      <div className={styles.tagContainer}>
        {tags
          .slice(0, expandedSections[sectionKey] ? tags.length : VISIBLE_ITEMS)
          .map((tag) => (
            <span
              key={tag}
              className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagSelected : ""}`}
              onClick={() => toggleTag(tag, sectionKey)}
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.filterPanel}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t('filterPanel.title')}</h1>
            <button className={styles.closeIcon} aria-label="Cerrar panel de filtros" onClick={onClose}>
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.2578 23.763L10.237 11.7422C9.82627 11.3315 9.82627 10.6503 10.237 10.2396C10.6477 9.82887 11.3289 9.82887 11.7396 10.2396L23.7604 22.2604C24.1711 22.6711 24.1711 23.3523 23.7604 23.763C23.3497 24.1737 22.6685 24.1737 22.2578 23.763Z" fill="#151820" />
                <path d="M10.2396 23.763C9.82889 23.3523 9.82889 22.6711 10.2396 22.2604L22.2604 10.2396C22.6711 9.82887 23.3523 9.82887 23.763 10.2396C24.1737 10.6503 24.1737 11.3315 23.763 11.7422L11.7422 23.763C11.3315 24.1737 10.6503 24.1737 10.2396 23.763Z" fill="#151820" />
              </svg>
            </button>
          </header>
          <div className={styles.filterMain}>
            <form className={styles.filterSection}>
              <div className={styles.inputGroup}>
                <label htmlFor="dateRange" className={styles.label}>
                  {t('filterPanel.dateRange')}
                </label>
                <div className={styles.inputWithIcon}>
                  <img src={CalendarIcon} alt="Calendar" />
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDateChange}
                    placeholderText={t('filterPanel.dateRange')}
                    className={styles.datePickerInput}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    isClearable={true}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="destination" className={styles.label}>
                  {t('filterPanel.destination')}
                </label>
                <div className={styles.filterSearchContainer}>
                  <SearchInput
                    handleSearchClick={() => setShowSuggestionDropDown(true)}
                    suggestionRef={suggestionRef}
                    handleSearch={handleSearch}
                    showSuggestionDropDown={showSuggestionDropDown}
                    handleSearchClose={handleSearchClose}
                    searchValue={state.destinationSearchQuery}
                    suggestionsList={cities}
                    placeholder={t('filterPanel.searchPlaceholder')}
                    onSelect={(value) => updateState("selectedDestinationId", value)}
                    customClassName="placesSearchInputContainer"
                    selectedValue={state.selectedDestinationId}
                    customClassNameForSuggestions="suggestionsContainerSm"
                  />
                </div>
              </div>

              {renderLevelSection()}
              <div className={styles.divider} />

              {renderCategorySection()}
              <div className={styles.divider} />

              {renderSubcategorySection()}
              <div className={styles.divider} />

              {renderTagSection(
                "filterPanel.sortBy",
                Object.keys(SORT_OPTIONS), // This gives you the text labels
                'sort'
              )}
            </form>
            <div className={styles.filterFormBtnWrapper}>
              <button className={styles.applyButton} onClick={applyFilters}>{t('filterPanel.apply')}</button>
              <button className={styles.clearButton} onClick={clearAllFilters}>{t('filterPanel.clear')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;