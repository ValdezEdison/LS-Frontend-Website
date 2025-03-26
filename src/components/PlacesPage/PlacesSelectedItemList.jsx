const PlacesSelectedItemList = ({ state, setState, countries, cities, styles, translate }) => {
    const { selectedCountryId, selectedDestinations, selectedOrder } = state;

    // Convert selectedDestinations string to an array of IDs
    const destinationIds = selectedDestinations ? selectedDestinations.split(',').map(Number) : [];

    // Function to remove a destination by index
    const removeDestination = (index) => {
        const updatedDestinations = destinationIds.filter((_, i) => i !== index).join(',');
        setState((prevState) => ({
            ...prevState,
            selectedDestinations: updatedDestinations,
        }));
    };

    // Function to remove the selected country
    const removeCountry = () => {
        setState((prevState) => ({
            ...prevState,
            selectedCountryId: null,
            selectedCountryName: '',
        }));
    };

    // Function to remove the selected order
    const removeOrder = () => {
        setState((prevState) => ({
            ...prevState,
            selectedOrder: null,
        }));
    };

    const handleClickClearFilter = () => {
        setState((prevState) => ({
            ...prevState,
            selectedCountryId: null,
            selectedDestinationId: null,
            selectedDestinations: "",
            selectedOrder: "",
            searchQuery: "",
            destinationSearchQuery: "",
            selectedCountryName: "",
            page: 1,
        }));
    };

    // Get the country name from the selectedCountryId
    const selectedCountry = countries.find(country => country.id === selectedCountryId);

    // Get the destination names from the destinationIds
    const selectedDestinationNames = destinationIds.map(id => {
        const city = cities.find(city => city.id === id);
        return city ? city.name : null;
    }).filter(name => name !== null);
    
    // If no country, destinations, or order is selected, return null
    if (!selectedCountryId && destinationIds.length === 0 && !selectedOrder) return null;

    return (
        <>
        <div className={styles.placesSelectedItemsListLeft}>
            {selectedCountryId && (
                <div className={styles.placesSelectedItem}>
                    <span className={styles.placesSelectedText}>{selectedCountry?.name}</span>
                    <div 
                        className={styles.placesSelectedClose}
                        onClick={removeCountry}
                    >
                    </div>
                </div>
            )}
            {selectedDestinationNames.map((name, index) => (
                <div key={index} className={styles.placesSelectedItem}>
                    <span className={styles.placesSelectedText}>{name}</span>
                    <div 
                        className={styles.placesSelectedClose}
                        onClick={() => removeDestination(index)}
                    >
                    </div>
                </div>
            ))}
            {selectedOrder && (
                <div className={styles.placesSelectedItem}>
                    <span className={styles.placesSelectedText}>
                    {translate(`filter.orderOptions.${selectedOrder}`)}
                    </span>
                    <div 
                        className={styles.placesSelectedClose}
                        onClick={removeOrder}
                    >
                    </div>
                </div>
            )}
        </div>

        <div className={styles.placesClearFilter} onClick={handleClickClearFilter}>
        Eliminar filtros
        </div>
        </>
    );
};

export default PlacesSelectedItemList;