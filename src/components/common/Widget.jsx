import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Widget.module.css";
import { PlaceHolderImg2 } from "./Images";

const Widget = ({ data = [], title, count}) => {
  
;
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: count,
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
      <div className={styles.nearbyPlaceTitle}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className="seeMoreLink">See More</div>
      </div>
      
      {data.length > 0 ? 
      <Slider {...settings}>
        {data.map((place, index) => (
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

export default Widget;
