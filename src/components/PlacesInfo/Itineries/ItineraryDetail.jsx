import React from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import ItineraryCard from "./ItineraryCard";
import RelatedContent from "./RelatedContent";
import styles from "./ItineraryDetail.module.css";

const ItineraryDetail = () => {
  const itineraryData = {
    title: "Plaka y Anafiotika",
    stops: 4,
    duration: "0h y 30 min",
    places: [
      {
        name: "Acrópolis de Atenas",
        address: "Acropolis of Athens, s/n 105 58 Athenas, Grecia",
        rating: 4.7,
        reviews: 234,
        image:
          "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/e6746e6e4b5535143b418e6552a3c001e176babac9724fc7a436cb0a114b47ca?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      },
      {
        name: "Partenón de Atenas",
        address: "Parthenon, s/n 105 58 Atenas, Grecia",
        rating: 4.7,
        reviews: 234,
        image:
          "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c9cbffd00ad4a34d1a52b57134c60ed74c2cc90396fba8bd5ddf28eddbc0acf1?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      },
      {
        name: "Anafiotika",
        address: "Parthenon, s/n 10556 Atenas, Grecia",
        rating: 4.7,
        reviews: 234,
        image:
          "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c27faf8f74ecbc95c6f6a91cff2a0a738cf58ded55eb0a1b8600f69b5d049413?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      },
      {
        name: "Museo Acrópolis",
        address: "Dionysiou Areopagitou 15 117 42 Atenas, Grecia",
        rating: 4.7,
        reviews: 234,
        image:
          "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/391ce159bec3241c3b9a76b6062d3e35918eff36de528180f0dde54790d6327b?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
      },
    ],
  };

  return (
    <div className={styles.itineraryDetailContainer}>
      <Header />
      <main className={styles.mainContent}>
        <section className={styles.itineraryHeader}>
          <div className={styles.itineraryInfo}>
            <h1 className={styles.itineraryTitle}>{itineraryData.title}</h1>
            <div className={styles.itineraryTag}>
              <span className={styles.tagText}>#Itinerario</span>
            </div>
            <p
              className={styles.itineraryMeta}
            >{`${itineraryData.stops} paradas, ${itineraryData.duration}`}</p>
          </div>
          <div className={styles.itineraryActions}>
            <button
              className={styles.shareButton}
              aria-label="Compartir itinerario"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7d92ff5dd9197dd8e65a6dec460c67360b82ece179565a9e2535e4e5790d5e0d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                alt=""
                className={styles.shareIcon}
              />
            </button>
            <button className={styles.addToTripButton}>
              <span className={styles.addIcon}></span>
              Añadir a viaje
            </button>
          </div>
        </section>
        <section className={styles.itineraryPlaces}>
          {itineraryData.places.map((place, index) => (
            <ItineraryCard key={index} place={place} index={index + 1} />
          ))}
        </section>
        <RelatedContent />
      </main>
      <Footer />
    </div>
  );
};

export default ItineraryDetail;
