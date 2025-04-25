import { useTripsTypes } from "../../constants/TripTypeList";
const TripTypeList = ({styles, updateState, state, storedTripType}) => {
    const tripsTypes = useTripsTypes();
    console.log(useTripsTypes, 'getTripsTypes')
    
    return (
        <div className={styles.tripList}>
            {Object.entries(tripsTypes).map(([key, displayName]) => (
                <>
                {/* {console.log(displayName, 'displayName')} */}
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
                </>
            ))}
        </div>
    );
};

export default TripTypeList;