import React, { useEffect, useContext, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from 'lodash';
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/PlacesPage/Sidebar";
import MainContent from "../../components/PlacesPage/MainContent";
import Footer from "../../components/layouts/Footer";
import PromotionalBanner from "../../components/PlacesPage/PromotionalBanner";
import { MainContentSkeleton } from "../../components/skeleton/PlacesPage/PlaceSkeleton";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchPlaces, fetchPlacesByCityId, fetchGeoLocations, fetchPlacesFilterCategories } from "../../features/places/PlaceAction";
import { fetchCountries } from "../../features/common/countries/CountryAction";
import { fetchCities } from "../../features/common/cities/CityAction";
import styles from "./PlacesPage.module.css";
import Newsletter from "../../components/common/Newsletter";
import MapPopup from "../../components/PlacesPage/MapPopup";
import { openPopup, closePopup } from "../../features/popup/PopupSlice";
import PlacesPageSkeleton from "../../components/skeleton/PlacesPage/PlacesPageSkeleton";
import { useNavigate } from "react-router-dom";
import FilterBarSkeleton from "../../components/skeleton/PlacesPage/FilterBarSkeleton";

const PlacesPage = () => {
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);

const initialRender = useRef(true);

  const [state, setState] = useState({
    selectedCountryId: null,
    selectedDestinationId: null,
    selectedDestinations: "",
    selectedOrder: "",
    searchQuery: "",
    destinationSearchQuery: "",
    selectedCountryName: "",
    page: 1,
    levels: "",
    categories: "",
    ratings: "",
    subcategories: "",
  });


  const removeDuplicates = (str) => {
    return Array.from(new Set(str.split(","))).join(",");
  };
  
  // Clean up the state
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      categories: removeDuplicates(prevState.categories),
      levels: removeDuplicates(prevState.levels),
    }));
  }, [state.categories, state.levels]);

  const { loading: placesLoading, categories, filterLoading } = useSelector((state) => state.places);
  const { countries, loading: countriesLoading } = useSelector((state) => state.countries);
  const { cities, loading: citiesLoading } = useSelector((state) => state.cities);
  const { isOpen } = useSelector((state) => state.popup);

  const navigate = useNavigate();

  const [showMapPopup, setShowMapPopup] = useState(false);

  const handleShowMapPopup = () => {
    setShowMapPopup(true);
    dispatch(openPopup());
  };

  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
    dispatch(closePopup());
  };

  // Fetch places and countries on component mount and language change
  useEffect(() => {
    dispatch(fetchPlaces());
    dispatch(fetchCountries());
    dispatch(fetchCities({}));
    dispatch(fetchGeoLocations({cityId: "", type: "place"}));
    dispatch(fetchPlacesFilterCategories({page: 1, type: "place", cityId: ""}));
  }, [dispatch, language]);

  const debouncedFetchCountries = useCallback(
    debounce((query) => {
      dispatch(fetchCountries(query));
    }, 500),
    [dispatch]
  );

  const debouncedFetchCities = useCallback(
    debounce((countryId, query) => {
      dispatch(fetchCities({ countryId, searchQuery: query }));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    if (state.searchQuery.trim() !== "") {
      debouncedFetchCountries(state.searchQuery);
    } else {
      dispatch(fetchCountries(""));
    }

    return () => debouncedFetchCountries.cancel();
  }, [state.searchQuery, debouncedFetchCountries, dispatch]);


  useEffect(() => {
    if (state.selectedCountryId) {
      if (state.destinationSearchQuery.trim() !== "") {
        debouncedFetchCities(state.selectedCountryId, state.destinationSearchQuery);
      } else {
        dispatch(fetchCities({ countryId: state.selectedCountryId, searchQuery: "" }));
      }
    } else if (state.destinationSearchQuery.trim() !== "") {
      debouncedFetchCities(null, state.destinationSearchQuery);
    } else {
      dispatch(fetchCities({}));
    }
    return () => debouncedFetchCities.cancel();
  }, [state.selectedCountryId, state.destinationSearchQuery, debouncedFetchCities, dispatch]);


  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false; // Skip the first render
      return;
    }

    dispatch(fetchPlacesByCityId({
      cityId: state.selectedDestinationId !== null
        ? state.selectedDestinationId
        : state.selectedDestinations,
      country: state.selectedCountryName,
      page: state.page,
      preview: 1,
      avg_rating: state.ratings,        // Pass ratings from state
      categories: state.categories,    // Pass categories from state
      levels: state.levels             // Pass levels from state
    
    }));

   
  }, [state.selectedCountryName, state.selectedDestinationId, state.selectedDestinations, state.selectedOrder, state.selectedCountryId, state.ratings, state.categories, state.levels, dispatch]);

  useEffect (() => {
    dispatch(fetchGeoLocations({cityId: state.selectedDestinationId !== null
      ? state.selectedDestinationId
      : state.selectedDestinations, type: "place"}));
  }, [state.selectedDestinationId, state.selectedDestinations]);




  const ratings = [
    { label: "Excelente: 4 o más", value: 4 },
    { label: "Muy bueno: 3 o más", value: 3 },
    { label: "Bueno: 2 o más", value: 2 },
    { label: "Mejorable: menos de 2", value: 1 },
  ];


 useEffect(() => {

  if(state.selectedDestinationId !== null){ 
    navigate('/places/destination', { state: { id: state.selectedDestinationId } });
  }

 }, [state.selectedDestinationId]);

  return (
    <>
    {isOpen && showMapPopup && <MapPopup onClose={handleCloseMapPopup} categories={categories} ratings={ratings} state={state} setState={setState}/>}
    <div className={styles.placesPage}>
      <Header />
      {(filterLoading) ? (
          <PlacesPageSkeleton filterLoading={filterLoading} placesLoading={placesLoading} />
        ) : (
          <>
            <div className="page-center">
              <div className={styles.content}>
                <Sidebar handleShowMapPopup={handleShowMapPopup} categories={categories} ratings={ratings} state={state} setState={setState} />
                {!filterLoading && placesLoading ? <MainContentSkeleton /> :
                <MainContent state={state} setState={setState} countries={countries} cities={cities} />
                }
              </div>
              <div className={styles.content}>
                <PromotionalBanner />
              </div>
            </div>
          </>
        )}
      <Newsletter />
      <Footer />
    </div>
    </>
  );
};

export default PlacesPage;