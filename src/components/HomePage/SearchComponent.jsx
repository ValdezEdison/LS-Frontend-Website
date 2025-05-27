import React, { useState, useEffect, useRef } from "react";
import RegionSearch from "./RegionSearch";
import SearchInput from "../common/SearchInput";
import styles from "./SearchComponent.module.css";
import { America } from "../common/Images";
import { useTranslation } from "react-i18next";
import Loader from "../common/Loader";
import SearchInputForUnifiedSearch from "../common/SearchInputForUnifiedSearch";
import AlertPopup from "../popup/Alert/AlertPopup";
import Modal from "../modal/Modal";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

 

function SearchComponent({ continents, loading, state, setState, unifiedSearchResults }) {

  const { t } = useTranslation("SearchComponent");
  const { t: tCommon } = useTranslation("Common");
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const suggestionRef = useRef(null); // Ref for the SearchInput container
  const [showRegionDropDown, setShowRegionDropDown] = useState(false);
  // const [searchValue, setSearchValue] = useState("");
  const [showSuggestionDropDown, setShowSuggestionDropDown] = useState(false);

  const { isOpen } = useSelector((state) => state.popup);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [popupState, setPopupState] = useState({
    map: false,
    gallery: false,
    reviewDrawer: false,
    alert: false,
    comment: false,
    deleteConfirm: false,
    success: false,
    addTrip: false
  });

    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
  
  
    const togglePopup = (name, state) => {
        setPopupState(prev => ({ ...prev, [name]: state }));
        state ? dispatch(openPopup()) : dispatch(closePopup());
    };

  const handleSearchClick = () => {
    if(!showSuggestionDropDown && state.keyword.length === 0){
      setShowRegionDropDown(!showRegionDropDown); // Toggle the dropdown visibility
    }else if(state.keyword.length > 0){
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
    updateState("keyword", value);
  };




  const handleSearchClose = () => {
    setShowRegionDropDown(false); // Close the dropdown
    setShowSuggestionDropDown(false); // Close the dropdown
    updateState("keyword", "");
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
    if(state.keyword.length === 0){
      setShowSuggestionDropDown(false);
    }
  }, [state.keyword]);

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
 
  };

  const handleNavigate = (id, type) => {

    if(isAuthenticated){
      if (type === "place") {
        navigate(`/places/details`, { state: { id: id } });
      } else if (type === "event") {
        navigate(`/events/details`, { state: { id: id } });
      }
    }else{
      togglePopup("alert", true);
      setAlertTitle(tCommon('authAlert.viewDetails.title'));
      setAlertMessage(tCommon('authAlert.viewDetails.description'));
    }

   
  }


  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  };


  return (
    <>
      {isOpen && popupState.alert && (
      <Modal onClose={() => togglePopup("alert", false)} customClass="modalSmTypeOne">
        <AlertPopup
          handleNavigateToLogin={handleNavigateToLogin}
          title={alertTitle}
          description={alertMessage}
          buttonText={tCommon('authAlert.favorites.button')}
        />
      </Modal>
    )}
    <div className="page-center ">
      <div className={styles.searchWrapperMain}>
        <div className={styles.searchContainer}>
          <div >
            {/* <SearchInput handleSearchClick={handleSearchClick} showRegionDropDown={showRegionDropDown} suggestionRef={suggestionRef} handleSearch={handleSearch} showSuggestionDropDown={showSuggestionDropDown} handleSearchClose={handleSearchClose} searchValue={searchValue}/> */}
            <SearchInputForUnifiedSearch
            handleSearchClick={() => handleSearchClick()}
            showRegionDropDown={showRegionDropDown}
            suggestionRef={suggestionRef}
            handleSearch={handleSearch}
            showSuggestionDropDown={showSuggestionDropDown}
            handleSearchClose={handleSearchClose}
            searchValue={state.keyword}
            suggestionsList={unifiedSearchResults}
            placeholder={tCommon("search.placeholder")}
            onSelect={handleNavigate}
            // customClassName="placesSearchInputContainer"
            selectedValue={""}
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
    </>
  );
}

export default SearchComponent;
