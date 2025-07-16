import React, { useState, useRef, useEffect } from "react";
import styles from "./SearchBar.module.css";
import SearchInput from "../common/SearchInput";
import { useTranslation } from 'react-i18next';

const SearchBar = ({state , setState, cities, count}) => {

  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);
  const suggestionRef = useRef(null);

  const { t } = useTranslation("ItineraryPage");

  const handleSearch = (value) => {
    updateState("destinationSearchQuery", value);

  };

  const handleSearchClose = (e) => {
    e.stopPropagation();
    updateState("destinationSearchQuery", "");
    updateState("selectedDestinationId", null);
    setShowSuggestionDropDown(false);
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

    const updateState = (key, value) => {
      setState((prev) => ({ ...prev, [key]: value }));
      if (key === "selectedDestinationId" && value) {
        setState((prev) => ({ ...prev, "destinationSearchQuery" : ""}));
        setShowSuggestionDropDown(false);
      }
      
    };

 
};

export default SearchBar;
