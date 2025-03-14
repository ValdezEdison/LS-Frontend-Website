import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./NearbyPlaces.module.css";
import { PlaceHolderImg2 } from "../common/Images";

const NearbyPlaces = ({ places = []}) => {
  

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className={styles.nearbyPlaces}>
      <h2 className={styles.sectionTitle}>Otros lugares cercanos</h2>
      {places.length > 0 ? 
      <Slider {...settings}>
        {places.map((place, index) => (
          <div key={index} className={styles.placeCard}>
            <img
              src={place.images[0] ? place.images[0]?.original : PlaceHolderImg2}
              alt={place.name}
              className={styles.placeImage}
            />
            <h3 className={styles.placeName}>{place.title}</h3>
          </div>
        ))}
      </Slider>
      : <p>No hay lugares cercanos</p>
}
    </section>
  );
};

export default NearbyPlaces;
