import React from "react";
import styles from "./EventList.module.css";
import EventCard from "../common/EventCard";
import { useSelector } from "react-redux";
import EventCardSkeleton from "../skeleton/PlacesPage/PlacesInfo/events/EventCardSkeleton";
import GoToFilterCard from "../common/GoToFilterCard";

const EventList = ({ events, handleActions, handleActionFilter }) => {
  const { loading, isFavoriteToggling, favTogglingId } = useSelector((state) => state.events);

  if (loading) {
    return (
      <div className={styles.eventList}>
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Process the events array to insert GoToFilterCard every 10 items
  const renderEventsWithFilterCards = () => {
    const result = [];
    const chunkSize = 10;
    
    for (let i = 0; i < events.length; i += chunkSize) {
      const chunk = events.slice(i, i + chunkSize);
      
      // Add event cards for this chunk
      result.push(
        ...chunk.map((event, index) => (
          <EventCard
            key={`event-${i + index}`}
            event={event}
            handleActions={handleActions}
            isFavoriteToggling={isFavoriteToggling && favTogglingId === event.id}
          />
        ))
      );
      
      // Add GoToFilterCard after each chunk (except after the last one)
      if (i + chunkSize < events.length) {
        result.push(
          <GoToFilterCard 
            key={`filter-${i / chunkSize}`} 
            index={i / chunkSize} 
            handleActionFilter={handleActionFilter} 
          />
        );
      }
    }
    
    return result;
  };

  return (
    <div className={styles.eventList}>
      {renderEventsWithFilterCards()}
    </div>
  );
};

export default EventList;