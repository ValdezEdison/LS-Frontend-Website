import React from "react";
import styles from "./MuseumInfo.module.css";

const MuseumInfo = ({ place, handleNavigateToWebsite }) => {
 
  return (
    <div className={styles.museumInfo}>
      <div className={styles.museumInfoLeft}>
        <h1 className={styles.museumName}>{place?.title}</h1>
        <div className={styles.location}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/76d52ff2de34200eee33b27954820431397650bbcc422e761da492eb05ba93ac?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Location icon"
            className={styles.locationIcon}
          />
          <span className={styles.address}>
            {place?.address.street}, {place?.address.cp}, {place?.city.name}, {place?.city.country.name}
          </span>
        </div>
      </div>
      <div className={styles.museumInfoRight}>
        <div className={styles.contactInfo}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/3ef4f075a0deb02b772bf1fe5266b0e789697ca3a6ba3ea75c950a14406974bf?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Web icon"
            className={styles.webIcon}
          />
          <button className={styles.websiteButton} onClick={() => handleNavigateToWebsite(place)}>Ir a la web</button>
        </div>
        <p className={styles.phoneNumber}>Teléfono: {place?.phone}</p>
      </div>
    </div>
  );
};

export default MuseumInfo;