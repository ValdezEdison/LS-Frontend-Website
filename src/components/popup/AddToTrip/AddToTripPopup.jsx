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
   const [dateRange, setDateRange] = useState([null, null]);
   const [startDate, endDate] = dateRange;

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
    // setShowSuggestionDropDown(false);
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
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="destination" className={styles.label}>Destino</label>
                  <div className={styles.itenarysearchContainer}>
                    <SearchInput
                      handleSearchClick={() => setShowSuggestionDropDown(true)}
                      suggestionRef={suggestionRef}
                      handleSearch={handleSearch}
                      showSuggestionDropDown={showSuggestionDropDown}
                      handleSearchClose={handleSearchClose}
                      searchValue={state.destinationSearchQuery}
                      suggestionsList={cities}
                      placeholder={t("search.placeholder")}
                      onSelect={(value) => updateState("destinationId", value)}
                      customClassName="placesSearchInputContainer"
                      selectedValue={state.destinationId}
                    />
                  </div>
                  
                  <div className={styles.addDestination}>
                 
                    <img src={AddCircle} />
                    <span>Añade otro destino</span>
                  </div>
                  <div className={styles.searchItemsList}>
                    <div className={styles.searchItem}>
                      <span>France</span>
                      <div className={styles.searchItemClose}></div>
                    </div>
                    <div className={styles.searchItem}>
                      <span>test</span>
                      <div className={styles.searchItemClose}></div>
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dates" className={styles.label}>Fechas</label>
                  <div className={styles.inputWithIcon}>
                    <img src={CalendarIcon} />
                   
                    {/* <input type="text" id="dates" placeholder="Fecha inicio - fecha fin" className={styles.input} /> */}
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