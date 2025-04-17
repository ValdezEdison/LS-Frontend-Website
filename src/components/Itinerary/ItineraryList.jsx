import React from "react";
import ItineraryCard from "./ItineraryCard";
import styles from "./ItineraryList.module.css";
import PlaceCard from "../../components/common/PlaceCard";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const itineraries = [
  {
    id: 1,
    title: "Templo de Zeus Olímpico",
    stops: 1,
    location: "Atenas, Grecia",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/15ad7071d26a7bf62390c34d7163bfc75514ef15?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    id: 2,
    title: "Las mejores vistas de Lisboa",
    stops: 7,
    location: "Lisboa, Portugal",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7c162a385b9353a49fe03371649aaf99cd350443?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    id: 3,
    title: "Vistas del atlántico",
    stops: 1,
    location: "Oporto, Portugal",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5f7e56f3a8bd6d99c71aa87ab747154bc2a588d2?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    id: 4,
    title: "Oud-West",
    stops: 2,
    location: "Ámsterdam, Holanda",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/de1e15175d9b335f595ef46dec5d38a9c82ce549?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    id: 5,
    title: "Plaka y Anafiotika",
    stops: 4,
    location: "Atenas, Grecia",
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5b35553f826f287acc391e025af160bc0275326a?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
];

const ItineraryList = ({ visibleItineraries,  handleViewMoreDetails, handleActions }) => {

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading, isFavoriteToggling, favTogglingId } = useSelector((state) => state.itineraries);

  const { t } = useTranslation('Places');

  return (
    <section className={styles.itineraryList}>
      <h2 className={styles.sectionTitle}>
        Itinerarios más vistos por los viajeros
      </h2>
      <div className={styles.tagContainer}>
        {/* <span className={styles.tag}>#Patrimonio histórico</span> */}
      </div>
      {visibleItineraries?.length > 0 ? (
          visibleItineraries?.map((place, index) => (
            <PlaceCard key={index} place={place} translate={t} isAuthenticated={isAuthenticated} handleViewMoreDetails={handleViewMoreDetails} handleActions={handleActions} isFavoriteToggling={isFavoriteToggling && favTogglingId === place.id} />
          ))
        ) : (
          <div className="no-results-wrapper">No results</div>
        )}
      {/* <button className={styles.showMoreButton}>Mostrar más</button> */}
    </section>
  );
};

export default ItineraryList;
