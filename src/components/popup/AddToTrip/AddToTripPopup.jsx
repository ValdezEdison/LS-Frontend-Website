import React, { useState, useRef, useEffect } from 'react';
import styles from './ItineraryDetail.module.css';
import { Search, AddCircle, CalendarIcon, Delete } from '../../common/Images';
import SearchInput from '../../common/SearchInput';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import TripTypeList from '../../common/TripTypeList';
import { fetchCities } from '../../../features/common/cities/CityAction';
import { useDispatch, useSelector } from 'react-redux';
import PlaceCard from '../../common/PlaceCard';
// import { getTripsTypes } from '../../../constants/TripTypeList';
import { listUpdater, resetStops } from '../../../features/places/placesInfo/itinerary/ItinerarySlice';
import useSeeMore from '../../../hooks/useSeeMore';

const AddToTripPopup = ({ closeModal, state, setState, cities, onSubmit, formErrors, setFormErrors, activeDestinationIndex,
  setActiveDestinationIndex,
  citiesSearchResults,
  isSearchingCities,
  updateDestination,
  handleActions }) => {
  const { t } = useTranslation('Places');
  const { t: tAddTrip } = useTranslation('AddTrip');
  const suggestionRef = useRef(null);
  const placeRefs = useRef({});
  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);
  // const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [storedTripType, setStoredTripType] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { favTogglingId, isFavoriteToggling, stops, stopsLoading, itineraryDetails, stopsNext, addTripLoading } = useSelector((state) => state.itineriesInCity);
  const { data: visibleStops, loading, next: hasNext, loadMore } = useSeeMore(stops, stopsNext, listUpdater, 'stops');



  const dispatch = useDispatch();

  useEffect(() => {
    const tripType = localStorage.getItem('tripType');
    if (tripType) {
      setStoredTripType(JSON.parse(tripType).type);
    }

    // Initialize destinations array if it doesn't exist
    if (!state.destinations || state.destinations.length === 0) {
      setState(prev => ({
        ...prev,
        destinations: [{
          destinationSearchQuery: '',
          destinationId: null,
          destinationName: ''
        }]
      }));
    }

    return () => {
      dispatch(resetStops());
    };
  }, []);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange(dates);
    updateState("startDate", start);
    updateState("endDate", end);
  };

  const updateState = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  // const updateDestination = (index, field, value) => {
  //   
  //   setState(prev => {
  //     const newDestinations = [...prev.destinations];
  //     newDestinations[index] = {
  //       ...newDestinations[index],
  //       [field]: value
  //     };
  //     return { ...prev, destinations: newDestinations };
  //   });
  // };

  const handleSearch = (value, index) => {
    updateDestination(index, 'destinationSearchQuery', value);
  };

  const handleSearchClose = (e, index) => {
    e.stopPropagation();
    updateDestination(index, 'destinationSearchQuery', '');
    updateDestination(index, 'destinationId', null);
    updateDestination(index, 'destinationName', '');
    setShowSuggestionDropDown(false);
  };

  const addDestination = () => {
    setState(prev => ({
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

    setActiveDestinationIndex(state.destinations.length);
  };

  const handleSelectDestination = (destination, index) => {
    
    updateDestination(index, 'destinationId', destination);
    updateDestination(index, 'destinationName', cities.find(city => city.id === destination)?.name);
    // updateDestination(index, 'destinationSearchQuery', destination.name);
    setShowSuggestionDropDown(false);
  };

  const removeDestination = (index) => {
    if (state.destinations.length <= 1) return;

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

  const validateForm = () => {
    const errors = {};

    // Validate trip name
    if (!state.tripName || state.tripName.trim() === '') {
      errors.tripName = 'Trip name is required';
    }

    // Validate destinations
    const destinationErrors = [];
    state.destinations.forEach((dest, index) => {
      if (!dest.destinationId) {
        destinationErrors[index] = 'Destination is required';
      }
    });

    if (destinationErrors.length > 0) {
      errors.destinations = destinationErrors;
    }

    // Validate dates
    if (!startDate) {
      errors.startDate = 'Start date is required';
    }
    if (!endDate) {
      errors.endDate = 'End date is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
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

  // const handleActions = (e, action, id) => {
  //   e.stopPropagation();
  //   if (action === 'addToFavorites') {
  //     handleFavClick(e, id);
  //   } else if (action === 'addToStop') {
  //     setState(prev => ({
  //       ...prev,
  //       stops: [...prev.stops, id]
  //     }))
  //   }
  // }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}> {tAddTrip('AddTrip.popups.addToTrip.title')}</h2>
            <button onClick={closeModal} className={styles.closeButton} aria-label="Cerrar modal">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.5 8.5L8.5 25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8.5 8.5L25.5 25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <p className={styles.modalDescription}>

          {tAddTrip('AddTrip.popups.addToTrip.description', { placeName: state?.selectedPlaceName })}
          </p>

          <TripTypeList styles={styles} updateState={updateState} state={state} tripsData={[]} />

          <div className={styles.divider} />
          {state.tripType && (
            <>
              <div className={styles.formSection}>
                <p className={styles.formDescription}>
                {tAddTrip('AddTrip.popups.addToTrip.formDescription')}
                </p>
                <div className={styles.formContainer}>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                      <label htmlFor="tripName" className={styles.label}>{tAddTrip('AddTrip.popups.addToTrip.tripNameLabel')}</label>
                      <input
                        type="text"
                        id="tripName"
                        placeholder={tAddTrip('AddTrip.popups.addToTrip.tripNamePlaceholder')}
                        className={styles.input}
                        value={state.tripName}
                        onChange={(e) => updateState("tripName", e.target.value)}
                      />
                      {formErrors.tripName && (
                        <div className="errorMessage">{formErrors.tripName}</div>
                      )}
                    </div>

                    <div className={styles.destinationItem}>
                      {state.destinations?.map((destination, index) => (
                        <div key={index} className={styles.formGroup}>
                          <label htmlFor={`destination-${index}`} className={styles.label}>
                            {index === 0 ? 'Destino' : ""}
                          </label>
                          <div className={styles.addSearchItems}>
                            <div className={styles.itenarysearchContainer}>
                              <SearchInput
                                handleSearchClick={() => {
                                  setActiveDestinationIndex(index);
                                  setShowSuggestionDropDown(true);
                                  setState(prev => ({
                                    ...prev,
                                    destinations: prev.destinations.map(dest => ({
                                      ...dest,
                                      destinationSearchQuery: ''  // Only reset the search query
                                    }))
                                  }));
                                  dispatch(fetchCities({}));
                                }}
                                suggestionRef={suggestionRef}
                                handleSearch={(value) => handleSearch(value, index)}
                                showSuggestionDropDown={showSuggestionDropDown && activeDestinationIndex === index}
                                handleSearchClose={(e) => handleSearchClose(e, index)}
                                searchValue={destination.destinationSearchQuery}
                                suggestionsList={ cities }
                                placeholder={t("search.placeholder")}
                                onSelect={(value) => handleSelectDestination(value, index)}
                                customClassName="placesSearchInputContainer"
                                selectedValue={destination.destinationId}
                                customClassNameForSuggestions="suggestionsContainerSm"
                              />
                            </div>
                            {index > 0 && (
                              <button
                                type="button"
                                className={styles.removeDestinationButton}
                                onClick={() => removeDestination(index)}
                                aria-label={`Eliminar destino ${index + 1}`}
                              >
                                {/* <img src={Delete} alt="Eliminar" /> */}
                              </button>
                            )}
                          </div>

                          {formErrors[`destinations[${index}]`] && (
                            <div className="errorMessage">
                              {formErrors[`destinations[${index}]`]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>


                    <div className={styles.addDestination} onClick={addDestination}>
                      <img src={AddCircle} alt="Add" />
                      <span>{tAddTrip('AddTrip.popups.addToTrip.addDestination')}</span>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="dates" className={styles.label}> {tAddTrip('AddTrip.popups.addToTrip.datesLabel')}</label>
                      <div className={styles.inputWithIcon}>
                        <img src={CalendarIcon} alt="Calendar" />
                        <DatePicker
                          selectsRange={true}
                          startDate={startDate}
                          endDate={endDate}
                          onChange={handleDateChange}
                          placeholderText={tAddTrip('AddTrip.popups.addToTrip.datePlaceholder')}
                          className={styles.datePickerInput}
                          minDate={new Date()}
                          dateFormat="dd/MM/yyyy"
                          isClearable={true}
                        />
                      </div>
                      {formErrors.startDate && (
                        <div className="errorMessage">{formErrors.startDate}</div>
                      )}
                      {formErrors.endDate && !formErrors.startDate && (
                        <div className="errorMessage">{formErrors.endDate}</div>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.suggestionSection}>
                <div className={styles.suggestionTitleMain}>
                  <h3 className={styles.suggestionTitle}>{tAddTrip('AddTrip.popups.addToTrip.suggestionsTitle')}</h3>
                  { hasNext && <div className={styles.suggestionAdd} onClick={loadMore}></div> }
                </div>

                <div className={styles.suggestionList}>
                  {visibleStops.filter(item => !state.stops?.includes(item.id)).length > 0 ? (
                    visibleStops
                      .filter(item => !state.stops?.includes(item.id))
                      .map((item, index) => (
                        <PlaceCard
                          key={item.id || index}
                          place={item}
                          translate={t}
                          isAuthenticated={isAuthenticated}
                          isPopup={true}
                          handleActions={handleActions}
                          isFavoriteToggling={isFavoriteToggling && favTogglingId === item.id}
                          ref={(el) => {
                            if (el) {
                              placeRefs.current[item.id] = el;
                            }
                          }}
                        />
                      ))
                  ) : (
                    <p>{tAddTrip('AddTrip.popups.addToTrip.noSuggestions')}</p>
                  )}
                </div>
              </div>
            </>
          )}

          <button className={styles.confirmButton} onClick={onSubmit}>{tAddTrip('AddTrip.popups.addToTrip.confirmButton')}</button>
        </div>
      </div>
    </div>
  );
};

export default AddToTripPopup;