import React, { useState, useCallback } from "react";
import Header from "../../components/layouts/Header";
import HeroSection from "../../components/layouts/HeroSection";
import PlacesSection from "../../components/HomePage/PlacesSection";
import EventsSection from "../../components/HomePage/EventsSection";
import ArticlesSection from "../../components/common/ArticlesSection";
import PartnersSection from "../../components/common/PartnersSection";
import Newsletter from "../../components/common/Newsletter";
import Footer from "../../components/layouts/Footer";
import styles from "./HomePage.module.css";
import AppPromotion from "../../components/HomePage/AppPromotion";
import SearchComponent from "../../components/HomePage/SearchComponent"
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces } from "../../features/places/PlaceAction";
import { fetchEvents, fetchNearMeEvents } from "../../features/events/EventAction";
import { useContext, useEffect } from "react";
import History from "../../components/HomePage/History";
import { useTranslation } from "react-i18next";
import { LSLogo2_2 } from "../../components/common/Images";
import { CommonWidgetSkeleton } from "../../components/skeleton/HomePage/CommonWidgetSkeleton";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { fetchHeroContent, fetchOurPartners } from "../../features/cms/Pages/PagesAction";
import HeroSectionSkeleton from "../../components/skeleton/HomePage/HeroSectionSkeleton";
import { fetchRandomSites } from "../../features/home/HomeAction";
import { fetchPosts, fetchTags, fetchPostsByTag } from "../../features/cms/wordpress/WordPressAction";
import { WidgetSkeleton } from "../../components/skeleton/common/WidgetSkeleton";
import { fetchContinents } from "../../features/common/continents/ContinentAction";
import { debounce } from "lodash";
import { fetchCities } from "../../features/common/cities/CityAction";
import { fetchNearMePlaces } from "../../features/places/PlaceAction";

const HomePage = () => {

  const { t } = useTranslation("History");
  const { t: tCommon } = useTranslation("Common");

  const { language, languageId } = useContext(LanguageContext);

  const { currentLocation, loading: currentLocationLoading } = useSelector((state) => state.locationSettings);


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [state, setState] = useState({
    continent: null,
    destinationSearchQuery: "",
    selectedDestinationId: null,
    tag: null,
    tagName: "",

  });

  // Access the state from the Redux store
  const { places, loading: placesLoading, error: placesError } = useSelector((state) => state.places);
  const { events, loading: eventsLoading, error: eventsError } = useSelector((state) => state.events);
  const { images, loading: imagesLoading, error: imagesError } = useSelector((state) => state.images);
  const { heroContent, loading: heroContentLoading, error: heroContentError, ourPartners, ourPartnersLoading, ourPartnersError } = useSelector((state) => state.cms.pages);
  const { randomPlaces, loading: randomPlacesLoading, error: randomPlacesError } = useSelector((state) => state.home);
  const { posts, loading: postsLoading, error: postsError, tags } = useSelector((state) => state.cms.wordpress);
  const { continents, loading: continentsLoading } = useSelector((state) => state.continents);
  const { cities, loading: citiesLoading } = useSelector((state) => state.cities);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const placesList = currentLocation && isAuthenticated ? places : randomPlaces;
  const trackingEnabled = currentLocation?.preferences?.geolocation_enabled;
  // Fetch places on component mount
  useEffect(() => {

    if(!currentLocationLoading){
      
      if(currentLocation && isAuthenticated && trackingEnabled){
        dispatch(fetchNearMePlaces({ page: 1, latitude: currentLocation.preferences?.last_known_latitude, longitude: currentLocation.preferences?.last_known_longitude, type: "place" }));
        dispatch(fetchNearMeEvents({ page: 1, latitude: currentLocation.preferences?.last_known_latitude, longitude: currentLocation.preferences?.last_known_longitude, type: "event" }));

      }else{
        dispatch(fetchRandomSites({page: 1, type: "place"}));
        dispatch(fetchEvents({ page: 1, type: "event" }));
      }
    }
    dispatch(fetchHeroContent(languageId));
    dispatch(fetchOurPartners(languageId));
    dispatch(fetchPosts({ per_page: 10 }));
    dispatch(fetchTags({ per_page: 100 }));
    dispatch(fetchContinents());

  

  }, [dispatch, language, currentLocation]);

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: '/' } });
  }

  const handleNavActions = (e, id, action) => {
    if (action === "viewDetail") {
      navigate('/blog-detail', { state: { id } });
    } else if (action === "viewList") {
      navigate('/blog-list');
    }
  }


  useEffect(() => {
    
    if (state.continent) {
      navigate("/explore", { state: { id: state.continent } });
    }

  }, [state.continent, dispatch]);


  const debouncedFetchCities = useCallback(
    debounce((countryId, query) => {
      dispatch(fetchCities({ countryId, searchQuery: query }));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    // City search
    if (state.destinationSearchQuery.trim() !== "") {
      debouncedFetchCities(null, state.destinationSearchQuery);
    } else {
      dispatch(fetchCities({}));
    }
    return () => debouncedFetchCities.cancel();
  }, [state.destinationSearchQuery, debouncedFetchCities, dispatch]);


  useEffect(() => {
    // Navigation when destination is selected
    if (state.selectedDestinationId !== null) {
      navigate('/places/destination', { state: { id: state.selectedDestinationId } });
    }
  }, [state.selectedDestinationId, navigate]);


  useEffect(() => {
    if (state.tag) {

      // dispatch(fetchPostsByTag({ tagId: state.tag, per_page: 20 }));
      navigate("/blog-list", { state: { id: state.tag, name: state.tagName } });
    }

  }, [state.tag, dispatch]);


  return (
    <div className={styles.homePage}>
      <Header />
      {heroContentLoading ? <HeroSectionSkeleton /> : <HeroSection handleNavigateToLogin={handleNavigateToLogin} heroContent={heroContent} />}

      <SearchComponent continents={continents} loading={continentsLoading} state={state} setState={setState} cities={cities} />
      {placesLoading ? <CommonWidgetSkeleton /> : <PlacesSection places={placesList} />}
      {eventsLoading ? <CommonWidgetSkeleton /> : <EventsSection events={events} />}
      <History
        title="¡Conóce nuestra historia!"
        description="Descubre cómo nació Local Secrets. Te invitamos a conocer nuestra trayectoria y a inspirarte para tu próxima aventura."
        buttonText="Saber más"
        imageSrc={LSLogo2_2}
      />
      {postsLoading ? <WidgetSkeleton /> :
        <ArticlesSection title={tCommon('travelInspiration')} posts={posts} seeMore={true} handleNavActions={handleNavActions} tags={tags} layout="carousel"  // Default carousel layout
          setState={setState} />
      }
      <AppPromotion />
      <PartnersSection ourPartners={ourPartners} ourPartnersLoading={ourPartnersLoading} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
