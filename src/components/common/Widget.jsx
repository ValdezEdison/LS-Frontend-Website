import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Widget.module.css";
import { PlaceHolderImg2 } from "./Images";
import { useTranslation } from "react-i18next";

const Widget = ({ data = [], title, count, handleNavActions, seeMore = true}) => {

  const { t } = useTranslation("Common");
  
;
  const settings = {
    // dots: true,
    infinite:  data.length > 4,
    speed: 500,
    slidesToShow: count,
    slidesToScroll: 1,
    arrows: data.length > 4,
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
        { data.length > 4 && seeMore &&
        <div className="seeMoreLink" onClick={(e) => handleNavActions(e, null, "viewList")}>{t('seeMore')}</div>
        }
      </div>
      
      {data.length > 0 ? 
      <Slider {...settings}>
        {data.map((place, index) => (
          <div key={index} className={styles.placeCard} onClick={(e) =>handleNavActions(e, place.id, "viewDetail")}>
            <img
              src={place.images[0] ? place.images[0]?.original : PlaceHolderImg2}
              alt={place.name}
              className={styles.placeImage}
            />
            <h3 className={styles.placeName}>{place.title}</h3>
          </div>
        ))}
      </Slider>
      : <p>{t('noResults')}</p>
}

    </section>
  );
};

export default Widget;
