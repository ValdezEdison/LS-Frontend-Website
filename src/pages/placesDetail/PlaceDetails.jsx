import React from "react";
import styles from "./PlaceDetails.module.css";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import MapSection from "../../components/PlacesDetailPage/MapSection";
import MuseumInfo from "../../components/PlacesDetailPage/MuseumInfo";
import ImageGallery from "../../components/PlacesDetailPage/ImageGallery";
import ReviewSection from "../../components/PlacesDetailPage/ReviewSection";
import NearbyPlaces from "../../components/PlacesDetailPage/NearbyPlaces";

const PlaceDetails = () => {
  return (
    <div className={styles.lugaresContainer}>
    <Header />
      <main className={styles.mainContent}>
        <div className="page-center" >
          <div className={styles.contentWrapper}>
          <MapSection />
          <div className={styles.infoSection}>
            <MuseumInfo />
            <ImageGallery />
            <p className={styles.museumDescription}>
              El Museo Histórico Nacional de la ciudad de Atenas, Grecia, es uno
              de los museos más destacados del país y es una joya cultural que
              alberga una rica colección de artefactos históricos que abarcan
              siglos de historia griega. Este museo está ubicado en el corazón
              de Atenas, en el edificio neoclásico del Antiguo Parlamento,
              conocido como el 'Viejo Parlamento'. El museo fue inaugurado en
              1882 y se ha convertido en un lugar imprescindible para explorar
              la historia y la cultura de Grecia desde la antigüedad hasta la
              época contemporánea. Su colección incluye una amplia variedad de
              objetos, desde hallazgos arqueológicos hasta obras de arte y
              documentos históricos.
            </p>
          </div>
        </div>
        
        <ReviewSection />
        <NearbyPlaces />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceDetails;
