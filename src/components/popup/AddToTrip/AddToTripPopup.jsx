import React, { useState, useRef } from 'react';
import styles from './ItineraryDetail.module.css';
import { Search, AddCircle, CalendarIcon } from '../../common/Images';
import SearchInput from '../../common/SearchInput';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';

const AddToTripModal = ({closeModal, state, setState, cities, onSubmit, formErrors, setFormErrors }) => {
  const { t } = useTranslation('Places');
  const trips = ['Vacaciones verano 2024', 'Escapada', 'Viaje cumple mamá', 'Nuevo viaje'];
  const suggestions = [
    {
      name: 'Las Artes y las Ciencias',
      location: 'Valencia, España',
      description: 'Puntos de interés, patrimonio histórico',
      rating: 4.5,
      reviews: 234,
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/de90cfe54bee2e1894362963b216e6912785bed2'
    }
  ];

  const suggestionRef = useRef(null);
  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Initialize destinations array in state if it doesn't exist
  if (!state.destinations) {
    setState(prev => ({
      ...prev,
      destinations: [{
        destinationSearchQuery: '',
        destinationId: null
      }]
    }));
  }

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange(dates);
    updateState("startDate", start);
    updateState("endDate", end);
  };

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
    console.log(key, value, 'key, value');
    if(key === "destinationId" && value) {
      setShowSuggestionDropDown(false);
    }
  };

  const handleSearch = (value) => {
    updateState("destinationSearchQuery", value);
  };

  const handleSearchClose = (e) => {
    e.stopPropagation();
    updateState("destinationSearchQuery", "");
    updateState("destinationId", null);
    setShowSuggestionDropDown(false);
  };

  const addDestination = () => {
    setState(prev => ({
      ...prev,
      destinations: [
        ...prev.destinations,
        {
          destinationSearchQuery: '',
          destinationId: null
        }
      ]
    }));
    setActiveDestinationIndex(state.destinations.length);
  };

    // Handle adding a new destination
    const handleAddDestination = (value) => {
      if (!value) return;
      
      const currentDestinations = state.destinationId ? state.destinationId.split(',') : [];
      
      // Check if destination already exists
      if (!currentDestinations.includes(value)) {
        const newDestinations = [...currentDestinations, value].join(',');
        updateState("destinationId", newDestinations);
        updateState("destinationSearchQuery", ""); // Clear search input
      }
    };
  
    // Handle removing a destination
    const handleRemoveDestination = (idToRemove) => {
      const currentDestinations = state.destinationId ? state.destinationId.split(',') : [];
      const newDestinations = currentDestinations.filter(id => id !== idToRemove).join(',');
      updateState("destinationId", newDestinations);
    };

    const removeDestination = (index) => {
      if (state.destinations.length <= 1) return; // Don't remove the last destination
      
      setState(prev => {
        const newDestinations = [...prev.destinations];
        newDestinations.splice(index, 1);
        return {
          ...prev,
          destinations: newDestinations
        };
      });
      
      // Update active index if needed
      if (activeDestinationIndex >= index) {
        setActiveDestinationIndex(Math.max(0, activeDestinationIndex - 1));
      }
    };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Añadir a mis viajes</h2>
            <button onClick={closeModal} className={styles.closeButton} aria-label="Cerrar modal">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.5 8.5L8.5 25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8.5 8.5L25.5 25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <p className={styles.modalDescription}>
            Añade 'Plaka y Anafiotika' a cualquiera de tus viajes planeados
          </p>

          <div className={styles.tripList}>
            {trips.map((trip, index) => (
              <div key={index} className={styles.tripItem}>
                <div className={styles.tripName}>{trip}</div>
             
                <label className="radioContainer">
                  <input
                    type="radio"
                    id="terms"
                    name="terms"
                    value={trip}
                    checked={state.tripType === trip}
                    onChange={(e) => updateState("tripType", e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.formSection}>
            <p className={styles.formDescription}>
              Utiliza nuestro planificador de viajes para crear nuevos
              itinerarios, planifica tus paradas y comparte diferentes viajes.
            </p>
            <div className={styles.formContainer}>
              <form>
                <div className={styles.formGroup}>
                  <label htmlFor="tripName" className={styles.label}>Nombre del viaje</label>
                  <input type="text" id="tripName" placeholder="Text input" className={styles.input} value={state.tripName} onChange={(e) => updateState("tripName", e.target.value)}/>
                  <div className="errorMessage">Required</div>
                </div>

                {state.destinations?.map((destination, index) => (
                  <div key={index} className={styles.formGroup}>
                    <label htmlFor={`destination-${index}`} className={styles.label}>
                      {index === 0 ? 'Destino' : ""}
                    </label>
                    {index > 0 && (
                        <button 
                          type="button" 
                          className={styles.removeDestinationButton}
                          onClick={() => removeDestination(index)}
                          aria-label={`Eliminar destino ${index + 1}`}
                        >
                          {/* <img src={CloseIcon} alt="Eliminar" /> */}
                        </button>
                      )}
                    <div className={styles.itenarysearchContainer}>
                      <SearchInput
                        handleSearchClick={() => {
                          setActiveDestinationIndex(index);
                          setShowSuggestionDropDown(true);
                        }}
                        suggestionRef={suggestionRef}
                        handleSearch={handleSearch}
                        showSuggestionDropDown={showSuggestionDropDown && activeDestinationIndex === index}
                        handleSearchClose={handleSearchClose}
                        searchValue={destination.destinationSearchQuery}
                        suggestionsList={cities}
                        placeholder={t("search.placeholder")}
                        onSelect={(value) => handleAddDestination(value)}
                        customClassName="placesSearchInputContainer"
                        selectedValue={destination.destinationId}
                        customClassNameForSuggestions="suggestionsContainerSm"
                      />
                    </div>
                  </div>
                ))}

                <div className={styles.addDestination} onClick={addDestination}>
                  <img src={AddCircle} />
                  <span>Añade otro destino</span>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dates" className={styles.label}>Fechas</label>
                  <div className={styles.inputWithIcon}>
                    <img src={CalendarIcon} />
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
                  <div className="errorMessage">Required</div>
                </div>
              </form>
            </div>
          </div>

          <div className={styles.divider} />

          <button className={styles.confirmButton} onClick={onSubmit}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default AddToTripModal;