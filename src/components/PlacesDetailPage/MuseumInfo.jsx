import React, { useRef, useEffect } from "react";
import styles from "./MuseumInfo.module.css";
import ShareOptions from "../common/ShareOptions";
import { useSelector } from "react-redux";
import { MapIcon } from "../common/Images";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const MuseumInfo = ({ place, handleNavigateToWebsite, handleActions = () => { }, isFavoriteToggling = false, handleGenerateLink, showShareOptions, toggleShareOptions, handle }) => {

  const { shareableLink } = useSelector((state) => state.places);

  const { t } = useTranslation("DetailsPage");
  const { t: tPlaces } = useTranslation("Places");

  const shareOptionsRef = useRef(null);

  const location = useLocation();
  const currentUrl = window.location.href;

  const isPlacesDetailPage = location.pathname.includes("places/details");

  // Handle clicks outside the ShareOptions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareOptionsRef.current && !shareOptionsRef.current.contains(event.target)) {
        // Check if the click is not on the share icon
        const shareIcon = document.querySelector(`.${styles.webIcon}`);
        if (shareIcon && !shareIcon.contains(event.target)) {
          toggleShareOptions(false);
        }
      }
    };

    if (showShareOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareOptions, toggleShareOptions]);

  const handleTripClick = (e) => {
    e.stopPropagation();
    handleActions(e, 'addToTrip', place?.id, place?.display_text || place?.title);
};

  return (
    <div className={styles.museumInfo}>
      <div className={styles.museumInfoLeft}>
        <h1 className={styles.museumName}>{place?.title}</h1>
        <div className={styles.location}>
          <img
            src={MapIcon}
            alt="Location icon"
            className={styles.locationIcon}
          />
          <span className={styles.address}>
            {[
              place?.address?.street,
              place?.address?.cp,
              place?.city?.name,
              place?.city?.country?.name
            ].filter(item => item).join(', ')}
          </span>
        </div>
      </div>
      <div className={styles.museumInfoRight}>

        <div className={styles.contactInfo}>
          <div className={`${styles.favIcon} ${place?.is_fav ? styles.active : ''}`} onClick={(e) => handleActions(e, 'addToFavorites', place?.id)}></div>
          {isPlacesDetailPage &&
            <button
                  className={styles.addToTripButton}
                  onClick={handleTripClick}
              >
                  <span className={styles.addIcon}></span>
                  {tPlaces("placeCard.add_to_trip")}
            </button>
          }
          <div className={styles.shareIconWrapper} ref={shareOptionsRef}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/3ef4f075a0deb02b772bf1fe5266b0e789697ca3a6ba3ea75c950a14406974bf?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt="Web icon"
              className={styles.webIcon}
              onClick={() => handleGenerateLink()}
            />
            {showShareOptions && (currentUrl || shareableLink) && (
              <ShareOptions
                url={currentUrl || shareableLink}
                title={place?.title}
                description={place?.description}
                onClose={toggleShareOptions}
              />
            )}
          </div>

          <button className={styles.websiteButton}   onClick={() => place?.url && handleNavigateToWebsite(place)}
  disabled={!place?.url}>{t('header.websiteButton')}</button>
        </div>
        {place?.phone && (
          <p className={styles.phoneNumber}>
            {t('header.phone')}: {place.phone}
          </p>
        )}
      </div>
    </div>
  );
};

export default MuseumInfo;