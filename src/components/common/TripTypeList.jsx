import { getTripsTypes } from "../../constants/TripTypeList";
const TripTypeList = ({styles, updateState, state, storedTripType}) => {
    return (
        <div className={styles.tripList}>
            {Object.entries(getTripsTypes).map(([key, displayName]) => (
                <div key={key} className={styles.tripItem}>
                    <div className={styles.tripName}>{displayName}</div>
                    <label className="radioContainer">
                        <input
                            type="radio"
                            id={`trip-type-${key}`}
                            name="tripType"
                            value={key}
                            checked={ state.tripType === key }
                            onChange={(e) => updateState("tripType", e.target.value)}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default TripTypeList;