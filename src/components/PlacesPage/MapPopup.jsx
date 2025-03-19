import React, { useEffect, useRef, useState } from 'react';
import styles from "./Sidebar.module.css";
import Filter from "./Filter";
import styles2 from "./MapPopup.module.css";
import PlaceCard from "./PlaceCard";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Marker } from '../common/Images'; // Ensure this is the correct path to your custom marker image
const MapPopup = ({ onClose, categories, ratings, state, setState }) => {
    const { t } = useTranslation('Places');
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { places, geoLocations } = useSelector((state) => state.places);

    const mapContainerRef = useRef(null);
    const placeRefs = useRef({}); // Store refs for each place card
    const [map, setMap] = useState(null);
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
                zoom: 10,
                mapId: mapId,
                fullscreenControl: false,
            });

            setMap(mapInstance);

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

                        // 🟠 Focus place card on marker click
                        marker.addListener("click", () => {
                            console.log("Marker clicked");
                            const matchedPlace = places.find(place =>
                                place.address?.latitude === location.address.latitude &&
                                place.address?.longitude === location.address.longitude
                            );

                            if (matchedPlace && placeRefs.current[matchedPlace.id]) {
                                placeRefs.current[matchedPlace.id].scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                });
                            }
                              // Update latAndLng state
                              const lat = location.address.latitude;
                              const lng = location.address.longitude;
                              setState(prevState => ({
                                  ...prevState,
                                  latAndLng: `${lat},${lng}`,
                              }));
                        });

                        return marker;
                    });

                // Add marker clustering
                new MarkerClusterer({ map: mapInstance, markers });
            }
        });
    }, [geoLocations, apiKey, places]);

    console.log(state, 'state in map popup');

    return (
        <div className={styles2.popupOverlay}>
            <div className={styles2.popupContent}>
                <div className={styles2.mapPopupWrapper}>
                    <div className={styles2.mapPopupFilter}>
                        <Filter categories={categories} ratings={ratings} state={state} setState={setState}/>
                    </div>
                    <div className={styles2.mapPopupMapArea}>
                        <div
                            ref={mapContainerRef}
                            className={styles2.mapFrame}
                            style={{ width: '100%' }}
                        ></div>
                        <div className={styles2.mapPopupPlaces}>
                            {places?.map((place, index) => (
                                <PlaceCard
                                    key={place.id || index}
                                    place={place}
                                    translate={t}
                                    isAuthenticated={isAuthenticated}
                                    isPopup={true}
                                    ref={(el) => placeRefs.current[place.id] = el} // 🟠 Set ref for each place
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    className={`${styles2.popupcloseButton} ${styles2.closeButtonMd}`}
                    onClick={onClose}
                ></button>
            </div>
            <button
                className={`${styles2.popupcloseButton} ${styles2.closeButtonSm}`}
                onClick={onClose}
            ></button>
        </div>
    );
};


export default MapPopup;