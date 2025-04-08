import React, { useEffect, useRef, useState } from 'react';
import Filter from "../PlacesPage/Filter";
import styles2 from "./MapPopup.module.css";
import PlaceCard from './PlaceCard';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Marker, MarkerYellow } from './Images'; // Both marker images imported
import { MapPlaceHolderImage } from './Images';
import { useLocation } from 'react-router-dom';
import { set } from 'lodash';
import PageLoader from "../../components/common/Loader";

const MapPopup = ({ onClose, categories = {}, ratings = {}, state, setState, handleActions }) => {
    const { t } = useTranslation('Places');
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { loading, places, geoLocations, isFavoriteToggling, favTogglingId } = useSelector((state) => state.places);
    const { events } = useSelector((state) => state.eventsByCity);
    const { loading: eventsLoading, events: EventsList } = useSelector((state) => state.events);

    const location = useLocation();
    const isEventsRoute = location.pathname.includes('events');
    const isDetailsRoute = location.pathname === '/places/details';

    const mapContainerRef = useRef(null);
    const placeRefs = useRef({});
    const [map, setMap] = useState(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [markers, setMarkers] = useState([]);
    const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID;

    const dataToMap = isEventsRoute ? events || EventsList : places;
    const geoDataToMap = geoLocations;

    const createPolygon = (mapInstance, center) => {
        const polygonCoords = [
            { lat: center.lat + 0.01, lng: center.lng - 0.01 },
            { lat: center.lat + 0.01, lng: center.lng + 0.01 },
            { lat: center.lat - 0.01, lng: center.lng + 0.01 },
            { lat: center.lat - 0.01, lng: center.lng - 0.01 },
        ];

        new window.google.maps.Polygon({
            paths: polygonCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: mapInstance,
        });

        const pointsQueryString = polygonCoords
            .map(coord => `points=${coord.lat},${coord.lng}`)
            .join('&');
        
        setState(prevState => ({
            ...prevState,
            points: pointsQueryString
        }));
    };

    const resetMarkerColors = () => {
        markers.forEach(marker => {
            const defaultContent = document.createElement("div");
            defaultContent.innerHTML = `
                <img src="${Marker}" alt="Marker" style="width: 40px; height: 40px;" />
            `;
            marker.content = defaultContent;
        });
    };

    const handleMarkerClick = (marker, location, mapInstance) => {
        // Reset all markers to default color
        resetMarkerColors();
        
        // Change clicked marker to yellow
        const yellowContent = document.createElement("div");
        yellowContent.innerHTML = `
            <img src="${MarkerYellow}" alt="Marker" style="width: 40px; height: 40px;" />
        `;
        marker.content = yellowContent;
        setActiveMarker(marker);

        // Zoom to marker position (15 is the zoom level)
        mapInstance.setCenter(marker.position);
        mapInstance.setZoom(15);

        // Find and scroll to corresponding place card
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

        // Update state with clicked location
        const lat = location.address.latitude;
        const lng = location.address.longitude;
        setState(prevState => ({
            ...prevState,
            latAndLng: `${lat},${lng}`,
        }));

        // Create polygon around the marker
        createPolygon(mapInstance, { lat, lng });
    };

    useEffect(() => {
        window.gm_authFailure = () => {
            console.error("Google Maps authentication failed. Please check your API key and restrictions.");
            setIsMapLoaded(false);
        };

        const loader = new Loader({
            apiKey: apiKey,
            version: "weekly",
            libraries: ["maps", "marker", "core", "geometry"],
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

            if (isDetailsRoute && state?.latitude && state?.longitude) {
                // For details page, show only one marker
                const defaultContent = document.createElement("div");
                defaultContent.innerHTML = `
                    <img src="${MarkerYellow}" alt="Marker" style="width: 40px; height: 40px;" />
                `;

                const marker = new google.maps.marker.AdvancedMarkerElement({
                    position: { lat: state.latitude, lng: state.longitude },
                    map: mapInstance,
                    content: defaultContent,
                });

                setMarkers([marker]);
                mapInstance.setCenter(marker.position);
                mapInstance.setZoom(5);
            } else if (geoDataToMap.length > 0) {
                // For other pages, show all markers
                const newMarkers = geoDataToMap
                    .filter(location => location.address?.latitude !== 0 && location.address?.longitude !== 0)
                    .map(location => {
                        const defaultContent = document.createElement("div");
                        defaultContent.innerHTML = `
                            <img src="${Marker}" alt="Marker" style="width: 40px; height: 40px;" />
                        `;

                        const marker = new google.maps.marker.AdvancedMarkerElement({
                            position: { lat: location.address.latitude, lng: location.address.longitude },
                            map: mapInstance,
                            content: defaultContent,
                        });

                        marker.addListener("click", () => {
                            handleMarkerClick(marker, location, mapInstance);
                        });

                        return marker;
                    });

                setMarkers(newMarkers);
                new MarkerClusterer({ map: mapInstance, markers: newMarkers });
            }
        }).catch((error) => {
            console.error("Failed to load the map:", error);
            setIsMapLoaded(false);
        });

        return () => {
            // Cleanup markers when component unmounts
            setMarkers([]);
            setActiveMarker(null);
        };
    }, [geoDataToMap, apiKey, isDetailsRoute, state?.latitude, state?.longitude]);

    return (
        <div className={styles2.popupOverlay}>
            <div className={styles2.popupContent}>
                <div className={styles2.mapPopupWrapper}>
                    {!isDetailsRoute && categories.length > 0 && ratings.length > 0 && (
                        <div className={styles2.mapPopupFilter}>
                            <Filter categories={categories} ratings={ratings} state={state} setState={setState} />
                        </div>
                    )}
                    <div className={styles2.mapPopupMapArea}>
                        {loading &&
                        <div className="loaderOverlay">
                            <div className="loaderBtnWrapper">
                                <PageLoader /> 
                            </div>
                        </div>
                        }
                        {!isMapLoaded && 
                            <div className={styles2.mapFrame}>
                                <img
                                    src={MapPlaceHolderImage}
                                    alt="Map Placeholder"
                                    className={styles2.mapPlaceholder}
                                />
                            </div>
                        }
                        <div
                            ref={mapContainerRef}
                            className={styles2.mapFrame}
                            style={{ width: '100%', display: isMapLoaded ? 'block' : 'none' }}
                        />
                        {!isDetailsRoute && (
                            <div className={styles2.mapPopupPlaces}>
                                {dataToMap?.length > 0 ? (
                                    dataToMap.map((item, index) => (
                                        <PlaceCard
                                            key={item.id || index}
                                            place={item}
                                            translate={t}
                                            isAuthenticated={isAuthenticated}
                                            isPopup={true}
                                            handleActions={handleActions}
                                            isFavoriteToggling={isFavoriteToggling && favTogglingId === item.id}
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
                        )}
                    </div>
                </div>
                <button
                    className={`${styles2.popupcloseButton} ${styles2.closeButtonMd}`}
                    onClick={onClose}
                />
            </div>
            <button
                className={`${styles2.popupcloseButton} ${styles2.closeButtonSm}`}
                onClick={onClose}
            />
        </div>
    );
};

export default MapPopup;