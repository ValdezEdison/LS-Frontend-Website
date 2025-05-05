import React, { useEffect, useRef, useState } from 'react';
import styles from "./ItineraryMap.module.css";
import { Loader } from "@googlemaps/js-api-loader";
import { PlaceHolderImg1 } from '../../common/Images';
import { getGoogleMapsApiKey, getGoogleMapsMapId } from '../../../utils/decryptSecrets';



const ItineraryMap = ({ places, formState, setFormState }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleModeChange = (mode) => {
    setFormState(prev => ({
      ...prev,
      mode: mode
    }));
    setIsOptionsVisible(false); // Close options after selection
  };

  const toggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const mapId = getGoogleMapsMapId();

  const apiKey = getGoogleMapsApiKey();
  const loader = new Loader({
    apiKey: apiKey,
    version: "weekly",
    libraries: ["maps", "marker", "core", "geometry"], // Include all needed libraries
  });

  const createCustomMarkerElement = (number) => {
    const element = document.createElement("div");
    element.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
        <circle cx="15" cy="15" r="14" fill="#FFD700" stroke="#FFFFFF" stroke-width="2"/>
        <text x="15" y="20" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#4285F4">${number}</text>
      </svg>
    `;
    return element;
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const loadMap = async () => {
      try {
        const { Map } = await loader.importLibrary("maps");
        const { AdvancedMarkerElement, PinElement } = await loader.importLibrary("marker");

        mapInstanceRef.current = new Map(mapContainerRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 14,
          mapId: mapId,
          disableDefaultUI: true,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "transit",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        setMapLoaded(true);
      } catch (error) {
        
        setMapError(true);
      }
    };

    loadMap();

    return () => {
      // Clear all markers
      markersRef.current.forEach(marker => {
        if (marker) {
          marker.map = null;
          if (marker.content && marker.content.parentNode) {
            marker.content.parentNode.removeChild(marker.content);
          }
        }
      });
      markersRef.current = [];

      // Remove all polylines
      const existingPolylines = document.querySelectorAll('.itinerary-polyline');
      existingPolylines.forEach(el => el.remove());

      // Clean up the map instance
      if (mapInstanceRef.current) {
        // Remove all event listeners
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        // Remove the map from DOM
        const mapContainer = mapContainerRef.current;
        if (mapContainer) {
          mapContainer.innerHTML = '';
        }
        mapInstanceRef.current = null;
      }

      // Reset state
      setMapLoaded(false);
      setMapError(false);
    };
  }, [mapId]);

  useEffect(() => {
    if (!mapLoaded || !places || places.length === 0 || !mapInstanceRef.current) return;

    const updateMarkers = async () => {
      try {
        const google = window.google;
        const { AdvancedMarkerElement } = await loader.importLibrary("marker");
        const { LatLngBounds } = await loader.importLibrary("core");

        // Clear existing markers and polylines
        markersRef.current.forEach(marker => marker.map = null);
        markersRef.current = [];

        // Remove existing polylines
        const existingPolylines = document.querySelectorAll('.itinerary-polyline');
        existingPolylines.forEach(el => el.remove());

        // Create new markers
        const newMarkers = places.map((place, index) => {
          if (!place.address?.latitude || !place.address?.longitude) {
            console.warn('Place missing coordinates:', place);
            return null;
          }

          return new AdvancedMarkerElement({
            position: {
              lat: place.address.latitude,
              lng: place.address.longitude
            },
            map: mapInstanceRef.current,
            title: `${index + 1}. ${place.title}`,
            content: createCustomMarkerElement(index + 1)
          });
        }).filter(Boolean);

        markersRef.current = newMarkers;

        // Draw connecting lines between markers
        if (newMarkers.length > 1) {
          const path = newMarkers.map(marker => marker.position);
          new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: "#4285F4",
            strokeOpacity: 1.0,
            strokeWeight: 3,
            map: mapInstanceRef.current,
            className: 'itinerary-polyline' // Add class for easier removal
          });
        }

        // Adjust map view
        if (newMarkers.length > 0) {
          const bounds = new LatLngBounds();
          newMarkers.forEach(marker => bounds.extend(marker.position));

          mapInstanceRef.current.fitBounds(bounds, {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
          });

          if (places.length === 1) {
            mapInstanceRef.current.setZoom(16);
          }
        }
      } catch (error) {
        
      }
    };

    updateMarkers();
  }, [places, mapLoaded]);

  return (
    <div className={styles.itenaryMapFrame}>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}
      />
      

      <div className={styles.itenaryMapOptions} onClick={toggleOptions}>
        <span className={`${styles.dots} ${isOptionsVisible ? styles.close : ''}`}></span>
        <div className={styles.itenaryMapOptionsSelectedListWrapper}>
          <div
              className={`${styles.itenaryMapOptionItem} ${formState.mode === 'driving' ? styles.car : formState.mode === 'walking' ? styles.walk : styles.bike} `}
              onClick={() => handleModeChange('driving')}
            ></div>
        </div>
        
        {isOptionsVisible ? (
           <div className={styles.itenaryMapOptionsListWrapper}>
           <div
             className={`${styles.itenaryMapOptionItem} ${styles.bike} `}
             onClick={() => handleModeChange('bicycling')}
           ></div>
           <div
             className={`${styles.itenaryMapOptionItem} ${styles.walk} `}
             onClick={() => handleModeChange('walking')}
           ></div>
           <div
             className={`${styles.itenaryMapOptionItem} ${styles.car} `}
             onClick={() => handleModeChange('driving')}
           ></div>
         </div>
        ) :
        <></>
         }
       

        {/* Render your map here with the selected mode */}
        {/* You can use formState.mode to determine routing options */}
      </div>

      {!mapLoaded && !mapError && (
        <img
          src={PlaceHolderImg1}
          alt="Placeholder"
          className={styles.placeholderImage}
          style={{
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        />
      )}

      {mapError && (
        <div className={styles.errorMessage}>
          Failed to load the map. Please try again later.
        </div>
      )}
    </div>
  );
};

export default ItineraryMap;