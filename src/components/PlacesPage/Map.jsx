import React, { useEffect, useRef, useState } from 'react';
import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";

const Map = ({ onOpenPopup }) => {
    const { geoLocations } = useSelector((state) => state.places);
    const mapContainerRef = useRef(null);
    const [pins, setPins] = useState([]);

    useEffect(() => {
        const calculatePinPosition = (lat, lng) => {
            const mapWidth = mapContainerRef.current.offsetWidth;
            const mapHeight = 400; // Height of the iframe

            // Convert latitude and longitude to pixel values
            const x = ((lng + 180) * (mapWidth / 360));
            const y = ((90 - lat) * (mapHeight / 180));

            return { x, y };
        };

        const newPins = geoLocations
            .filter(location => location.address.latitude !== 0 && location.address.longitude !== 0)
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
        <div className={styles.mapContainer} ref={mapContainerRef}>
            <div className={styles.mapFrame}>
                <iframe
                    src="https://www.google.com/maps/embed?..."
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
                {/* {pins.map(pin => (
                    <img
                        key={pin.id}
                        src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/df11d3e639a6734868b974ac4877f86bc7a88fb56257cdfa7b7842afa8e6a10c?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                        alt="Map Pin"
                        className={styles.mapPin}
                        style={{
                            position: 'absolute',
                            left: `${pin.x}px`,
                            top: `${pin.y}px`,
                            transform: 'translate(-50%, -100%)', // Adjust to center the pin
                        }}
                    />
                ))} */}
            </div>
            <button className={styles.viewMapButton} onClick={onOpenPopup}>Ver mapa</button>
        </div>
    );
};

export default Map;