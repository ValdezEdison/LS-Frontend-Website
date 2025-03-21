import React from "react";
import styles from "../../components/PlacesPage/MainContent.module.css";
import styles2 from "./SelectedItemList.module.css";

const SelectedItemList = ({ state, setState, categories, countries, cities, translate, type }) => {
    const {
        selectedLevel,
        selectedCategory,
        selectedSubcategory,
        selectedCountryId,
        selectedDestinations,
        selectedOrder,
        selectedDateRange,
    } = state;

    // Convert selectedDestinations string to an array of IDs
    const destinationIds = selectedDestinations ? selectedDestinations.split(',').map(Number) : [];

    // Function to remove the selected level
    const removeLevel = () => {
        setState((prevState) => ({
            ...prevState,
            selectedLevel: null,
            selectedCategory: null,
            selectedSubcategory: null,
        }));
    };

    // Function to remove the selected category
    const removeCategory = () => {
        setState((prevState) => ({
            ...prevState,
            selectedCategory: null,
            selectedSubcategory: null,
        }));
    };

    // Function to remove the selected subcategory
    const removeSubcategory = () => {
        setState((prevState) => ({
            ...prevState,
            selectedSubcategory: null,
        }));
    };

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

    // Function to remove the selected date range
    const removeDateRange = () => {
        setState((prevState) => ({
            ...prevState,
            selectedDateRange: { startDate: null, endDate: null },
        }));
    };

    // Function to clear all filters
    const handleClickClearFilter = () => {
        if (type === "submenu-places") {
            setState((prevState) => ({
                ...prevState,
                selectedLevel: null,
                selectedCategory: null,
                selectedSubcategory: null,
                page: 1,
            }));
        } else if (type === "places") {
            setState((prevState) => ({
                ...prevState,
                selectedCountryId: null,
                selectedDestinations: "",
                selectedOrder: "",
                searchQuery: "",
                destinationSearchQuery: "",
                selectedCountryName: "",
                page: 1,
            }));
        } else if (type === "submenu-events") {
            setState((prevState) => ({
                ...prevState,
                selectedLevel: null,
                selectedDateRange: { startDate: null, endDate: null },
                page: 1,
            }));
        }
    };

    // Get the selected level, category, and subcategory names
    const selectedLevelName = selectedLevel
        ? categories?.find((cat) => cat.id === selectedLevel)?.title
        : null;

    const selectedCategoryName = selectedCategory
        ? categories
            ?.find((cat) => cat.id === selectedLevel)
            ?.categories?.find((c) => c.id === selectedCategory)?.title
        : null;

    const selectedSubcategoryName = selectedSubcategory
        ? categories
            ?.find((cat) => cat.id === selectedLevel)
            ?.categories?.find((c) => c.id === selectedCategory)
            ?.subcategories?.find((sub) => sub.id === selectedSubcategory)?.title
        : null;

    // Get the country name from the selectedCountryId
    const selectedCountry = countries?.find((country) => country.id === selectedCountryId);

    // Get the destination names from the destinationIds
    const selectedDestinationNames = destinationIds.map((id) => {
        const city = cities?.find((city) => city.id === id);
        return city ? city.name : null;
    }).filter((name) => name !== null);

    // If no filters are selected, return null
    if (type === "submenu-places" && !selectedLevel && !selectedCategory && !selectedSubcategory) {
        return null;
    }

    if (type === "places" && !selectedCountryId && destinationIds.length === 0 && !selectedOrder) {
        return null;
    }

    if (type === "submenu-events" && !selectedLevel && !selectedDateRange.startDate && !selectedDateRange.endDate) {
        return null;
    }

    return (
        <>
            <div className={styles.placesSelectedItemsListLeft}>
                {/* Render selected level */}
                {(type === "submenu-places" || type === "submenu-events") && selectedLevel && (
                    <div className={styles.placesSelectedItem}>
                        <span className={styles.placesSelectedText}>{selectedLevelName}</span>
                        <div
                            className={styles.placesSelectedClose}
                            onClick={removeLevel}
                        >
                            
                        </div>
                    </div>
                )}

                {/* Render selected category */}
                {type === "submenu-places" && selectedCategory && (
                    <div className={styles.placesSelectedItem}>
                        <span className={styles.placesSelectedText}>{selectedCategoryName}</span>
                        <div
                            className={styles.placesSelectedClose}
                            onClick={removeCategory}
                        >
                            
                        </div>
                    </div>
                )}

                {/* Render selected subcategory */}
                {type === "submenu-places" && selectedSubcategory && (
                    <div className={styles.placesSelectedItem}>
                        <span className={styles.placesSelectedText}>{selectedSubcategoryName}</span>
                        <div
                            className={styles.placesSelectedClose}
                            onClick={removeSubcategory}
                        >
                            
                        </div>
                    </div>
                )}

                {/* Render selected country */}
                {type === "places" && selectedCountryId && (
                    <div className={styles.placesSelectedItem}>
                        <span className={styles.placesSelectedText}>{selectedCountry?.name}</span>
                        <div
                            className={styles.placesSelectedClose}
                            onClick={removeCountry}
                        >
                            
                        </div>
                    </div>
                )}

                {/* Render selected destinations */}
                {type === "places" && selectedDestinationNames.map((name, index) => (
                    <div key={index} className={styles.placesSelectedItem}>
                        <span className={styles.placesSelectedText}>{name}</span>
                        <div
                            className={styles.placesSelectedClose}
                            onClick={() => removeDestination(index)}
                        >
                            
                        </div>
                    </div>
                ))}

                {/* Render selected order */}
                {type === "places" && selectedOrder && (
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

                {/* Render selected date range */}
                {type === "submenu-events" && selectedDateRange.startDate && selectedDateRange.endDate && (
                    <div className={styles.placesSelectedItem}>
                        <span className={styles2.calendarIcon}></span>
                        <span className={styles.placesSelectedText}>
                            {`${selectedDateRange.startDate.toLocaleDateString()} - ${selectedDateRange.endDate.toLocaleDateString()}`}
                        </span>
                        <div
                            className={styles.placesSelectedClose}
                            onClick={removeDateRange}
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

export default SelectedItemList;