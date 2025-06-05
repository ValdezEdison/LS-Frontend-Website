import React from "react";
import styles from "../../components/PlacesPage/MainContent.module.css";
import styles2 from "./SelectedItemList.module.css";
import { useTranslation } from "react-i18next";

const SelectedItemList = ({ state, setState, categories, countries, cities, translate, type }) => {
    const { t } = useTranslation("Common");
    const {
        selectedLevel,
        selectedCategory,
        selectedSubcategory,
        selectedCountryId,
        selectedDestinations,
        selectedOrder,
        selectedDateRange,
        levels,
        categories: placesCategories,
        subcategories,
    } = state;

    // Helper function to safely parse comma-separated string to array of numbers
    const parseIds = (str) => {
        if (!str) return [];
        return str.split(',').map(id => {
            const num = parseInt(id.trim(), 10);
            return isNaN(num) ? null : num;
        }).filter(id => id !== null);
    };

    // Convert all IDs to arrays
    const levelIds = type === "places" ? parseIds(levels) : (selectedLevel ? [selectedLevel] : []);
    const categoryIds = type === "places" ? parseIds(placesCategories) : (selectedCategory ? [selectedCategory] : []);
    const subcategoryIds = type === "places" ? parseIds(subcategories) : (selectedSubcategory ? [selectedSubcategory] : []);
    const destinationIds = selectedDestinations ? parseIds(selectedDestinations) : [];

    // Function to remove a specific level
    const removeLevel = (levelToRemove) => {
        if (type === "places") {
            const updatedLevels = levelIds.filter(id => id !== levelToRemove).join(',');
            setState(prev => ({
                ...prev,
                levels: updatedLevels,
                // Clear dependent filters when removing a level
                // categories: levelIds.length === 1 ? "" : prev.categories,
                // subcategories: levelIds.length === 1 ? "" : prev.subcategories
            }));
        } else {
            setState(prev => ({
                ...prev,
                selectedLevel: null,
                selectedCategory: null,
                selectedSubcategory: null,
            }));
        }
    };

    // Function to remove a specific category
    const removeCategory = (categoryToRemove) => {
        if (type === "places") {
            const updatedCategories = categoryIds.filter(id => id !== categoryToRemove).join(',');
            setState(prev => ({
                ...prev,
                categories: updatedCategories,
                // Clear dependent subcategories when removing a category
                // subcategories: categoryIds.length === 1 ? "" : prev.subcategories
            }));
        } else {
            setState(prev => ({
                ...prev,
                selectedCategory: null,
                selectedSubcategory: null,
            }));
        }
    };

    // Function to remove a specific subcategory
    const removeSubcategory = (subcategoryToRemove) => {
        if (type === "places") {
            const updatedSubcategories = subcategoryIds.filter(id => id !== subcategoryToRemove).join(',');
            setState(prev => ({
                ...prev,
                subcategories: updatedSubcategories
            }));
        } else {
            setState(prev => ({
                ...prev,
                selectedSubcategory: null,
            }));
        }
    };

    // Function to remove a destination by index
    const removeDestination = (index) => {
        const updatedDestinations = destinationIds.filter((_, i) => i !== index).join(',');
        setState(prev => ({
            ...prev,
            selectedDestinations: updatedDestinations,
        }));
    };

    // Function to remove the selected country
    const removeCountry = () => {
        setState(prev => ({
            ...prev,
            selectedCountryId: null,
            selectedCountryName: '',
        }));
    };

    // Function to remove the selected order
    const removeOrder = () => {
        setState(prev => ({
            ...prev,
            selectedOrder: "",
        }));
    };

    // Function to remove the selected date range
    const removeDateRange = () => {
        setState(prev => ({
            ...prev,
            selectedDateRange: { startDate: null, endDate: null },
        }));
    };

    // Function to clear all filters
    const handleClickClearFilter = () => {
        if (type === "submenu-places") {
            setState(prev => ({
                ...prev,
                selectedLevel: null,
                selectedCategory: null,
                selectedSubcategory: null,
                page: 1,
            }));
        } else if (type === "places") {
            setState(prev => ({
                ...prev,
                selectedCountryId: null,
                selectedDestinations: "",
                selectedOrder: "",
                searchQuery: "",
                destinationSearchQuery: "",
                selectedCountryName: "",
                levels: "",
                categories: "",
                subcategories: "",
                page: 1,
            }));
        } else if (type === "submenu-events") {
            setState(prev => ({
                ...prev,
                selectedLevel: null,
                selectedDateRange: { startDate: null, endDate: null },
                page: 1,
            }));
        } else if (type === "submenu-itineraries") {
            setState(prev => ({
                ...prev,
                selectedOrder: "",
            }))
        }
    };

    // Get names for all selected items
    const getLevelName = (id) => categories?.find(cat => cat.id === id)?.title;
    const getCategoryName = (levelId, categoryId) => {
        if (type === "places") {
          return categories?.flatMap(cat => cat.categories)?.find(c => c.id === categoryId)?.title;
        }
      
        return categories?.find(cat => cat.id === levelId)
          ?.categories?.find(c => c.id === categoryId)?.title;
    };
    const getSubcategoryName = (levelId, categoryId, subcategoryId) => {
        if (type === "places") {
          return categories
            ?.flatMap(cat => cat.categories)
            ?.flatMap(c => c.subcategories || [])
            ?.find(sub => sub.id === subcategoryId)?.title;
        }
      
        return categories?.find(cat => cat.id === levelId)
          ?.categories?.find(c => c.id === categoryId)
          ?.subcategories?.find(sub => sub.id === subcategoryId)?.title;
    };
      

    // Get the country name
    const selectedCountry = countries?.find(country => country.id === selectedCountryId);

    // Get destination names
    const selectedDestinationNames = destinationIds.map(id => {
        const city = cities?.find(city => city.id === id);
        return city ? city.name : null;
    }).filter(name => name !== null);

    // Check if any filters are selected
    const hasSubmenuFilters = type === "submenu-places" && 
        (levelIds.length > 0 || categoryIds.length > 0 || subcategoryIds.length > 0);
    const hasPlacesFilters = type === "places" && 
        (selectedCountryId || destinationIds.length > 0 || selectedOrder || levelIds.length > 0);
    const hasEventFilters = type === "submenu-events" && 
        (levelIds.length > 0 || selectedDateRange.startDate);
    const hasItineraryFilters = type === "submenu-itineraries" && selectedOrder

    if (!hasSubmenuFilters && !hasPlacesFilters && !hasEventFilters && !hasItineraryFilters) {
        return null;
    }

    return (
        <>
            <div className={styles.placesSelectedItemsListLeft}>
                {/* Render selected levels */}
                {(type === "submenu-places" || type === "submenu-events" || type === "places") && 
                    levelIds.map(levelId => (
                        <div key={levelId} className={styles.placesSelectedItem}>
                            <span className={styles.placesSelectedText}>{getLevelName(levelId)}</span>
                            <div
                                className={styles.placesSelectedClose}
                                onClick={() => removeLevel(levelId)}
                            >
                            </div>
                        </div>
                    ))}

                {/* Render selected categories */}
                {(type === "submenu-places" || type === "places") && 
                    categoryIds.map(categoryId => {
                        // For places type, we might not have level context, so find first matching level
                        const levelIdForCategory = type === "places" 
                            ? levelIds.find(lid => 
                                categories?.find(cat => cat.id === lid)
                                    ?.categories?.some(c => c.id === categoryId)) || levelIds[0]
                            : levelIds[0];
                        
                        return (
                            <div key={categoryId} className={styles.placesSelectedItem}>
                                <span className={styles.placesSelectedText}>
                                    {getCategoryName(levelIdForCategory, categoryId)}
                                </span>
                                <div
                                    className={styles.placesSelectedClose}
                                    onClick={() => removeCategory(categoryId)}
                                >
                                </div>
                            </div>
                        );
                    })}

                {/* Render selected subcategories */}
                {(type === "submenu-places" || type === "places") && 
                    subcategoryIds.map(subcategoryId => {
                        // For places type, find matching level and category
                        let levelIdForSubcat = levelIds[0];
                        let categoryIdForSubcat = categoryIds[0];
                        
                        if (type === "places") {
                            for (const lid of levelIds) {
                                const level = categories?.find(cat => cat.id === lid);
                                for (const cid of categoryIds) {
                                    const category = level?.categories?.find(c => c.id === cid);
                                    if (category?.subcategories?.some(s => s.id === subcategoryId)) {
                                        levelIdForSubcat = lid;
                                        categoryIdForSubcat = cid;
                                        break;
                                    }
                                }
                            }
                        }
                        
                        return (
                            <div key={subcategoryId} className={styles.placesSelectedItem}>
                                <span className={styles.placesSelectedText}>
                                    {getSubcategoryName(levelIdForSubcat, categoryIdForSubcat, subcategoryId)}
                                </span>
                                <div
                                    className={styles.placesSelectedClose}
                                    onClick={() => removeSubcategory(subcategoryId)}
                                >
                                </div>
                            </div>
                        );
                    })}

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
                {type === "places" || type === "submenu-itineraries" && selectedOrder && (
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
            {t("removeFilters")}
            </div>
        </>
    );
};

export default SelectedItemList;