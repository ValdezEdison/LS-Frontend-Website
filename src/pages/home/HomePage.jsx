import React from "react";
import Header from "../../components/layouts/Header";
import HeroSection from "../../components/layouts/HeroSection";
import PlacesSection from "../../components/HomePage/PlacesSection";
import EventsSection from "../../components/HomePage/EventsSection";
import ArticlesSection from "../../components/HomePage/ArticlesSection";
import PartnersSection from "../../components/HomePage/PartnersSection";
import Newsletter from "../../components/common/Newsletter";
import Footer from "../../components/layouts/Footer";
import styles from "./HomePage.module.css";
import AppPromotion from "../../components/HomePage/AppPromotion";
import SearchComponent from "../../components/HomePage/SearchComponent"
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces } from "../../features/places/PlaceAction";
import { fetchEvents } from "../../features/events/EventAction";
import { useContext, useEffect } from "react";
import History from "../../components/HomePage/History";
import { useTranslation } from "react-i18next";
import { LSLogo2_2 } from "../../components/common/Images";
import { CommonWidgetSkeleton } from "../../components/skeleton/HomePage/CommonWidgetSkeleton";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { fetchHeroContent } from "../../features/cms/Pages/PagesAction";
import HeroSectionSkeleton from "../../components/skeleton/HomePage/HeroSectionSkeleton";

const HomePage = () => {
  
  const { t } = useTranslation("History");

  const { language, languageId } = useContext(LanguageContext);


  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Access the state from the Redux store
  const { places, loading: placesLoading, error: placesError } = useSelector((state) => state.places);
  const { events, loading: eventsLoading, error: eventsError } = useSelector((state) => state.events);
  const { images, loading: imagesLoading, error: imagesError } = useSelector((state) => state.images);
  const { heroContent, loading: heroContentLoading, error: heroContentError } = useSelector((state) => state.cms.pages);


  // Fetch places on component mount
  useEffect(() => {
      dispatch(fetchPlaces());
      dispatch(fetchEvents({ page: 1, type: "event" }));
      dispatch(fetchHeroContent(languageId));
  }, [dispatch, language]);

const handleNavigateToLogin = () => {
  navigate('/login', { state: { from: '/' } });
}

  return (
    <div className={styles.homePage}>
      <Header />
      {heroContentLoading ? <HeroSectionSkeleton /> : <HeroSection handleNavigateToLogin={handleNavigateToLogin} heroContent={heroContent}/>}
      
      <SearchComponent />
    {placesLoading ? <CommonWidgetSkeleton /> : <PlacesSection places={places} />}  
    {eventsLoading ? <CommonWidgetSkeleton /> : <EventsSection events={events} />} 
      <History
        title="¡Conóce nuestra historia!"
        description="Descubre cómo nació Local Secrets. Te invitamos a conocer nuestra trayectoria y a inspirarte para tu próxima aventura."
        buttonText="Saber más"
        imageSrc={LSLogo2_2}
      />
      <ArticlesSection />
      <AppPromotion />
      <PartnersSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
