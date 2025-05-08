import React from "react";
import CommonSection from "../common/CommonSection";
import styles from "./PlacesSection.module.css";
import { PlaceHolderImg2 } from "../common/Images";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PlacesSection = ({ places = [] }) => {

  const { t } = useTranslation("PlacesSection");

  const navigate = useNavigate();

  const renderPlace = (place) => (
    <div key={place.id} className={styles.placeCard}>
      <img
        src={place.images[0] ? place.images[0]?.original : PlaceHolderImg2}
        alt={place.display_text}
        className={styles.placeImage}  onClick={() => handleNavigate(place)}
      />
      <p className={styles.placeName}  onClick={() => handleNavigate(place)}>{place.display_text || place?.title}</p>
    </div>
  );

  const handleNavigate = (place) => {
    if (place) {
      navigate(`/places/details`, { state: { id: place.id } });
    }else{
      navigate(`/places`);
    }
  };

  return (
    <CommonSection
      title={t("title")}
      subtitle={t("subtitle")}
      seeMoreLink={ () => handleNavigate()}
      items={places}
      renderItem={renderPlace}
      isCarousel={places.length > 0 ? true : false}
    />
  );
};

export default PlacesSection;