import React from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import DestinationGrid from "./DestinationGrid";
import SearchBar from "./SearchBar";
import BlogSection from "./BlogSection";
import styles from "./ExplorerPage.module.css";
import Newsletter from "../../components/common/Newsletter";

const ExplorerPage = () => {
  return (
    <div className={styles.explorerPage}>
      <Header />
      <main className="page-center">
        <h1 className={styles.pageTitle}>1.235 opciones a explorar</h1>
        <SearchBar />
        <h2 className={styles.sectionTitle}>Explora más destinos</h2>
        <p className={styles.sectionSubtitle}>Déjate sorprender</p>
        <nav className={styles.continentNav}>
          <button className={styles.activeContinent}>Europa</button>
          <button>América del Norte</button>
          <button>América del Sur</button>
          <button>Asia</button>
          <button>África</button>
          <button>Oceanía</button>
        </nav>
        <hr className={styles.sectionDivider} />
        <DestinationGrid />
        <button className={styles.showMoreButton}>Mostrar más</button>
      </main>
      <BlogSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ExplorerPage;
