import { store } from '../app/store';
import { updateLocation } from '../features/location/LocationAction.jsx';
import { setTrackingId, clearLocation } from '../features/location/LocationSlice.jsx';
import { setLanguage } from "../utils/Helper"; // Utility function to set language data
import i18n from '../i18n'; // Ensure i18n is used for language changes
import { languagesList } from '../constants/LanguagesList'; // List of supported languages

const LocationService = {
  startLocationTracking: async (intervalMinutes = 15) => {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported');
    }

    const intervalId = setInterval(async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
        });

        // Dispatch location update for other features
        store.dispatch(updateLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          location_mode: "current",
          city_id: null,
        }));

        // Dynamically set the language based on location
        const geolocationData = await fetch(`https://ipapi.co/json/`).then((res) => res.json());

        let detectedLanguageCode = navigator.language.split('-')[0]; // Use browser language first (e.g., 'fr' from 'fr-FR')
        const countryLanguageMap = {
          FR: 'fr', // Map country codes (e.g., France -> French)
          RU: 'en', // Russia -> English (fallback)
        };

        if (geolocationData?.country) {
          detectedLanguageCode = countryLanguageMap[geolocationData.country] || detectedLanguageCode;
        }

        const availableLanguage = languagesList.find((lang) => lang.code === detectedLanguageCode);
        const fallBackLanguage = languagesList.find((lang) => lang.code === 'en'); // Default fallback is English

        const selectedLanguage = availableLanguage || fallBackLanguage;

        // Set the detected or fallback language in localStorage and update app
        setLanguage(
          selectedLanguage.id,
          selectedLanguage.code,
          selectedLanguage.flag,
          selectedLanguage.name
        );
        i18n.changeLanguage(selectedLanguage.code); // Update i18n instance
      } catch (error) {
        console.error('Location tracking error:', error);
      }
    }, intervalMinutes * 60 * 1000);

    store.dispatch(setTrackingId(intervalId));
    return intervalId;
  },

  stopLocationTracking: (intervalId) => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  },
};

export default LocationService;