import React from 'react';
import styles from './ItineraryDetail.module.css';
import { Search,AddCircle,CalendarIcon } from '../../common/Images';

const AddToTripModal = ({ closeModal }) => {
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

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Añadir a mis viajes</h2>
            <button onClick={closeModal} className={styles.closeButton} aria-label="Cerrar modal">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.5 8.5L8.5 25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8.5 8.5L25.5 25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
                {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg> */}
                <label className="radioContainer">
                  <input
                    type="radio"
                    id="terms"
                    name="terms"
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
                <input type="text" id="tripName" placeholder="Text input" className={styles.input} />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="destination" className={styles.label}>Destino</label>
                <div className={styles.inputWithIcon}>
                  {/* <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 14L11.1 11.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg> */}
                  <img src={ Search }/>
                  <input type="text" id="destination" placeholder="Busca tu destino" className={styles.input} />
                </div>
                <div className={styles.addDestination}>
                  {/* <svg className={styles.plusIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3.33333V12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3.33333 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg> */}
                  <img src={AddCircle}/>
                  <span>Añade otro destino</span>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="dates" className={styles.label}>Fechas</label>
                <div className={styles.inputWithIcon}>
                <img src={CalendarIcon}/>
                  {/* <svg className={styles.calendarIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 6.66667H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.33333 1.33333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.6667 1.33333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> */}
                  <input type="text" id="dates" placeholder="Fecha inicio - fecha fin" className={styles.input} />
                </div>
              </div>
            </form>
            </div>
           
          </div>
          
          <div className={styles.divider} />
          
          <div className={styles.suggestionSection}>
            <h3 className={styles.suggestionTitle}>Sugerencias para empezar</h3>
            <div className={styles.suggestionList}>
              {suggestions.map((suggestion, index) => (
                <div key={index} className={styles.suggestionItem}>
                  <img src={suggestion.image} alt={suggestion.name} className={styles.suggestionImage} />
                  <div className={styles.suggestionInfo}>
                    <h4 className={styles.suggestionName}>{suggestion.name}</h4>
                    <p className={styles.suggestionLocation}>{suggestion.location}</p>
                    <p className={styles.suggestionDescription}>{suggestion.description}</p>
                    <div className={styles.ratingContainer}>
                      <div className={styles.ratingScore}>{suggestion.rating}</div>
                      <div className={styles.ratingText}>
                        <span>Excelente</span>
                        <span>{suggestion.reviews} comentarios</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className={styles.confirmButton}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default AddToTripModal;