import React, { useEffect, useState, useRef } from "react";
import styles from "./ItineraryForm.module.css";
import DatePicker from 'react-datepicker';
import SearchInput from "../common/SearchInput";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTranslation } from "react-i18next";

const ItineraryForm = ({
  tripDetails,
  setFormState,
  formState,
  activeDestinationIndex,
  setActiveDestinationIndex,
  cities,
  debouncedSearch, // Add this prop if you need to fetch cities
  handleSubmit,
  loading,
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const suggestionRef = useRef(null);

  const { t } = useTranslation('MyTrips');

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

  useEffect(() => {
    if (tripDetails?.initial_date && tripDetails?.end_date) {
      const start = new Date(tripDetails.initial_date);
      const end = new Date(tripDetails.end_date);
      setDateRange([start, end]);
    }
  }, [tripDetails]);

  if (loading) {
    return (
      <>
        <form className={styles.itineraryForm}>
          <div className={styles.itineraryFormInputsWrapper}>
            {/* Trip Name Field Skeleton */}
            <div className={styles.formGroup}>
              <Skeleton width={100} height={20} style={{ marginBottom: '8px' }} />
              <Skeleton height={40} />
            </div>
  
            {/* Dates Field Skeleton */}
            <div className={`${styles.formGroup} ${styles.calendarFormGroup}`}>
              <Skeleton width={100} height={20} style={{ marginBottom: '8px' }} />
              <Skeleton height={40} />
            </div>
  
            {/* Destinations Label Skeleton */}
            <Skeleton width={100} height={20} style={{ marginBottom: '8px' }} />
  
            {/* Destination Inputs Skeleton */}
            <Skeleton height={50} count={2} style={{ marginBottom: '16px' }} />
          </div>
  
          {/* Form Actions Skeleton */}
          <div className={styles.formActions}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Skeleton width={80} height={36} />
              <Skeleton width={80} height={36} />
            </div>
          </div>
        </form>
  
        {/* Add Destination Button Skeleton */}
        <Skeleton 
          width={150} 
          height={36} 
          style={{ marginTop: '1rem' }}
        />
      </>
    );
  }

  return (
    <>
      <form className={styles.itineraryForm}>
        <div className={styles.itineraryFormInputsWrapper}>
          <div className={styles.formGroup}>
            <label htmlFor="tripName" className={styles.label}>
            {t('travelItineraryEdit.form.tripNameLabel')}
            </label>
            <input
              type="text"
              id="tripName"
              className={styles.input}
              value={formState.tripName}
              onChange={handleTripNameChange}
              placeholder={t('travelItineraryEdit.form.tripNamePlaceholder')}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.calendarFormGroup}`}>
            <label htmlFor="tripDates" className={styles.label}>
            {t('travelItineraryEdit.form.datesLabel')}
            </label>
            <div className={styles.dateInput}>
              <span className={styles.calendarIcon} />
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                placeholderText={t('travelItineraryEdit.form.datesPlaceholder')}
                className={styles.datePickerInput}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                isClearable={true}
              />
            </div>
          </div>
          <label htmlFor={`destination`} className={styles.label}>
          {t('travelItineraryEdit.form.destinationLabel')}
              </label>
          {formState.destinations.map((destination, index) => (
            <div className={styles.formGroup} key={index}>
       
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
                  placeholder={t('travelItineraryEdit.form.destinationPlaceholder')}
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
                   {/* {t('buttons.remove')} */}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton}>
          {t('travelItineraryEdit.buttons.cancel')}
          </button>
          <button type="submit" className={styles.saveButton} onClick={handleSubmit}>
          {t('travelItineraryEdit.buttons.save')}
          </button>
        </div>
      </form>

      <button
        type="button"
        className={styles.addDestinationButton}
        onClick={handleAddDestination}
      >
        {t('travelItineraryEdit.buttons.addDestination')}
      </button>
    </>
  );
};

export default ItineraryForm;