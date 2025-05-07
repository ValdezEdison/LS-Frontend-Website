import React from "react";
import CommonSection from "../common/CommonSection";
import styles from "./PlacesSection.module.css";
import { PlaceHolderImg2 } from "../common/Images";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EventsSection = ({ events = [] }) => {
    const { t } = useTranslation("EventsSection");

    const navigate = useNavigate();

  const renderEvent = (event) => (
    <div key={event.id} className={styles.placeCard}>
      <img
        src={event.images[0] ? event.images[0]?.original : PlaceHolderImg2}
        alt={event.name}
        className={styles.placeImage} onClick={() => handleNavigate(event)}
      />
      <p className={styles.placeName} onClick={() => handleNavigate(event)}>{event.title}</p>
    </div>
  );

  const handleNavigate = (place) => {
    if (place) {
      navigate(`/events/details`, { state: { id: place.id } });
    }else{
      navigate(`/events`);
    }
  };

  return (
    <CommonSection
      title={t("title")}
      subtitle={t("subtitle")}
      seeMoreLink={ () => handleNavigate()}
      items={events}
      renderItem={renderEvent}
      isCarousel={events.length > 0 ? true : false}
    />
  );
};

export default EventsSection;