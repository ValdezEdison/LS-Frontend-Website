import React from "react";
import styles from "./ItineraryForm.module.css";

const ItineraryForm = () => {
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
            value="Viaje cumple mamá"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="tripDates" className={styles.label}>
            Fechas
          </label>
          <div className={styles.dateInput}>
            <span className={styles.calendarIcon} />
            <input
              type="text"
              id="tripDates"
              className={styles.input}
              value="24/01/2025 - 30/01/2025"
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="destination" className={styles.label}>
            Destino
          </label>
          <div className={styles.destinationInput}>
            <div className={styles.destinationFormInput}>
              <span className={styles.searchIcon} />
              <input
                type="text"
                id="destination"
                className={styles.input}
                value="París"
              />
            </div>
            
            <button type="button" className={styles.deleteButton}>
              Eliminar
            </button>
          </div>
        </div>
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
     <button type="button" className={styles.addDestinationButton}>
     Añadir destino
   </button>
   </>
  );
};

export default ItineraryForm;
