import React from "react";
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
import { fetchEvents } from "../../features/events/EventAction";
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
import { fetchPosts } from "../../features/cms/wordpress/WordPressAction";

const HomePage = () => {
  
  const { t } = useTranslation("History");

  const { language, languageId } = useContext(LanguageContext);


  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Access the state from the Redux store
  const { places, loading: placesLoading, error: placesError } = useSelector((state) => state.places);
  const { events, loading: eventsLoading, error: eventsError } = useSelector((state) => state.events);
  const { images, loading: imagesLoading, error: imagesError } = useSelector((state) => state.images);
  const { heroContent, loading: heroContentLoading, error: heroContentError, ourPartners, ourPartnersLoading, ourPartnersError } = useSelector((state) => state.cms.pages);
  const { randomPlaces, loading: randomPlacesLoading, error: randomPlacesError } = useSelector((state) => state.home);
  const { posts, loading: postsLoading, error: postsError } = useSelector((state) => state.cms.wordpress);


  // Fetch places on component mount
  useEffect(() => {
      dispatch(fetchRandomSites());
      dispatch(fetchEvents({ page: 1, type: "event" }));
      dispatch(fetchHeroContent(languageId));
      dispatch(fetchOurPartners(languageId));
      dispatch(fetchPosts({ per_page: 20 }));

  }, [dispatch, language]);

const handleNavigateToLogin = () => {
  navigate('/login', { state: { from: '/' } });
}

const handleNavActions = (e, id, action) => {
  if(action === "viewDetail") {
    navigate('/places/details', { state: { id } });
  }else if(action === "viewList") {
    navigate('/blog');
  }
}

  return (
    <div className={styles.homePage}>
      <Header />
      {heroContentLoading ? <HeroSectionSkeleton /> : <HeroSection handleNavigateToLogin={handleNavigateToLogin} heroContent={heroContent}/>}
      
      <SearchComponent />
    {placesLoading ? <CommonWidgetSkeleton /> : <PlacesSection places={randomPlaces} />}  
    {eventsLoading ? <CommonWidgetSkeleton /> : <EventsSection events={events} />} 
      <History
        title="¡Conóce nuestra historia!"
        description="Descubre cómo nació Local Secrets. Te invitamos a conocer nuestra trayectoria y a inspirarte para tu próxima aventura."
        buttonText="Saber más"
        imageSrc={LSLogo2_2}
      />
      <ArticlesSection posts={posts} seeMore={true} handleNavActions={handleNavActions}/>
      <AppPromotion />
      <PartnersSection ourPartners={ourPartners} ourPartnersLoading={ourPartnersLoading}/>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
