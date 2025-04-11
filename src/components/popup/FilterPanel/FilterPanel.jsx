import React, { useState } from "react";
import styles from "./FilterPanel.module.css";
import SearchInput from "../../common/SearchInput";

const FilterPanel = ({ 
  onClose, 
  categories, 
  cities,
  selectedLevel,
  selectedCategory,
  selectedSubcategory,
  selectedCityId,
  dateRange,
  sortBy,
  onLevelSelect,
  onCategorySelect,
  onSubcategorySelect,
  onCitySelect,
  onDateRangeChange,
  onSortBy,
  onResetFilters,
  allCategories,
  allSubcategories
}) => {
  const [showMoreLevels, setShowMoreLevels] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreSubcategories, setShowMoreSubcategories] = useState(false);
  const [localDateRange, setLocalDateRange] = useState(dateRange);

  const handleApplyFilters = () => {
    onDateRangeChange(localDateRange);
    onClose();
  };

  const handleResetFilters = () => {
    onResetFilters();
    setLocalDateRange({ startDate: null, endDate: null });
  };

  const renderLevelSection = () => (
    <div className={styles.categorySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Búsqueda</h2>
        <button 
          className={styles.toggleLink}
          onClick={() => setShowMoreLevels(!showMoreLevels)}
        >
          {showMoreLevels ? "Ver menos" : "Ver más"}
        </button>
      </div>
      <div className={`${styles.tagContainer} ${showMoreLevels ? styles.tagMore : ''}`}>
        {categories?.map(level => (
          <button
            key={level.id}
            className={`${styles.tag} ${selectedLevel === level.id ? styles.tagSelected : ''}`}
            onClick={() => onLevelSelect(level.id)}
          >
            {level.title}
          </button>
        ))}
      </div>
    </div>
  );

  const renderCategorySection = () => {
    const filteredCategories = selectedLevel 
      ? allCategories.filter(cat => cat.levelId === selectedLevel)
      : allCategories;

    return (
      <div className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Categoría</h2>
          {filteredCategories.length > 5 && (
            <button 
              className={styles.toggleLink}
              onClick={() => setShowMoreCategories(!showMoreCategories)}
            >
              {showMoreCategories ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>
        <div className={`${styles.tagContainer} ${showMoreCategories ? styles.tagMore : ''}`}>
          {filteredCategories.slice(0, showMoreCategories ? filteredCategories.length : 5).map(category => (
            <button
              key={category.id}
              className={`${styles.tag} ${selectedCategory === category.id ? styles.tagSelected : ''}`}
              onClick={() => onCategorySelect(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSubcategorySection = () => {
    const filteredSubcategories = selectedCategory
      ? allSubcategories.filter(sub => sub.categoryId === selectedCategory)
      : [];

    if (filteredSubcategories.length === 0) return null;

    return (
      <div className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Subcategoría</h2>
          {filteredSubcategories.length > 5 && (
            <button 
              className={styles.toggleLink}
              onClick={() => setShowMoreSubcategories(!showMoreSubcategories)}
            >
              {showMoreSubcategories ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>
        <div className={`${styles.tagContainer} ${showMoreSubcategories ? styles.tagMore : ''}`}>
          {filteredSubcategories.slice(0, showMoreSubcategories ? filteredSubcategories.length : 5).map(subcategory => (
            <button
              key={subcategory.id}
              className={`${styles.tag} ${selectedSubcategory === subcategory.id ? styles.tagSelected : ''}`}
              onClick={() => onSubcategorySelect(subcategory.id)}
            >
              {subcategory.title}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSortSection = () => (
    <div className={styles.categorySection}>
      <h2 className={styles.sectionTitle}>Ordenar por</h2>
      <div className={styles.tagContainer}>
        <button 
          className={`${styles.tag} ${sortBy === 'recent' ? styles.tagSelected : ''}`}
          onClick={() => onSortBy('recent')}
        >
          Más recientes
        </button>
        <button 
          className={`${styles.tag} ${sortBy === 'rating' ? styles.tagSelected : ''}`}
          onClick={() => onSortBy('rating')}
        >
          Más valorados
        </button>
        <button 
          className={`${styles.tag} ${sortBy === 'recommended' ? styles.tagSelected : ''}`}
          onClick={() => onSortBy('recommended')}
        >
          Nuestra recomendación
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.filterPanel}>
          <header className={styles.header}>
            <h1 className={styles.title}>Todos los filtros</h1>
            <button
              className={styles.closeIcon}
              aria-label="Cerrar panel de filtros" 
              onClick={onClose}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.2578 23.763L10.237 11.7422C9.82627 11.3315 9.82627 10.6503 10.237 10.2396C10.6477 9.82887 11.3289 9.82887 11.7396 10.2396L23.7604 22.2604C24.1711 22.6711 24.1711 23.3523 23.7604 23.763C23.3497 24.1737 22.6685 24.1737 22.2578 23.763Z"
                  fill="#151820"
                />
                <path
                  d="M10.2396 23.763C9.82889 23.3523 9.82889 22.6711 10.2396 22.2604L22.2604 10.2396C22.6711 9.82887 23.3523 9.82887 23.763 10.2396C24.1737 10.6503 24.1737 11.3315 23.763 11.7422L11.7422 23.763C11.3315 24.1737 10.6503 24.1737 10.2396 23.763Z"
                  fill="#151820"
                />
              </svg>
            </button>
          </header>
          <div className={styles.filterMain}>
            <form className={styles.filterSection}>
              <div className={styles.inputGroup}>
                <label htmlFor="dateRange" className={styles.label}>
                  Fechas de inicio - fechas de fin del evento
                </label>
                <div className={styles.inputWrapper}>
                  <svg
                    className={styles.inputIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Calendar icon paths */}
                  </svg>
                  <input
                    id="dateRange"
                    className={styles.input}
                    type="text"
                    placeholder="Fecha inicio - fecha fin"
                    aria-label="Seleccionar rango de fechas"
                    value={
                      localDateRange.startDate && localDateRange.endDate 
                        ? `${localDateRange.startDate.toLocaleDateString()} - ${localDateRange.endDate.toLocaleDateString()}`
                        : ''
                    }
                    readOnly
                    onClick={() => {
                      // Here you would typically open a date picker component
                      // For now, we'll just simulate setting some dates
                      const startDate = new Date();
                      const endDate = new Date();
                      endDate.setDate(startDate.getDate() + 7);
                      setLocalDateRange({ startDate, endDate });
                    }}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="destination" className={styles.label}>
                  Destino
                </label>
                <div className={styles.inputWrapper}>
                  <svg
                    className={styles.inputIcon}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Search icon paths */}
                  </svg>
                  <select
                    id="destination"
                    className={styles.input}
                    value={selectedCityId || ''}
                    onChange={(e) => onCitySelect(e.target.value ? parseInt(e.target.value) : null)}
                  >
                    <option value="">Todos los destinos</option>
                    {cities?.map(city => (
                      <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              {renderLevelSection()}
              <div className={styles.divider} />
              {renderCategorySection()}
              {renderSubcategorySection() && <div className={styles.divider} />}
              {renderSubcategorySection()}
              <div className={styles.divider} />
              {renderSortSection()}
            </form>
            <div className={styles.filterFormBtnWrapper}>
              <button 
                className={styles.applyButton}
                onClick={handleApplyFilters}
              >
                Aplicar
              </button>
              <button 
                className={styles.clearButton}
                onClick={handleResetFilters}
              >
                Eliminar filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;