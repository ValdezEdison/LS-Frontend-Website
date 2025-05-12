import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import DestinationGrid from "../../components/exoplore/DestinationGrid";
import SearchBar from "./SearchBar";
import BlogSection from "./BlogSection";
import styles from "./ExplorePage.module.css";
import Newsletter from "../../components/common/Newsletter";
import { fetchContinents } from "../../features/common/continents/ContinentAction";
import { fetchCitiesInContinent } from "../../features/explore/ExploreAction";
import { useDispatch, useSelector } from "react-redux";
import ExplorePageSkeleton from "../../components/skeleton/ExplorePage/ExplorePageSkeleton";
import { useNavigate, useLocation } from "react-router-dom";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import useSeeMore from "../../hooks/useSeeMore";
import { useTranslation } from 'react-i18next';
import Loader from "../../components/common/Loader";
import { listUpdater } from "../../features/explore/ExploreSlice";
import { LanguageContext } from "../../context/LanguageContext";
import ArticlesSection from "../../components/common/ArticlesSection";
import { fetchPosts, fetchTags } from "../../features/cms/wordpress/WordPressAction";
import { WidgetSkeleton } from "../../components/skeleton/common/WidgetSkeleton";

const ExplorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { t: tCommon } = useTranslation('Common');
  const {t: tExplore} = useTranslation('ExplorePage');

  const { continents, loading: continentsLoading } = useSelector((state) => state.continents);
  const { citiesInContinent, loading: citiesLoading, next, count } = useSelector((state) => state.explore);
  const { data: visibleCitiesInContinent, loading, next: hasNext, loadMore } = useSeeMore(citiesInContinent, next, listUpdater);
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { posts, loading: postsLoading, error: postsError, tags } = useSelector((state) => state.cms.wordpress);
  
  
  // Set default continent to the first one when loaded
  const [activeContinent, setActiveContinent] = useState(null);
   const { language } = useContext(LanguageContext);

  useEffect(() => {
    dispatch(fetchContinents());
    dispatch(fetchPosts({ per_page: 10 }));
    dispatch(fetchTags({per_page: 100}));
  }, [dispatch, language]);

  // Set initial active continent when continents load
  useEffect(() => {
    if (continents?.length > 0 && !activeContinent) {
      const europe = continents.find(c => c.name === "Europa") || continents[0];
      setActiveContinent(europe);
    }
  }, [continents, activeContinent]);

  // Fetch cities when active continent changes
  useEffect(() => {
    if (activeContinent?.id) {
      dispatch(fetchCitiesInContinent( {continentId: activeContinent.id, page: 1} ));
    }
  }, [dispatch, activeContinent, language]);

  const handleContinentClick = (continent) => {
    setActiveContinent(continent);
  };

  const handleActions = (e, action, id) => {
    e.stopPropagation();
   if(action === 'showSites') {
    navigate('/places/destination', { state: { id: id } });
   }
  };

  const handleNavigateToLogin = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleNavActions = (e, id, action) => {
    if(action === "viewDetail") {
      navigate('/places/details', { state: { id } });
    }else if(action === "viewList") {
      navigate('/blog-list');
    }
  }


  if (continentsLoading) {
    return (
      <div className={styles.explorerPage}>
        <Header />
        <ExplorePageSkeleton />
        {/* <BlogSection /> */}
        <Newsletter />
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.explorerPage}>
      <Header />
      <main className="page-center">
        <h1 className={styles.pageTitle}> {tExplore('pageTitle', { count })}</h1>
        <SearchBar />
        <h2 className={styles.sectionTitle}>{tExplore('sectionTitle')}</h2>
        <p className={styles.sectionSubtitle}>{tExplore('sectionSubtitle')}</p>
        
        {!continentsLoading && continents?.length > 0 && (
          <>
            <nav className={styles.continentNav}>
              {continents.map((continent) => (
                <button
                  key={continent.id}
                  className={
                    activeContinent?.id === continent.id 
                      ? styles.activeContinent 
                      : ""
                  }
                  onClick={() => handleContinentClick(continent)}
                >
                  {continent.name}
                </button>
              ))}
            </nav>
            {/* <hr className={styles.sectionDivider} /> */}
          </>
        )}

        <DestinationGrid 
          destinations={visibleCitiesInContinent}
          loading={citiesLoading}
          handleActions={handleActions}
        />
        {!citiesLoading && visibleCitiesInContinent?.length === 0 && <div className="no-results-wrapper">{tCommon('noResults')}</div>}
        {loading ? <Loader /> : next && isAuthenticated && <SeeMoreButton
          onClick={loadMore}
          loading={loading}
          next={hasNext}
          translate={''}
        />}
        {!isAuthenticated && next &&
          <div className={styles.loginButtonWrapper}>
            <button className={styles.loginButton} onClick={handleNavigateToLogin}>{tCommon('logInButton')}</button>
          </div>
        }
      </main>
      <div className={styles.articleSliderWrapper}>
        {postsLoading ? <WidgetSkeleton/> :
          <ArticlesSection title={tCommon('travelInspiration')} posts={posts} seeMore={true} handleNavActions={handleNavActions} tags={tags}/>
        }
      </div>
      
      {isAuthenticated && <Newsletter />}
      <Footer />
    </div>
  );
};

export default ExplorePage;