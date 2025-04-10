import React from "react";
// import EventCard from "./EventCard";
import styles from "./EventList.module.css";
import EventCard from "../common/EventCard";
import { useSelector } from "react-redux";
import EventCardSkeleton from "../skeleton/PlacesPage/PlacesInfo/events/EventCardSkeleton";



const EventList = ({ events, handleActions }) => {

  const { loading, isFavoriteToggling, favTogglingId } = useSelector((state) => state.events);

  return (
    <div className={styles.eventList}>
      {loading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))
      ) : (
        events?.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            handleActions={handleActions}
            isFavoriteToggling={
              isFavoriteToggling && favTogglingId === event.id
            }
          />
        ))
      )}
    </div>
  );
};

export default EventList;
