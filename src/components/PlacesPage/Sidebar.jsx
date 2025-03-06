import React from "react";
import styles from "./Sidebar.module.css";
import Map from "./Map";
import Filter from "./Filter";
import { useState } from "react";
import MapPopup from "./MapPopup";

const Sidebar = () => {
  const categories = [
    "Alojamiento - Hotelería",
    "Arte y cultura",
    "Compras",
    "Emergencias",
    "Gastronomía",
    "Ocio y deporte",
    "Planificador de viajes y excursiones",
    "Salud y bienestar",
    "Servicios profesionales",
    "Vida nocturna",
  ];

  const ratings = [
    { label: "Excelente: 4 o más", value: 4 },
    { label: "Muy bueno: 3 o más", value: 3 },
    { label: "Bueno: 2 o más", value: 2 },
    { label: "Mejorable: menos de 2", value: 1 },
  ];

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <aside className={styles.sidebar}>
      {!showPopup && <Map onOpenPopup={handleOpenPopup} />}
      {showPopup && <MapPopup onClose={handleClosePopup} />}
      <Filter categories={categories} ratings={ratings}/>
    </aside>
  );
};

export default Sidebar;
