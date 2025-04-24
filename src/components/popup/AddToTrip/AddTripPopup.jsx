import styles from "./ItineraryDetail.module.css";
import TripTypeList from '../../common/TripTypeList';
import { useTranslation } from 'react-i18next';

const AddTripPopup = ({ onClose, travelLiteList, state, setState, handleSubmitTrip }) => {
    
    const { t } = useTranslation("AddTrip");
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>{t('AddTrip.popups.addTrip.title')}</h2>
                        <button onClick={onClose} className={styles.closeButton} aria-label="Cerrar modal">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.5 8.5L8.5 25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M8.5 8.5L25.5 25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <p className={styles.modalDescription}>

                    {t('AddTrip.popups.addTrip.description', { placeName: state.selectedPlaceName })}
                    </p>

                    {/* <TripTypeList styles={styles} setState={setState} state={state} tripsData={travelLiteList} /> */}
                    <div className={styles.tripList}>
                        {/* Static "New Trip" option */}
                        <div className={styles.tripItem}>
                            <div className={styles.tripName}>{t('AddTrip.popups.addTrip.newTrip')}</div>
                          
                            <label className="radioContainer">
                                <input
                                    type="radio"
                                    id="trip-type-new"
                                    name="tripType"
                                    value="new"
                                    checked={state.selectedTripId === "new"}
                                    onChange={(e) => setState((prevState) => ({ ...prevState, selectedTripId: "new" }))}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        {/* Mapped trip list */}
                        {travelLiteList.map((trip, index) => (
                            <div key={index} className={styles.tripItem}>
                                <div className={styles.tripName}>{trip.title}</div>
                                <svg id={`194:716${8 + index}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* SVG content */}
                                </svg>
                                <label className="radioContainer">
                                    <input
                                        type="radio"
                                        id={`trip-type-${index}`}
                                        name="tripType"
                                        value={trip.id}
                                        checked={state.selectedTripId === trip.id}
                                        onChange={(e) => setState((prevState) => ({ ...prevState, selectedTripId: trip.id, existingTripName: trip.title }))}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className={styles.divider} />

                    <button className={styles.confirmButton} onClick={handleSubmitTrip}>{t('AddTrip.popups.addTrip.confirmButton')}</button>
                </div>
            </div>
        </div>
    );
}

export default AddTripPopup