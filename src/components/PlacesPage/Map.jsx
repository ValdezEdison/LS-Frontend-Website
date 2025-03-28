import React, { useEffect, useRef, useState } from 'react';
import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";


const Map = ({ onOpenPopup }) => {
    const { geoLocations } = useSelector((state) => state.places);
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;


    useEffect(() => {
        const loader = new Loader({
            apiKey: apiKey,
            version: "weekly",
            libraries: ["marker"] // Load the marker library
        });

        loader.load().then(() => {
            const google = window.google;
            const mapInstance = new google.maps.Map(mapContainerRef.current, {
                center: { lat: 0, lng: 0 },
                zoom: 2,
                mapId: mapId,
                fullscreenControl: false
            });

            setMap(mapInstance);

            // Create markers with AdvancedMarkerElement
            if (geoLocations.length > 0) {
                const markers = geoLocations.filter(location => location.address.latitude !== 0 && location.address.longitude !== 0)
                    .map(location => {
                        const markerElement = document.createElement('div');
                        markerElement.className = styles.marker;
                        markerElement.innerText = '';

                        return new google.maps.marker.AdvancedMarkerElement({
                            position: { lat: location.address.latitude, lng: location.address.longitude },
                            map: mapInstance,
                            content: markerElement,
                        });
                    });

                // Add marker clustering
                new MarkerClusterer({ map: mapInstance, markers });
            }
        });
    }, [geoLocations, apiKey]);

    return (
        <div className={styles.mapContainer} onClick={onOpenPopup}>
            <div ref={mapContainerRef} className={styles.mapFrame} style={{height: '157px', width: '100%' }}></div>
            <button className={styles.viewMapButton} >Ver mapa</button>
        </div>
    );
};

export default Map;
