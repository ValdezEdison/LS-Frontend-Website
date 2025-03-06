import React, { useEffect, useRef, useState } from 'react';
import styles from "./Sidebar.module.css";
import Filter from "./Filter";
import styles2 from "./MapPopup.module.css";
import PlaceCard from "./PlaceCard";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";

const MapPopup = ({ onClose }) => {
    const { t } = useTranslation('Places');
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { places, geoLocations } = useSelector((state) => state.places);

    const mapContainerRef = useRef(null);
    const [pins, setPins] = useState([]);

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

    useEffect(() => {
        const calculatePinPosition = (lat, lng) => {
            // Ensure the map container ref is assigned
            if (!mapContainerRef.current) {
                console.error("Map container ref is not assigned.");
                return { x: 0, y: 0 };
            }

            const mapWidth = mapContainerRef.current.offsetWidth;
            const mapHeight = mapContainerRef.current.offsetHeight;

            // Convert latitude and longitude to pixel values
            const x = ((lng + 180) * (mapWidth / 360));
            const y = ((90 - lat) * (mapHeight / 180));

            return { x, y };
        };

        const newPins = geoLocations
            .filter(location => location.address?.latitude !== 0 && location.address?.longitude !== 0)
            .map(location => {
                const { x, y } = calculatePinPosition(location.address.latitude, location.address.longitude);
                return {
                    id: location.id,
                    x,
                    y,
                };
            });

        setPins(newPins);
    }, [geoLocations]);

    return (
        <div className={styles2.popupOverlay}>
            <div className={styles2.popupContent}>
                <div className={styles2.mapPopupWrapper}>
                    <div className={styles2.mapPopupFilter}>
                        <Filter categories={categories} ratings={ratings} />
                    </div>
                    <div className={styles2.mapPopupMapArea} ref={mapContainerRef}>
                        <iframe
                            src="https://www.google.com/maps/embed?..."
                            width="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>

                        {/* {pins.map(pin => (
                            <img
                                key={pin.id}
                                src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/df11d3e639a6734868b974ac4877f86bc7a88fb56257cdfa7b7842afa8e6a10c?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                                alt="Map Pin"
                                className={styles2.mapPin}
                                style={{
                                    position: 'absolute',
                                    left: `${pin.x}px`,
                                    top: `${pin.y}px`,
                                    transform: 'translate(-50%, -100%)', // Adjust to center the pin
                                }}
                            />
                        ))} */}
                        <div className={styles2.mapPopupPlaces}>
                            {places?.map((place, index) => (
                                <PlaceCard key={index} place={place} translate={t} isAuthenticated={isAuthenticated} isPopup={true} />
                            ))}
                        </div>
                    </div>
                </div>
                <button className={styles2.popupcloseButton} onClick={onClose}></button>
            </div>
        </div>
    );
};

export default MapPopup;