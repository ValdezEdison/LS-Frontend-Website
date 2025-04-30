import React, { useEffect, useState, useRef } from "react";
import styles from "./ItineraryForm.module.css";
import DatePicker from 'react-datepicker';
import SearchInput from "../common/SearchInput";

const ItineraryForm = ({
  tripDetails,
  setFormState,
  formState,
  activeDestinationIndex,
  setActiveDestinationIndex,
  cities,
  debouncedSearch // Add this prop if you need to fetch cities
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const suggestionRef = useRef(null);

  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);

  const handleTripNameChange = (e) => {
    setFormState(prev => ({
      ...prev,
      tripName: e.target.value
    }));
  };

  const handleDestinationChange = (index, value) => {
    setFormState(prev => {
      const newDestinations = [...prev.destinations];
      newDestinations[index] = {
        ...newDestinations[index],
        destinationSearchQuery: value
      };
      return { ...prev, destinations: newDestinations };
    });
  };

  const handleAddDestination = () => {
    setFormState(prev => ({
      ...prev,
      destinations: [
        ...prev.destinations,
        {
          destinationSearchQuery: '',
          destinationId: null,
          destinationName: ''
        }
      ]
    }));
  };

  const handleRemoveDestination = (index) => {
    setFormState(prev => {
      const newDestinations = [...prev.destinations];
      newDestinations.splice(index, 1);
      return { ...prev, destinations: newDestinations };
    });
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange(dates);
    updateState("startDate", start);
    updateState("endDate", end);
  };

  const updateState = (key, value) => {
    setFormState(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (value, index) => {
    updateDestination(index, 'destinationSearchQuery', value);
    // If you need to fetch cities based on search query
    debouncedSearch(value);

  };

  const handleSearchClose = (e, index) => {
    e.stopPropagation();
    updateDestination(index, 'destinationSearchQuery', '');
    updateDestination(index, 'destinationId', null);
    updateDestination(index, 'destinationName', '');
  };

  const handleSelectDestination = (destination, index) => {
    updateDestination(index, 'destinationId', destination);
    updateDestination(index, 'destinationName', cities.find(city => city.id === destination)?.name || '');
    updateDestination(index, 'destinationSearchQuery', cities.find(city => city.id === destination)?.name || '');
    setShowSuggestionDropDown(false);
  };

  const updateDestination = (index, field, value) => {
    setFormState(prev => {
      const newDestinations = [...prev.destinations];
      newDestinations[index] = {
        ...newDestinations[index],
        [field]: value
      };
      return { ...prev, destinations: newDestinations };
    });
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

  return (
    <>
      <form className={styles.itineraryForm}>
        <div className={styles.itineraryFormInputsWrapper}>
          <div className={styles.formGroup}>
            <label htmlFor="tripName" className={styles.label}>
              Nombre del viaje
            </label>
            <input
              type="text"
              id="tripName"
              className={styles.input}
              value={formState.tripName}
              onChange={handleTripNameChange}
              placeholder="Nombre del viaje"
            />
          </div>

          <div className={`${styles.formGroup} ${styles.calendarFormGroup}`}>
            <label htmlFor="tripDates" className={styles.label}>
              Fechas
            </label>
            <div className={styles.dateInput}>
              <span className={styles.calendarIcon} />
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                placeholderText={''}
                className={styles.datePickerInput}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                isClearable={true}
              />
            </div>
          </div>

          {formState.destinations.map((destination, index) => (
            <div className={styles.formGroup} key={index}>
              <label htmlFor={`destination-${index}`} className={styles.label}>
                {index === 0 ? 'Destino' : `Destino adicional ${index + 1}`}
              </label>
              <div className={styles.destinationInput}>
                <SearchInput
                  handleSearchClick={() => {
                    setActiveDestinationIndex(index);
                    setShowSuggestionDropDown(true);
                  
                  }}
                  suggestionRef={suggestionRef}
                  handleSearch={(value) => handleSearch(value, index)}
                  showSuggestionDropDown={showSuggestionDropDown && activeDestinationIndex === index}
                  handleSearchClose={(e) => handleSearchClose(e, index)}
                  searchValue={destination.destinationSearchQuery}
                  suggestionsList={ cities }
                  placeholder={''}
                  onSelect={(value) => handleSelectDestination(value, index)}
                  customClassName="destplacesSearchInputContainer"
                  selectedValue={destination.destinationId}
                  customClassNameForSuggestions="suggestionsContainerSm"
                />
                {formState.destinations.length > 1 && (
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleRemoveDestination(index)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveButton}>
            Guardar
          </button>
        </div>
      </form>

      <button
        type="button"
        className={styles.addDestinationButton}
        onClick={handleAddDestination}
      >
        Añadir destino
      </button>
    </>
  );
};

export default ItineraryForm;