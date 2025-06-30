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

    const isPlacesDetailsPage = location.pathname.includes('/places/details');
    const isEventsDetailsPage = location.pathname === '/events/details';

useEffect(() => {
    const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
        libraries: ["maps", "marker", "core", "geometry"],
    });

    loader.load().then(() => {
        const google = window.google;

        // Initialize the map with a reasonable default
        const mapInstance = new google.maps.Map(mapContainerRef.current, {
            center: { lat: 0, lng: 0 },
            zoom: 2,
            mapId: mapId,
            fullscreenControl: false,
        });

        setMap(mapInstance);

        const bounds = new google.maps.LatLngBounds();
        let markers = [];

        if (place?.address?.latitude && place?.address?.longitude) {
            // Place marker for the single location
            const position = {
                lat: place.address.latitude,
                lng: place.address.longitude,
            };

            const marker = new google.maps.Marker({
                position,
                map: mapInstance,
            });

            bounds.extend(position);
            mapInstance.setCenter(position);
            mapInstance.setZoom(15); // Set zoom level for better focus
        } else if (geoLocations.length > 0) {
            // Handle multiple geo locations
            const validLocations = geoLocations.filter(
                (loc) => loc?.address?.latitude && loc?.address?.longitude
            );

            if (validLocations.length === 0) {
                console.error('No valid geolocations found');
                return;
            }

            const markers = validLocations.map((location) => {
                const position = {
                    lat: location.address.latitude,
                    lng: location.address.longitude,
                };

                bounds.extend(position);

                return new google.maps.Marker({
                    position,
                    map: mapInstance,
                });
            });

            // Fit map bounds dynamically to the geolocations
            mapInstance.fitBounds(bounds);

            // Apply clustering to markers for better visualization
            new MarkerClusterer({ map: mapInstance, markers, gridSize: 50 });
        } else {
            console.warn('GeoLocations are empty, showing default map.');
            // Optionally alert the user or display a message about no locations
        }
    });
}, [geoLocations, apiKey, place]);

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
