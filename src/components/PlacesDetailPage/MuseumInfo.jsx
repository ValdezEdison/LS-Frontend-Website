import React from "react";
import styles from "./MuseumInfo.module.css";
import ShareOptions from "../common/ShareOptions";
import { useSelector } from "react-redux";
import { MapIcon } from "../common/Images";
import { useTranslation } from "react-i18next";

const MuseumInfo = ({ place, handleNavigateToWebsite, handleActions = () => { }, isFavoriteToggling = false, handleGenerateLink, showShareOptions, toggleShareOptions }) => {

  const { shareableLink } = useSelector((state) => state.places);

  const { t } = useTranslation("DetailsPage");

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
          <div className={`${styles.favIcon} ${place?.is_fav ? styles.active : ''}`} onClick={(e) => handleActions(e, place?.id)}></div>
          <div className={styles.shareIconWrapper}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/3ef4f075a0deb02b772bf1fe5266b0e789697ca3a6ba3ea75c950a14406974bf?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt="Web icon"
              className={styles.webIcon}
              onClick={() => handleGenerateLink()}
            />
            {/* {showShareOptions && (
              <ShareOptions
                url={shareableLink}
                title={place?.title}
                description={place?.description}
                onClose={toggleShareOptions}
              />
            )} */}
          </div>

          <button className={styles.websiteButton} onClick={() => handleNavigateToWebsite(place)}>{t('header.websiteButton')}</button>
        </div>
        <p className={styles.phoneNumber}>{t('header.phone')}: {place?.phone}</p>
      </div>
    </div>
  );
};

export default MuseumInfo;