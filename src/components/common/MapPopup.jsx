import React, { useEffect, useRef, useState } from 'react';
import Filter from "../PlacesPage/Filter";
import styles2 from "./MapPopup.module.css";
import PlaceCard from './PlaceCard';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Marker } from './Images'; // Ensure this is the correct path to your custom marker image
import { MapPlaceHolderImage } from './Images';
import { useLocation } from 'react-router-dom';

const MapPopup = ({ onClose, categories = {}, ratings = {}, state, setState }) => {
    const { t } = useTranslation('Places');
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { places, geoLocations } = useSelector((state) => state.places);
    const { events } = useSelector((state) => state.eventsByCity);

    const location = useLocation();
    const isEventsRoute = location.pathname === '/places/events';

    const mapContainerRef = useRef(null);
    const placeRefs = useRef({});
    const [map, setMap] = useState(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;

    const dataToMap = isEventsRoute ? events : places;
    const geoDataToMap = isEventsRoute ? events : geoLocations;

    useEffect(() => {
        window.gm_authFailure = () => {
            console.error("Google Maps authentication failed. Please check your API key and restrictions.");
            setIsMapLoaded(false); // Show the placeholder image
        };

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
            setIsMapLoaded(true);

            if (geoDataToMap.length > 0) {
                const markers = geoDataToMap
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

                        marker.addListener("click", () => {
                            const matchedPlace = dataToMap.find(place =>
                                place.address?.latitude === location.address.latitude &&
                                place.address?.longitude === location.address.longitude
                            );

                            if (matchedPlace && placeRefs.current[matchedPlace.id]) {
                                placeRefs.current[matchedPlace.id].scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                });
                            }

                            const lat = location.address.latitude;
                            const lng = location.address.longitude;
                            setState(prevState => ({
                                ...prevState,
                                latAndLng: `${lat},${lng}`,
                            }));
                        });

                        return marker;
                    });

                new MarkerClusterer({ map: mapInstance, markers });
            }
        }).catch((error) => {
            console.error("Failed to load the map:", error);
            setIsMapLoaded(false);
        });
    }, [geoDataToMap, apiKey, dataToMap]);

    return (
        <div className={styles2.popupOverlay}>
            <div className={styles2.popupContent}>
                <div className={styles2.mapPopupWrapper}>
                    {categories.length > 0 && ratings.length > 0 && (
                        <div className={styles2.mapPopupFilter}>
                            <Filter categories={categories} ratings={ratings} state={state} setState={setState} />
                        </div>
                    )}
                    <div className={styles2.mapPopupMapArea}>
                        {!isMapLoaded && 
                            <>
                            <div className={styles2.mapFrame} >
                            <img
                                src={MapPlaceHolderImage}
                                alt="Map Placeholder"
                                className={styles2.mapPlaceholder}
                            />
                            </div>
                            </>
                        }
                        <div
                            ref={mapContainerRef}
                            className={styles2.mapFrame}
                            style={{ width: '100%', display: isMapLoaded ? 'block' : 'none' }}
                        ></div>
                        <div className={styles2.mapPopupPlaces}>
                            {dataToMap?.length > 0 ? (
                                dataToMap.map((item, index) => (
                                    <PlaceCard
                                        key={item.id || index}
                                        place={item}
                                        translate={t}
                                        isAuthenticated={isAuthenticated}
                                        isPopup={true}
                                        ref={(el) => {
                                            if (el) {
                                                placeRefs.current[item.id] = el;
                                            }
                                        }}
                                    />
                                ))
                            ) : (
                                <div className={styles2.noDataFound}>
                                    No data found
                                </div>
                            )}
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