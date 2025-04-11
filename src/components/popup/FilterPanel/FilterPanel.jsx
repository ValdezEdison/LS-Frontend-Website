import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterPanel.module.css";
import SearchInput from "../../common/SearchInput";
import { CalendarIcon } from "../../common/Images";
import DatePicker from 'react-datepicker';

const FilterPanel = ({ onClose, categories, cities, state , setState }) => {
  const [selectedTags, setSelectedTags] = useState([]);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);
  const suggestionRef = useRef(null);


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

    // Check if the click is outside both the SearchInput and the dropdown
    if (
      suggestionRef.current &&
      !suggestionRef.current.contains(event.target)

    ) {
      setShowSuggestionDropDown(false); // Close the dropdown
    }
  };

  useEffect(() => {
    // Add event listener when the dropdown is shown
    if (showSuggestionDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestionDropDown]);

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
    if (key === "selectedDestinationId" && value) {
      setState((prev) => ({ ...prev, "destinationSearchQuery": "" }));
    }

    setShowSuggestionDropDown(false);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange(dates);
    updateState("startDate", start);
    updateState("endDate", end);
  };

  const renderTagSection = (title, tags, showLess = false) => (
    <div className={styles.categorySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <button className={styles.toggleLink}>
          {showLess ? "Ver menos" : "Ver más"}
        </button>
      </div>
      <div className={`${styles.tagContainer} ${styles.tagMore}`}>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagSelected : ""}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
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
              aria-label="Cerrar panel de filtros" onClick={onClose}
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
                 <div className={styles.inputWithIcon}>
                        <img src={CalendarIcon} alt="Calendar" />
                        <DatePicker
                          selectsRange={true}
                          startDate={startDate}
                          endDate={endDate}
                          onChange={handleDateChange}
                          placeholderText="Fecha inicio - fecha fin"
                          className={styles.datePickerInput}
                          minDate={new Date()}
                          dateFormat="dd/MM/yyyy"
                          isClearable={true}
                        />
                      </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="destination" className={styles.label}>
                  Destino
                </label>
                <SearchInput
                  handleSearchClick={() => setShowSuggestionDropDown(true)}
                  suggestionRef={suggestionRef}
                  handleSearch={handleSearch}
                  showSuggestionDropDown={showSuggestionDropDown}
                  handleSearchClose={handleSearchClose}
                  searchValue={state.destinationSearchQuery}
                  suggestionsList={cities}
                  placeholder="Busca un destino"
                  onSelect={(value) => updateState("selectedDestinationId", value)}
                  customClassName="placesSearchInputContainer"
                  selectedValue={state.selectedDestinationId}
                  customClassNameForSuggestions="suggestionsContainerSm"
                />
              </div>
              {renderTagSection(
                "Búsqueda",
                [
                  "Arte y cultura",
                  "Compras",
                  "Gastronomía",
                  "Ocio y deporte",
                  "Planificador de viajes y excursiones",
                  "Servicios profesionales",
                  "Vida nocturna",
                ],
                true,
              )}
              <div className={styles.divider} />
              {renderTagSection(
                "Categoría",
                [
                  "Conciertos",
                  "Espectáculos",
                  "Exposiciones",
                  "Festivales",
                  "Obras de teatro",
                ],
                true,
              )}
              <div className={styles.divider} />
              <div className={styles.categorySection}>
                <h2 className={styles.sectionTitle}>Ordenar por</h2>
                <div className={styles.tagContainer}>
                  <button className={`${styles.tag} ${styles.tagSelected}`}>
                    Más recientes
                  </button>
                  <button className={styles.tag}>Más valorados</button>
                  <button className={styles.tag}>Nuestra recomendación</button>
                </div>
              </div>
            </form>
            <div className={styles.filterFormBtnWrapper}>
              <button className={styles.applyButton}>Aplicar</button>
              <button className={styles.clearButton}>Eliminar filtros</button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
