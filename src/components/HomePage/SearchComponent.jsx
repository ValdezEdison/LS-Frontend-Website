import React, { useState, useEffect, useRef } from "react";
import RegionSearch from "./RegionSearch";
import SearchInput from "../common/SearchInput";
import styles from "./SearchComponent.module.css";
import { America } from "../common/Images";
import { useTranslation } from "react-i18next";
import Loader from "../common/Loader";

const regions = [
  { name: "Búsqueda flexible", image: "mapas-buscador-default" },
  {
    name: "América",
    image:
      America,
  },
  { name: "Asia", image: "mapas-buscador-asia-default" },
  { name: "África", image: "mapas-buscador-africa-default" },
  {
    name: "Europa",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8f9b7163972103673c2bf201de81d81ffc2853eb773ca199d7cd08d294bfb993?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  { name: "Oceanía", image: "oceania" },
];



function SearchComponent({ continents, loading, state, setState, cities }) {

  const { t } = useTranslation("SearchComponent");
  const { t: tCommon } = useTranslation("Common");
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const suggestionRef = useRef(null); // Ref for the SearchInput container
  const [showRegionDropDown, setShowRegionDropDown] = useState(false);
  // const [searchValue, setSearchValue] = useState("");
  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);

  const handleSearchClick = () => {
    if(!showSuggestionDropDown && state.destinationSearchQuery.length === 0){
      setShowRegionDropDown(!showRegionDropDown); // Toggle the dropdown visibility
    }else if(state.destinationSearchQuery.length > 0){
      setShowSuggestionDropDown(!showSuggestionDropDown);
    }
    
  };

  const handleSearch = (value) => {
    if(value.length > 0){
      setShowSuggestionDropDown(true);
    }else{
      setShowSuggestionDropDown(!showSuggestionDropDown);
    }
    setShowRegionDropDown(false); // Close the dropdown when a region is selected
    // setSearchValue(e);
    updateState("destinationSearchQuery", value);
  };




  const handleSearchClose = () => {
    setShowRegionDropDown(false); // Close the dropdown
    setShowSuggestionDropDown(false); // Close the dropdown
    updateState("destinationSearchQuery", "");
    updateState("selectedDestinationId", null);
  };


  useEffect(() => {
    // Add event listener when either dropdown is shown
    if (showRegionDropDown || showSuggestionDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showRegionDropDown, showSuggestionDropDown]);
  
  const handleClickOutside = (event) => {
    const isOutsideRegionDropdown = 
      showRegionDropDown && 
      dropdownRef.current && 
      !dropdownRef.current.contains(event.target);
      
    const isOutsideSuggestionDropdown = 
      showSuggestionDropDown && 
      suggestionRef.current && 
      !suggestionRef.current.contains(event.target);
  
    // If both dropdowns are shown, we need to check both refs
    if (showRegionDropDown && showSuggestionDropDown) {
      if (isOutsideRegionDropdown && isOutsideSuggestionDropdown) {
        setShowRegionDropDown(false);
        setShowSuggestionDropDown(false);
      }
    } 
    // If only region dropdown is shown
    else if (showRegionDropDown && isOutsideRegionDropdown) {
      setShowRegionDropDown(false);
    }
    // If only suggestion dropdown is shown
    else if (showSuggestionDropDown && isOutsideSuggestionDropdown) {
      setShowSuggestionDropDown(false);
    }
  };
  useEffect(() => {
    // open the dropdown when the search value changes
    if(state.destinationSearchQuery.length === 0){
      setShowSuggestionDropDown(false);
    }
  }, [state.destinationSearchQuery]);

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
 
  };

  return (
    <div className="page-center ">
      <div className={styles.searchWrapperMain}>
        <div className={styles.searchContainer}>
          <div >
            {/* <SearchInput handleSearchClick={handleSearchClick} showRegionDropDown={showRegionDropDown} suggestionRef={suggestionRef} handleSearch={handleSearch} showSuggestionDropDown={showSuggestionDropDown} handleSearchClose={handleSearchClose} searchValue={searchValue}/> */}
            <SearchInput
            handleSearchClick={() => handleSearchClick()}
            showRegionDropDown={showRegionDropDown}
            suggestionRef={suggestionRef}
            handleSearch={handleSearch}
            showSuggestionDropDown={showSuggestionDropDown}
            handleSearchClose={handleSearchClose}
            searchValue={state.destinationSearchQuery}
            suggestionsList={cities}
            placeholder={tCommon("search.placeholder")}
            onSelect={(value) => updateState("selectedDestinationId", value)}
            // customClassName="placesSearchInputContainer"
            selectedValue={state.selectedDestinationId}
          />
          </div>
          <div className={`${styles.regionSearchContainer} ${showRegionDropDown ? styles.active : ""}`} ref={dropdownRef} >
            <h2 className={styles.regionSearchTitle}>{t("regionSearchTitle")}</h2>
            <div className={styles.regionsGrid}>
              {continents.map((region, index) => (
                <RegionSearch key={index} name={region.name} image={region.image} id={region.id} updateState={updateState}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default SearchComponent;
