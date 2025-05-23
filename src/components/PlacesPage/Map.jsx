import React, { useEffect, useRef, useState } from 'react';
import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useTranslation } from "react-i18next";
import { getGoogleMapsApiKey, getGoogleMapsMapId } from '../../utils/decryptSecrets';
import { useLocation } from 'react-router-dom';
import PageLoader from "../../components/common/Loader";

const Map = ({ onOpenPopup }) => {
    const { geoLocations, place, geoLocationsLoading } = useSelector((state) => state.places);
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const apiKey = getGoogleMapsApiKey();
    const mapId = getGoogleMapsMapId();
    const { t } = useTranslation('Common');
    const location = useLocation();

    const isPlacesDetailsPage = location.pathname === '/places/details';
    const isEventsDetailsPage = location.pathname === '/events/details';

    useEffect(() => {
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

            const bounds = new google.maps.LatLngBounds();
            let markers = [];

            // Use single marker if on place/event details page
            if ((isPlacesDetailsPage || isEventsDetailsPage) && place?.address?.latitude && place?.address?.longitude) {
                const markerElement = document.createElement('div');
                markerElement.className = styles.marker;
                markerElement.innerText = '';

                const position = {
                    lat: place.address.latitude,
                    lng: place.address.longitude
                };

                bounds.extend(position);

                const marker = new google.maps.marker.AdvancedMarkerElement({
                    position,
                    map: mapInstance,
                    content: markerElement,
                });

                markers.push(marker);
                mapInstance.setCenter(position);
                mapInstance.setZoom(10);
            } 
            // Otherwise, show clustered geoLocations
            else if (geoLocations.length > 0) {
                const validLocations = geoLocations.filter(loc =>
                    loc.address && loc.address.latitude && loc.address.longitude
                );

                markers = validLocations.map(location => {
                    const markerElement = document.createElement('div');
                    markerElement.className = styles.marker;
                    markerElement.innerText = '';

                    const position = {
                        lat: location.address.latitude,
                        lng: location.address.longitude
                    };

                    bounds.extend(position);

                    return new google.maps.marker.AdvancedMarkerElement({
                        position,
                        map: mapInstance,
                        content: markerElement,
                    });
                });

                mapInstance.fitBounds(bounds);
                new MarkerClusterer({ map: mapInstance, markers });
            }
        });
    }, [geoLocations, apiKey, place, isPlacesDetailsPage, isEventsDetailsPage]);

    return (
        <div className={styles.mapContainer}>
              {geoLocationsLoading &&
                <div className="loaderOverlay">
                    <div className="loaderBtnWrapper">
                        <PageLoader /> 
                    </div>
                </div>
                }
            <div
                ref={mapContainerRef}
                className={styles.mapFrame}
                style={{ height: '157px', width: '100%' }}
            ></div>
            <button className={styles.viewMapButton} onClick={onOpenPopup}>
                {t("seeMap")}
            </button>
        </div>
    );
};

export default Map;
