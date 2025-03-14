import React from "react";
import CommonSection from "../common/CommonSection";
import styles from "./PlacesSection.module.css";
import { PlaceHolderImg2 } from "../common/Images";
import { useTranslation } from "react-i18next";

const PlacesSection = ({ places = [] }) => {

  const { t } = useTranslation("PlacesSection");

  const renderPlace = (place) => (
    <div key={place.id} className={styles.placeCard}>
      <img
        src={place.images[0] ? place.images[0]?.original : PlaceHolderImg2}
        alt={place.display_text}
        className={styles.placeImage}
      />
      <p className={styles.placeName}>{place.display_text}</p>
    </div>
  );

  return (
    <CommonSection
      title={t("title")}
      subtitle={t("subtitle")}
      seeMoreLink="#more-places"
      items={places}
      renderItem={renderPlace}
      isCarousel={places.length > 0 ? true : false}
    />
  );
};

export default PlacesSection;