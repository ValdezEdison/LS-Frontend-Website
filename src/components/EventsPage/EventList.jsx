import React from "react";
// import EventCard from "./EventCard";
import styles from "./EventList.module.css";
import EventCard from "../common/EventCard";

const events = [
  {
    id: 1,
    images:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/2298be0ce09f8e7215451f0a78387a6535d0e9d1?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    title: "Underdogs gallery",
    location: "Londres, United Kingdom",
    date: "Dom, 5 may, 19:00",
    category: "Exposiciones",
    levels: [{ id: 1, title: "Exposiciones" }],
  },
  {
    id: 2,
    images:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/e8d9475396034b3d313a6944659b0733845c63c5?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    title: "Concierto música clásica",
    location: "Roma, Italia",
    date: "Dom, 5 may, 19:00",
    category: "Concierto",
    levels: [{ id: 1, title: "Concierto" }],
  },
  {
    id: 3,
    images:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f2b8151dc488dee63ad1074ffbaaef9e935d9621?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    title: "Amnesia Ibiza",
    location: "Ibiza, Islas Baleares",
    date: "Dom, 5 may, 19:00",
    category: "Vida nocturna",
    levels: [{ id: 1, title: "Vida nocturna" }],
  },
  {
    id: 4,
    images:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1350380a609f589c211f9b3877d94cafc47a0c22?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    title: "Teatro Piccolo",
    location: "Milán, Italia",
    date: "Dom, 5 may, 19:00",
    category: "Obras de teatro",
    levels: [{ id: 1, title: "Obras de teatro" }],
  },
];

const EventList = () => {
  return (
    <div className={styles.eventList}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
