import React, { useEffect, useContext, useState, useCallback } from "react";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";
import ItineraryCard from "../../../components/PlacesInfo/Itineries/ItineraryCard";
import RelatedContent from "../../../components/PlacesInfo/Itineries/RelatedContent";
import styles from "./ItineraryDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchItineraryDetails } from "../../../features/places/placesInfo/itinerary/ItineraryAction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the skeleton styles
import CardSkeleton from "../../../components/skeleton/common/CardSkeleton";
import { WidgetSkeleton } from "../../../components/skeleton/common/WidgetSkeleton";
import ItineraryMap from "../../../components/PlacesInfo/Itineries/ItineraryMap";
import { LanguageContext } from "../../../context/LanguageContext";
import Modal from "../../../components/modal/Modal";
import { openPopup, closePopup, openAddToTripPopup, closeAddToTripPopup } from "../../../features/popup/PopupSlice";
import AlertPopup from "../../../components/popup/Alert/AlertPopup";
import AddToTripPopup from "../../../components/popup/AddToTrip/AddToTripPopup";
import { fetchTravelLiteList, fetchTravelTime, addTrip, generateLink, downloadTrip, fetchStops } from "../../../features/places/placesInfo/itinerary/ItineraryAction";
import { fetchCities } from "../../../features/common/cities/CityAction";
import { debounce, set } from 'lodash';
import { t } from "i18next";
import ShareOptions from "../../../components/common/ShareOptions";
import { resetShareableLink, resetDownloadedTrip, setTripType, resetTripType } from "../../../features/places/placesInfo/itinerary/ItinerarySlice";
import SuccessMessagePopup from "../../../components/popup/SuccessMessage/SuccessMessagePopup";
import { toggleFavorite } from "../../../features/favorites/FavoritesAction";
import { setFavTogglingId } from "../../../features/places/placesInfo/itinerary/ItinerarySlice";
import { useTranslation } from "react-i18next";
import AddTripPopup from "../../../components/popup/AddToTrip/AddTripPopup";
import { useAddTrip } from "../../../hooks/useAddTrip";

const ItineraryDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;

  const { language } = useContext(LanguageContext);

  const { loading, itineraryDetails, generatedLink, downloadedTrip, stops, stopsLoading } = useSelector((formState) => formState.itineriesInCity);
  const { isAuthenticated } = useSelector((formState) => formState.auth);

  const { isOpen } = useSelector((formState) => formState.popup);
  const { geoLocations } = useSelector((formState) => formState.places);
  const { cities, loading: citiesLoading } = useSelector((formState) => formState.cities);

  const { t } = useTranslation("Places");
  const { t: tCommon } = useTranslation("Common");
  const { t: tAddTrip } = useTranslation("AddTrip");

  const [popupState, setPopupState] = useState({

    alert: false,
    deleteConfirm: false,
    success: false,
  });


  const [showShareOptions, setShowShareOptions] = useState(false);
  const tripType = localStorage.getItem('tripType') 
  ? JSON.parse(localStorage.getItem('tripType')).type 
  : "solo";
  // const [formState, setFormState] = useState({
  //   tripType: tripType,
  //   tripName: '',
  //   startDate: null,
  //   endDate: null,
  //   destinationSearchQuery: "",
  //   mode: 'driving',
  //   destinations: [{
  //     destinationSearchQuery: '',
  //     destinationId: null,
  //     destinationName: ''
  //   }],
  //   stops: []
  // });


   // Add trip functionality
    const {
      tripState,
      formState,
      formErrors,
      citiesSearchResults,
      isSearchingCities,
      activeDestinationIndex,
      successData,
      isAddToPopupOpen,
      travelLiteList,
      tripPopupState,
      setTripPopupState,
      setFormState,
      setTripState,
      setFormErrors,
      handleTripClick,
      handleSubmitTrip,
      handleSubmit,
      updateDestination,
      setActiveDestinationIndex,
      debouncedFetchCitiesForAddTrip,
      openAddTripPopup,
      closeAddTripPopup,
      closeSuccessMessage,
      closeAddToTrip
    } = useAddTrip();

  const [successMessage, setSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  // const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  // const [citiesSearchResults, setCitiesSearchResults] = useState([]);
  // const [isSearchingCities, setIsSearchingCities] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const togglePopup = (name, formState) => {
    setPopupState((prev) => ({ ...prev, [name]: formState }));
    formState ? dispatch(openPopup()) : dispatch(closePopup());
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchItineraryDetails(id));
      if (isAuthenticated) {
        dispatch(fetchTravelLiteList());
      }
      dispatch(fetchCities({}));
      dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
    }
    return () => {
      dispatch(resetTripType());
    };

  }, [dispatch, id, language]);

  const handleViewMoreDetails = (id) => {

    
    if(isAuthenticated){

      navigate('/places/details', { state: { id } });
    }else{
        togglePopup("alert", true);
        setAlertTitle(tCommon('authAlert.viewDetails.title'));
        setAlertMessage(tCommon('authAlert.viewDetails.description'));
    }
  };

  const handleActions = (e, action, id, name) => {
    
    e.stopPropagation();
    switch (action) {
      case 'addToFavorites':
        handleFavClick(e, id);
        break;
      case 'addToTrip':
        handleAddToTripClick(e, id, name);
        setFormState(prev => ({ ...prev, type: "itinerary" }));
        break;
      case 'viewMore':
        handleViewMoreDetails(e, id);
        break;
      default:
        break;
    }
  };

  const handleAddToTripClick = (e, id, name) => {
    const result = handleTripClick(e, id, name);
    if (result?.needsAuth) {
      setAlertTitle(tCommon('authAlert.favorites.title'));
      setAlertMessage(tCommon('authAlert.favorites.description'));
      togglePopup("alert", true);
    }
  };

  const handleFavClick = (e, id) => {
    e.stopPropagation();
    if (isAuthenticated) {
      dispatch(toggleFavorite(id));
      dispatch(setFavTogglingId(id));
    } else {
      togglePopup("alert", true);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login', { formState: { from: location } });
  }

  // const debouncedFetchCities = useCallback(
  //   debounce((query) => {
  //     dispatch(fetchCities({ searchQuery: query }));
  //   }, 500),
  //   [dispatch]
  // );

  // useEffect(() => {
  //   if (formState?.destinationSearchQuery?.trim()) {
  //     debouncedFetchCities(formState.destinationSearchQuery);
  //   } else {
  //     dispatch(fetchCities({}));
  //   }

  //   return () => debouncedFetchCities.cancel();
  // }, [formState?.destinationSearchQuery, debouncedFetchCities, dispatch]);

    // Debounced search function
    const debouncedFetchCities = useCallback(
      debounce(async (query) => {
        if (query.trim()) {
          setIsSearchingCities(true);
          try {
            const result = await dispatch(fetchCities({ searchQuery: query }));
            setCitiesSearchResults(result.payload || []);
          } catch (error) {
            
            setCitiesSearchResults([]);
          } finally {
            setIsSearchingCities(false);
          }
        } else {
          setCitiesSearchResults([]);
        }
      }, 500),
      [dispatch]
    );
  
    // Search effect
    useEffect(() => {
      const activeQuery = formState.destinations?.[activeDestinationIndex]?.destinationSearchQuery;
      debouncedFetchCities(activeQuery);
  
      return () => debouncedFetchCities.cancel();
    }, [formState.destinations, activeDestinationIndex, debouncedFetchCities]);
  
    // Update destination handler
    // const updateDestination = (index, field, value) => {
    //   setFormState(prev => {
    //     const newDestinations = [...prev.destinations];
    //     newDestinations[index] = {
    //       ...newDestinations[index],
    //       [field]: value
    //     };
    //     return { ...prev, destinations: newDestinations };
    //   });
    // };

  // const [formErrors, setFormErrors] = useState({});
  const [isCreatingNewTrip, setIsCreatingNewTrip] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  const validateForm = () => {
    const errors = {};
  
    // Validate trip name
    if (!formState.tripName.trim()) {
      errors.tripName = t('AddTrip:validation.tripNameRequired');
    }
  
    // Validate dates
    if (!formState.startDate) {
      errors.startDate = t('AddTrip:validation.startDateRequired');
    }
    if (!formState.endDate) {
      errors.endDate = t('AddTrip:validation.endDateRequired');
    }
  
    // Validate that end date is not before start date
    if (formState.startDate && formState.endDate && formState.endDate < formState.startDate) {
      errors.endDate = t('AddTrip:validation.endDateBeforeStart');
    }
  
    // Validate destinations
    if (formState.destinations.length === 0) {
      errors.destinations = t('AddTrip:validation.destinationRequired');
    } else {
      // Check each destination for validity
      formState.destinations.forEach((dest, index) => {
        if (!dest.destinationName.trim()) {
          errors[`destinations[${index}]`] = t('AddTrip:validation.specificDestinationRequired');
        }
        // Add more destination validations as needed
      });
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const storedTripType = localStorage.getItem('tripType')

  // const handleSubmit = async (e) => {
  //   
  //   if (!storedTripType) {
  //     dispatch(setTripType({  id: id, type: formState.tripType }))
  //     dispatch(closeAddToTripPopup())
  //     togglePopup("success", true);
  //     setSuccessMessage(`A new stop has been added to your trip ${itineraryDetails.title}. Continue adding destinations and events as you wish.`);
  //     setSuccessTitle("Route added!");
  //     return
  //   }

  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   try {
  //     dispatch(setTripType({  id: id, type: formState.tripType }))
  //     if (isCreatingNewTrip) {
  //       const tripData = {
  //         title: formState.tripName,
  //         type: formState.tripType,
  //         cities: formState.destinations.map((destination) => destination.destinationId),
  //         initial_date: formState.startDate.toISOString().split('T')[0],
  //         end_date: formState.endDate.toISOString().split('T')[0],
  //         stops: formState.stops,
  //       };
  //       dispatch(addTrip(tripData))
  //       .then((response) => {
  //         
          
  //         if (response.type === "places/addTrip/fulfilled") {
  //           // Success case
  //           dispatch(resetTripType());
  //           togglePopup("success", true);
  //           setSuccessMessage(`A new trip has been added to your account. Continue adding destinations and events as you wish.`);
  //           setSuccessTitle("Trip added!");
  //         } 
  //         else if (response.type === "places/addTrip/rejected") {
  //           // Error case
  //           const errorMsg = response.payload?.error_description || 
  //                           response.error?.message || 
  //                           "Failed to create trip";
            
  //           togglePopup("error", true);
  //           setSuccessMessage(errorMsg);
  //           setSuccessTitle("Error creating trip");
  //           
  //         }
  //       })
  //       .catch((error) => {
  //         // Unexpected errors
  //         
  //         togglePopup("error", true);
  //         setSuccessMessage("An unexpected error occurred while creating the trip");
  //         setSuccessTitle("Error");
  //       });
  //     } else {
  //       // Logic to add itinerary to existing trip would go here
  //       
  //     }

  //     dispatch(closeAddToTripPopup());
  //     dispatch(closePopup());
  //   } catch (error) {
  //     
  //   }
  // };

  

  useEffect(() => {
    if (formState.mode) {
      dispatch(fetchTravelTime({ travelId: id, mode: formState.mode }));
    }
  }, [formState.mode, dispatch, id]);

  const handleGenerateLink = () => {
    
    if (id) {
      dispatch(resetShareableLink());
      dispatch(generateLink(id));
    }
  }



  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  useEffect(() => {
    if (generatedLink) {
      setShowShareOptions(true);
    }

  }, [generatedLink])

  const handleClickDownloadTrip = () => {
    if (id) {
      dispatch(resetDownloadedTrip());
      dispatch(downloadTrip(id));
    }
  }

  useEffect(() => {
    if (downloadedTrip) {
      // Create a blob from the PDF data
      const blob = new Blob([downloadedTrip], { type: 'application/pdf' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${itineraryDetails?.title || 'itinerary'}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }, [downloadedTrip, itineraryDetails?.title]);

  useEffect(() => {
    let timer;
    if (popupState.success) {
      timer = setTimeout(() => {
        togglePopup("success", false);
        setSuccessMessage("");
        setSuccessTitle("");
      }, 5000); // 5 seconds in milliseconds
    }

    // Clean up the timer when the component unmounts or when popupState.success changes
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [popupState.success]);


  const modalSearchProps = {
    activeDestinationIndex,
    setActiveDestinationIndex,
    citiesSearchResults,
    isSearchingCities,
    updateDestination
  };

  

  useEffect(() => {
    if (formState.destinations.length > 0 && formState.destinations[0].destinationId !== null) {
      
      dispatch(fetchStops({cityId: formState.destinations.map((destination) => destination.destinationId), type: "place", page: 1}))
    }
    
  },[formState.destinations])

  if (loading) {
    return (
      <>

        <div className={styles.itineraryDetailContainer}>
          <Header />
          <main className="page-center">
            {/* Skeleton for the header section */}
            <section className={styles.itineraryHeader}>
              <Skeleton height={30} width={200} className={styles.itenaryDetailTitle} />
              <div className={styles.itenaryMapFrame}>
                <Skeleton height={300} />
              </div>
              <div className={styles.itineraryInfo}>
                <Skeleton height={40} width={300} className={styles.itineraryTitle} />
                <div className={styles.itineraryActions}>
                  <Skeleton height={40} width={100} className={styles.shareButton} />
                  <Skeleton height={40} width={100} className={styles.shareButton} />
                  <Skeleton height={40} width={150} className={styles.shareButton} />
                </div>
              </div>
              <div className={styles.itenaryTagWrapper}>
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} height={25} width={80} className={styles.itineraryTag} />
                ))}
              </div>
              <Skeleton height={20} width={100} className={styles.itineraryMeta} />
            </section>

            {/* Skeleton for the itinerary places section */}
            <section className={styles.itineraryPlaces}>
              {[...Array(4)].map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <CardSkeleton />
                </div>
              ))}
            </section>
            <WidgetSkeleton />
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
       {isOpen && tripPopupState.addTripPopup && (
        <AddTripPopup
          onClose={closeAddTripPopup}
          travelLiteList={travelLiteList}
          state={tripState}
          setState={setTripState}
          handleSubmitTrip={handleSubmitTrip}
        />
      )}

      {isOpen && isAddToPopupOpen && <AddToTripPopup closeModal={() => {
        dispatch(closeAddToTripPopup());
        dispatch(closePopup());
        dispatch(resetTripType());
      }} state={formState} setState={setFormState} cities={cities} onSubmit={handleSubmit} formErrors={formErrors} setFormErrors={setFormErrors} {...modalSearchProps} handleActions={handleActions} />}
      {isOpen && popupState.alert && (
        <Modal
          onClose={() => togglePopup("alert", false)}
          customClass="modalSmTypeOne"
        >
          <AlertPopup handleNavigateToLogin={handleNavigateToLogin}  title={alertTitle}
      description={alertMessage}
      buttonText={tCommon('authAlert.favorites.button')}/>
        </Modal>
      )}


      {isOpen && popupState.success && (
        <Modal
          title=""
          onClose={() => togglePopup("success", false)}
          customClass="modalSmTypeOne"
          hideCloseButton={true}
        >
          <SuccessMessagePopup
            title={successTitle}
            message={successMessage}
            onClose={() => togglePopup("success", false)}
          />
        </Modal>
      )}
      <div className={`${styles.itineraryDetailContainer} ${isAddToPopupOpen ? styles.overflowHide : ''}`}>
        <Header />
        <main className="page-center">
          <section className={styles.itineraryHeader}>
            <div className={styles.itenaryDetailTitle}>{t('Itinerary.detailTitle')}</div>
            <ItineraryMap places={itineraryDetails?.stops} formState={formState} setFormState={setFormState} />
            <div className={styles.itineraryInfo}>
              <h1 className={styles.itineraryTitle}>{itineraryDetails?.title}</h1>
              <div className={styles.itineraryActions}>
                <button className={styles.shareButton} aria-label="Compartir itinerario" onClick={handleClickDownloadTrip}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7d92ff5dd9197dd8e65a6dec460c67360b82ece179565a9e2535e4e5790d5e0d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                    alt=""
                    className={styles.shareIcon}
                  />
                </button>

                <div className={styles.shareIconWrapper}>
                  <button className={styles.shareBtnIcon} onClick={handleGenerateLink}></button>
                  {showShareOptions && (
                    <ShareOptions
                      url={generatedLink}
                      title={itineraryDetails?.title}
                      description={itineraryDetails?.description}
                      onClose={toggleShareOptions}
                    />
                  )}
                </div>
                <button className={styles.addToTripButton} onClick={(e) => handleActions(e, 'addToTrip', itineraryDetails?.id, itineraryDetails?.title)}>
                  <span className={styles.addIcon}></span>
                  {t('Itinerary.addToTrip')}
                </button>
              </div>
            </div>
            <div className={styles.itenaryTagWrapper}>
              {itineraryDetails?.tags.map((tag, index) => (
                <div key={index} className={styles.itineraryTag}>
                  <span className={styles.tagText}>#{tag.title}</span>
                </div>
              ))}
            </div>
            <p className={styles.itineraryMeta}>{t('Itinerary.stopCount', { count: itineraryDetails?.num_of_stops })}</p>
          </section>
          <section className={styles.itineraryPlaces}>
            {itineraryDetails?.stops && itineraryDetails.stops.length > 0 ? (
              // Render itinerary stops if available
              itineraryDetails.stops.map((stop, index) => (
                <ItineraryCard key={stop.id} place={stop} index={index + 1} handleViewMoreDetails={handleViewMoreDetails} />
              ))
            ) : (
              // Show "No results" message if no stops are found
              <div className="no-results-wrapper">{t('Itinerary.noStops')}</div>
            )}
          </section>
          <RelatedContent />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ItineraryDetail;