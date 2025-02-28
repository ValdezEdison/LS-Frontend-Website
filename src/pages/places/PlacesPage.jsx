import React, { useEffect, useContext, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from 'lodash';
import Header from "../../components/layouts/Header";
import Sidebar from "../../components/PlacesPage/Sidebar";
import MainContent from "../../components/PlacesPage/MainContent";
import Footer from "../../components/layouts/Footer";
import PromotionalBanner from "../../components/PlacesPage/PromotionalBanner";
import { MainContentSkeleton } from "../../components/skeleton/PlacesPage/PlaceSkeleton";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchPlaces, fetchPlacesByCityId } from "../../features/places/PlaceAction";
import { fetchCountries } from "../../features/common/countries/CountryAction";
import { fetchCities } from "../../features/common/cities/CityAction";
import styles from "./PlacesPage.module.css";
import { use } from "react";

const PlacesPage = () => {
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);

  const [state, setState] = useState({
    selectedCountryId: null,
    selectedDestinationId: null,
    selectedDestinations: [],
    selectedOrder: "",
    searchQuery: "",
    destinationSearchQuery: "",
  });

  const { loading: placesLoading } = useSelector((state) => state.places);
  const { countries } = useSelector((state) => state.countries);
  const { cities } = useSelector((state) => state.cities);

  // Fetch places and countries on component mount and language change
  useEffect(() => {
    dispatch(fetchPlaces());
    dispatch(fetchCountries());
    dispatch(fetchCities({}));
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
    if (state.selectedDestinationId) {
        dispatch(fetchPlacesByCityId({cityId: state.selectedDestinationId, page: 1, preview: 1}));
    } 
}, [state.selectedDestinationId, dispatch]);





  return (
    <div className={styles.placesPage}>
      <Header />
      <div className="page-center">
        <div className={styles.content}>
          <Sidebar />
          {placesLoading ? <MainContentSkeleton /> : (
            <MainContent
             state={state} setState={setState}
             countries={countries}
             cities={cities} // Pass cities data to MainContent
            />
          )}
        </div>
        <div className={styles.content}>
          <PromotionalBanner />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlacesPage;