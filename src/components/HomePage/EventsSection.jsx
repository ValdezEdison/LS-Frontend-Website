import React from "react";
import CommonSection from "./CommonSection";
import styles from "./PlacesSection.module.css";
import { PlaceHolderImg2 } from "../common/Images";
import { useTranslation } from "react-i18next";

const EventsSection = ({ events = [] }) => {
  console.log(events, 'events')
  const { t } = useTranslation("EventsSection");

  const renderEvent = (event) => (
    <div key={event.id} className={styles.placeCard}>
      <img
        src={event.images[0] ? event.images[0]?.original : PlaceHolderImg2}
        alt={event.name}
        className={styles.placeImage}
      />
      <p className={styles.placeName}>{event.title}</p>
    </div>
  );

  return (
    <CommonSection
      title={t("title")}
      subtitle={t("subtitle")}
      seeMoreLink="#more-events"
      items={events}
      renderItem={renderEvent}
      isCarousel={events.length > 0 ? true : false}
    />
  );
};

export default EventsSection;