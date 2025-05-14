// src/components/popup/Location/LocationPermissionPopup.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LocationPermissionPopup.module.css';

const LocationPermissionPopup = ({ isOpen, onClose, onPermissionGranted }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleAllowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success handler
          onPermissionGranted({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          onClose();
        },
        (error) => {
          // Error handler
          console.error('Error getting location:', error);
          onClose();
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>{t('location.permissionTitle', 'Location Access')}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.content}>
          <div className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
            </svg>
          </div>
          <p>{t('location.permissionDescription', 'To show places near you, we need permission to access your location. This helps us find the best recommendations based on where you are.')}</p>
          <p className={styles.privacy}>{t('location.privacyNote', 'Your location data is only used to enhance your experience and is not stored or shared with third parties.')}</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            {t('common.cancel', 'Cancel')}
          </button>
          <button className={styles.allowButton} onClick={handleAllowLocation}>
            {t('location.allowAccess', 'Allow Access')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionPopup;
