import React, { useEffect, useRef, useState } from 'react';
import styles from "./ItineraryMap.module.css";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Marker, PlaceHolderImg1 } from '../../common/Images';

const ItineraryMap = ({ geoLocations, places }) => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false); // State to track if the map is loaded
    const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;

    useEffect(() => {
        const loader = new Loader({
            apiKey: apiKey,
            version: "weekly",
            libraries: ["marker"],
        });

        loader.load().then(() => {
            const google = window.google;
            const mapInstance = new google.maps.Map(mapContainerRef.current, {
                center: { lat: 0, lng: 0 },
                zoom: 2,
                mapId: mapId,
                fullscreenControl: false,
            });

            setMap(mapInstance);
            setMapLoaded(true); // Set mapLoaded to true once the map is loaded

            if (geoLocations.length > 0) {
                const markers = geoLocations
                    .filter(location => location.address?.latitude !== 0 && location.address?.longitude !== 0)
                    .map(location => {
                        const customContent = document.createElement("div");
                        customContent.innerHTML = `
                            <img src="${Marker}" alt="Marker" style="width: 40px; height: 40px;" />
                        `;

                        const marker = new google.maps.marker.AdvancedMarkerElement({
                            position: { lat: location.address.latitude, lng: location.address.longitude },
                            map: mapInstance,
                            content: customContent,
                        });

                        // Focus place card on marker click
                        marker.addListener("click", () => {
                            const matchedPlace = places.find(place =>
                                place.address?.latitude === location.address.latitude &&
                                place.address?.longitude === location.address.longitude
                            );

                            if (matchedPlace) {
                                // You can add additional logic here to handle the place card focus
                                ;
                            }
                        });

                        return marker;
                    });

                // Add marker clustering
                new MarkerClusterer({ map: mapInstance, markers });
            }
        }).catch((error) => {
            console.error("Failed to load Google Maps:", error);
            setMapLoaded(false); // Set mapLoaded to false if the map fails to load
        });
    }, [geoLocations, apiKey, places]);

    return (
        <div className={styles.itenaryMapFrame}>
            {mapLoaded ? (
                <div
                    ref={mapContainerRef}
                    style={{ width: '100%', height: '100%' }}
                ></div>
            ) : (
                <img
                    src={PlaceHolderImg1}
                    alt="Placeholder"
                    className={styles.placeholderImage}
                />
            )}
        </div>
    );
};

export default ItineraryMap;