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

const ExplorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { continents, loading: continentsLoading } = useSelector((state) => state.continents);
  const { citiesInContinent, loading: citiesLoading } = useSelector((state) => state.explore);
  
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
      dispatch(fetchCitiesInContinent(activeContinent.id));
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
        <h1 className={styles.pageTitle}>1.235 opciones a explorar</h1>
        <SearchBar />
        <h2 className={styles.sectionTitle}>Explora más destinos</h2>
        <p className={styles.sectionSubtitle}>Déjate sorprender</p>
        
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
          destinations={citiesInContinent}
          loading={citiesLoading}
          handleActions={handleActions}
        />
        
        <button className={styles.showMoreButton}>Mostrar más</button>
      </main>
      <BlogSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ExplorePage;