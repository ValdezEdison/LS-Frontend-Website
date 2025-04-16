import React, { useState, useEffect } from "react";
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

const ExplorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { t: tCommon } = useTranslation('Common');
  const {t: tExplore} = useTranslation('ExplorePage');

  const { continents, loading: continentsLoading } = useSelector((state) => state.continents);
  const { citiesInContinent, loading: citiesLoading, next, count } = useSelector((state) => state.explore);
  const { data: visibleCitiesInContinent, loading, next: hasNext, loadMore } = useSeeMore(citiesInContinent, next);
  
  // Set default continent to the first one when loaded
  const [activeContinent, setActiveContinent] = useState(null);

  useEffect(() => {
    dispatch(fetchContinents());
  }, [dispatch]);

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
  }, [dispatch, activeContinent]);

  const handleContinentClick = (continent) => {
    setActiveContinent(continent);
  };

  const handleActions = (e, action, id) => {
    e.stopPropagation();
   if(action === 'showSites') {
    navigate('/places/destination', { state: { id: id } });
   }
  };


  if (continentsLoading) {
    return (
      <div className={styles.explorerPage}>
        <Header />
        <ExplorePageSkeleton />
        <BlogSection />
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
        {loading ? <Loader /> : next && <SeeMoreButton
        onClick={loadMore}
        loading={loading}
        next={hasNext}
        translate={tCommon}
      />
      }
      </main>
      <BlogSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ExplorePage;