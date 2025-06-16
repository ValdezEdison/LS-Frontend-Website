import React, { useEffect, useRef, useState } from 'react';
import Filter from "../PlacesPage/Filter";
import styles2 from "./MapPopup.module.css";
import PlaceCard from './PlaceCard';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Marker, MarkerYellow } from './Images';
import { MapPlaceHolderImage } from './Images';
import { useLocation } from 'react-router-dom';
import PageLoader from "../../components/common/Loader";
import { getGoogleMapsApiKey, getGoogleMapsMapId } from '../../utils/decryptSecrets';

const MapPopup = ({ onClose, categories = {}, ratings = {}, state, setState, handleActions }) => {
    const { t } = useTranslation('Places');
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { loading, NearbyPlaces, places, geoLocations } = useSelector((state) => state.places);
    const { events } = useSelector((state) => state.eventsByCity);
    const { loading: eventsLoading, events: EventsList } = useSelector((state) => state.events);
    const { suggestedPlaces, loading: suggestedPlacesLoading } = useSelector((state) => state.suggestions);
    const { loading: placesLoading, placesList } = useSelector((state) => state.placesInCity);
    const { isFavoriteToggling, favTogglingId } = useSelector((state) => state.favorites);

    const location = useLocation();
    const isEventsRoute = location.pathname === '/places/events';
    const isDetailsRoute = location.pathname.includes('/details');
    const isPlacesDetailsPage = location.pathname === '/places/details';
    const isEventDetailsPage = location.pathname === '/events/details';
    const isPlacesPage = location.pathname === '/places';
    const isDestinationEvents = location.pathname === '/places/events';
    const isDestinationPlaces = location.pathname === '/places/destination-places';
    const isEventsPage = location.pathname === '/events';

    const mapContainerRef = useRef(null);
    const placeRefs = useRef({});
    const hoverCardRef = useRef(null);
    const [map, setMap] = useState(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const [hoveredPlace, setHoveredPlace] = useState(null);
    const [hoverCardPosition, setHoverCardPosition] = useState({ x: 0, y: 0 });
    const [showHoverCard, setShowHoverCard] = useState(false);
    const hoverTimeoutRef = useRef(null);

    const apiKey = getGoogleMapsApiKey();
    const mapId = getGoogleMapsMapId();

    const placesToUse = isPlacesPage ? places : 
                       isPlacesDetailsPage || isEventDetailsPage ? NearbyPlaces : 
                       isDestinationEvents ? events : 
                       isDestinationPlaces ? placesList : 
                       isEventsPage ? EventsList : 
                       suggestedPlaces;

    const dataToMap = placesToUse || [];
    const geoDataToMap = geoLocations || [];

    const createPolygon = (mapInstance, center) => {
        if (!center || !mapInstance) return;

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
            points: pointsQueryString,
            latitude: center.lat,
            longitude: center.lng
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

const handleMarkerHover = (marker, location, event) => {
    if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
    }

    const matchedPlace = dataToMap.find(place => 
        place.address?.latitude === location.address?.latitude &&
        place.address?.longitude === location.address?.longitude
    );

    if (matchedPlace && map) {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredPlace(matchedPlace);
            
            // Create a temporary overlay for coordinate conversion
            const overlay = new window.google.maps.OverlayView();
            overlay.onAdd = function() {};
            overlay.onRemove = function() {};
            overlay.draw = function() {};
            overlay.setMap(map);
            
            // Wait for the overlay to be ready
            setTimeout(() => {
                if (overlay.getProjection()) {
                    const point = overlay.getProjection().fromLatLngToContainerPixel(
                        new window.google.maps.LatLng(marker.position.lat, marker.position.lng)
                    );
                    
                    const mapRect = mapContainerRef.current.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                    
                    setHoverCardPosition({
                        x: point.x + mapRect.left + scrollLeft,
                        y: point.y + mapRect.top + scrollTop - 180
                    });
                    
                    setShowHoverCard(true);
                }
                overlay.setMap(null); // Clean up
            }, 50);
            
            // Highlight the hovered marker
            const yellowContent = document.createElement("div");
            yellowContent.innerHTML = `
                <img src="${MarkerYellow}" alt="Marker" style="width: 40px; height: 40px;" />
            `;
            marker.content = yellowContent;
        }, 200);
    }
};

    const handleMarkerHoverEnd = (marker) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        
        setShowHoverCard(false);
        setHoveredPlace(null);
        
        // Only reset marker color if it's not the active/selected marker
        if (marker !== activeMarker) {
            const defaultContent = document.createElement("div");
            defaultContent.innerHTML = `
                <img src="${Marker}" alt="Marker" style="width: 40px; height: 40px;" />
            `;
            marker.content = defaultContent;
        }
    };

    const handleMarkerClick = (marker, location, mapInstance) => {
        if (!marker || !location || !mapInstance) return;

        resetMarkerColors();
        
        const yellowContent = document.createElement("div");
        yellowContent.innerHTML = `
            <img src="${MarkerYellow}" alt="Marker" style="width: 40px; height: 40px;" />
        `;
        marker.content = yellowContent;
        setActiveMarker(marker);

        mapInstance.setCenter(marker.position);
        mapInstance.setZoom(15);

        const matchedPlace = dataToMap.find(place => 
            place.address?.latitude === location.address?.latitude &&
            place.address?.longitude === location.address?.longitude
        );

        if (matchedPlace) {
            setSelectedPlaceId(matchedPlace.id);
            if (placeRefs.current[matchedPlace.id]) {
                placeRefs.current[matchedPlace.id].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }
        }

        const lat = location.address?.latitude;
        const lng = location.address?.longitude;
        
        if (lat && lng) {
            setState(prevState => ({
                ...prevState,
                latAndLng: `${lat},${lng}`,
                latitude: lat,
                longitude: lng
            }));
            createPolygon(mapInstance, { lat, lng });
        }
    };
    

    const handlePlaceCardHover = (place) => {
        if (!map || !place?.id) return;
        
        // Find and highlight corresponding marker
        const correspondingMarker = markers.find(marker => 
            marker.position.lat === place.address?.latitude && 
            marker.position.lng === place.address?.longitude
        );

        if (correspondingMarker) {
            const yellowContent = document.createElement("div");
            yellowContent.innerHTML = `
                <img src="${MarkerYellow}" alt="Marker" style="width: 40px; height: 40px;" />
            `;
            correspondingMarker.content = yellowContent;
        }
    };

    const handlePlaceCardHoverEnd = () => {
        if (selectedPlaceId) {
            // Only reset if not the selected marker
            const selectedPlace = dataToMap.find(p => p.id === selectedPlaceId);
            if (selectedPlace) {
                const marker = markers.find(m => 
                    m.position.lat === selectedPlace.address?.latitude &&
                    m.position.lng === selectedPlace.address?.longitude
                );
                if (marker && marker === activeMarker) {
                    const yellowContent = document.createElement("div");
                    yellowContent.innerHTML = `
                        <img src="${MarkerYellow}" alt="Marker" style="width: 40px; height: 40px;" />
                    `;
                    marker.content = yellowContent;
                }
            }
        } else {
            resetMarkerColors();
        }
    };

    const handlePlaceCardClick = (place) => {
        if (!map || !place?.address?.latitude || !place?.address?.longitude) return;

        const correspondingMarker = markers.find(marker => 
            marker.position.lat === place.address.latitude && 
            marker.position.lng === place.address.longitude
        );

        if (correspondingMarker) {
            handleMarkerClick(correspondingMarker, place, map);
        }
    };

    useEffect(() => {
        if (!map || !isMapLoaded || markers.length === 0) return;

        if (selectedPlaceId && placeRefs.current[selectedPlaceId]) {
            const selectedPlace = dataToMap.find(p => p.id === selectedPlaceId);
            if (selectedPlace) {
                const marker = markers.find(m => 
                    m.position.lat === selectedPlace.address?.latitude &&
                    m.position.lng === selectedPlace.address?.longitude
                );
                if (marker) {
                    const yellowContent = document.createElement("div");
                    yellowContent.innerHTML = `
                        <img src="${MarkerYellow}" alt="Marker" style="width: 40px; height: 40px;" />
                    `;
                    marker.content = yellowContent;
                    setActiveMarker(marker);
                }
            }
        }
    }, [geoDataToMap, markers, selectedPlaceId]);

    useEffect(() => {
        window.gm_authFailure = () => {
            setIsMapLoaded(false);
        };

        const loader = new Loader({
            apiKey: apiKey,
            version: "weekly",
            libraries: ["maps", "marker", "core", "geometry"],
        });

        loader.load().then(() => {
            const google = window.google;

            let initialCenter = { lat: 0, lng: 0 };
            let initialZoom = 2;

            if (isDetailsRoute && state?.latitude && state?.longitude) {
                initialCenter = { lat: state.latitude, lng: state.longitude };
                initialZoom = 15;
            } 
            else if (geoDataToMap.length > 0) {
                const bounds = new google.maps.LatLngBounds();
                let hasValidLocations = false;

                geoDataToMap.forEach(location => {
                    if (location.address?.latitude && location.address?.longitude) {
                        bounds.extend({
                            lat: location.address.latitude,
                            lng: location.address.longitude
                        });
                        hasValidLocations = true;
                    }
                });

                if (hasValidLocations) {
                    initialCenter = bounds.getCenter();
                    initialZoom = geoDataToMap.length === 1 ? 15 : 12;
                }
            }

            const mapInstance = new google.maps.Map(mapContainerRef.current, {
                center: initialCenter,
                zoom: initialZoom,
                mapId: mapId,
                fullscreenControl: false,
            });

            setMap(mapInstance);
            setIsMapLoaded(true);

            if (isDetailsRoute && state?.latitude && state?.longitude) {
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
                mapInstance.setZoom(15);
                setSelectedPlaceId(state.id);
            } 
            else if (geoDataToMap.length > 0) {
                const newMarkers = geoDataToMap
                    .filter(location => location.address?.latitude && location.address?.longitude)
                    .map(location => {
                        const defaultContent = document.createElement("div");
                        defaultContent.innerHTML = `
                            <img src="${Marker}" alt="Marker" style="width: 40px; height: 40px;" />
                        `;

                        const marker = new google.maps.marker.AdvancedMarkerElement({
                            position: { 
                                lat: location.address.latitude, 
                                lng: location.address.longitude 
                            },
                            map: mapInstance,
                            content: defaultContent,
                        });

                        marker.addListener("click", () => {
                            handleMarkerClick(marker, location, mapInstance);
                        });

                        marker.addListener("mouseover", (event) => {
                            handleMarkerHover(marker, location, event);
                        });

                        marker.addListener("mouseout", () => {
                            handleMarkerHoverEnd(marker);
                        });

                        return marker;
                    });

                setMarkers(newMarkers);

                if (newMarkers.length > 0) {
                    const bounds = new google.maps.LatLngBounds();
                    newMarkers.forEach(marker => bounds.extend(marker.position));
                    
                    if (newMarkers.length === 1) {
                        mapInstance.setCenter(newMarkers[0].position);
                        mapInstance.setZoom(15);
                        handleMarkerClick(newMarkers[0], geoDataToMap[0], mapInstance);
                    } else {
                        mapInstance.fitBounds(bounds, { padding: 50 });
                    }
                }

                if (newMarkers.length > 1) {
                    new MarkerClusterer({ map: mapInstance, markers: newMarkers });
                }
            }
        }).catch((error) => {
            console.error("Google Maps API error:", error);
            setIsMapLoaded(false);
        });

        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
            setMarkers([]);
            setActiveMarker(null);
        };
    }, [geoDataToMap, apiKey, isDetailsRoute, state?.latitude, state?.longitude]);

    const HoverCard = () => {
        if (!showHoverCard || !hoveredPlace) return null;

        return (
            <div 
                className={styles2.hoverCard}
                style={{
                    position: 'absolute',
                    left: `${hoverCardPosition.x}px`,
                    top: `${hoverCardPosition.y}px`,
                    zIndex: 1000,
                    pointerEvents: 'none',
                    transform: 'translateX(-50%)'
                }}
            >
                <PlaceCard
                    place={hoveredPlace}
                    translate={t}
                    isAuthenticated={isAuthenticated}
                    isPopup={true}
                    isHoverCard={true}
                />
            </div>
        );
    };


    const handleViewMoreDetails = (e, id) => {
        handleActions(e, 'viewMore', id);
    };

    return (
        <div className={styles2.popupOverlay}>
            <div className={styles2.popupContent}>
                <div className={styles2.mapPopupWrapper}>
                    {!isDetailsRoute && categories?.length > 0 && ratings?.length > 0 && (
                        <div className={styles2.mapPopupFilter}>
                            <Filter categories={categories} ratings={ratings} state={state} setState={setState} />
                        </div>
                    )}
                    <div className={styles2.mapPopupMapArea}>
                        {loading && (
                            <div className="loaderOverlay">
                                <div className="loaderBtnWrapper">
                                    <PageLoader /> 
                                </div>
                            </div>
                        )}
                        {!isMapLoaded && (
                            <div className={styles2.mapFrame}>
                                <img
                                    src={MapPlaceHolderImage}
                                    alt="Map Placeholder"
                                    className={styles2.mapPlaceholder}
                                />
                            </div>
                        )}
                        
                        <div
                            ref={mapContainerRef}
                            className={styles2.mapFrame}
                            style={{ width: '100%', display: isMapLoaded ? 'block' : 'none' }}
                        />
                        <HoverCard />
                        {showHoverCard && hoveredPlace && (
                            <div 
                                ref={hoverCardRef}
                                className={styles2.hoverCard}
                                style={{
                                    position: 'fixed',
                                    left: `${hoverCardPosition.x}px`,
                                    top: `${hoverCardPosition.y}px`,
                                    zIndex: 1000,
                                    pointerEvents: 'none'
                                }}
                            >
                                <PlaceCard
                                    place={hoveredPlace}
                                    translate={t}
                                    isAuthenticated={isAuthenticated}
                                    isPopup={true}
                                    isHoverCard={true}
                                />
                            </div>
                        )}
                        <div className={styles2.mapPopupPlaces}>
                            {dataToMap?.length > 0 ? (
                                dataToMap.map((item, index) => (
                                    <div 
                                        key={item.id || index}
                                        ref={(el) => placeRefs.current[item.id] = el}
                                        onClick={() => handlePlaceCardClick(item)}
                                        onMouseEnter={() => handlePlaceCardHover(item)}
                                        onMouseLeave={handlePlaceCardHoverEnd}
                                        className={selectedPlaceId === item.id ? styles2.selectedPlaceCard : ''}
                                    >
                                        <PlaceCard
                                            place={item}
                                            translate={t}
                                            isAuthenticated={isAuthenticated}
                                            isPopup={true}
                                            handleViewMoreDetails={handleViewMoreDetails}
                                            handleActions={handleActions}
                                            isFavoriteToggling={isFavoriteToggling && favTogglingId === item.id}
                                        />
                                    </div>
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