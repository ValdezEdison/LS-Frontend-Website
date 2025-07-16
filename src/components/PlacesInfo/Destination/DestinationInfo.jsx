// src/components/PlacesInfo/Destination/DestinationInfo.jsx
import React from "react";
import styles from "./DestinationInfo.module.css";
import SubNavMenu from "../../common/SubNavMenu";
import { useTranslation } from "react-i18next";
import { PlaceHolderImg2 } from "../../common/Images";

const DestinationInfo = ({ destination, handleClickViewMoreDetails }) => {
  const { t } = useTranslation("Common");
  
  // Safety check
  if (!destination) {
    console.error("DestinationInfo received null or undefined destination");
    return <div>No destination data available</div>;
  }
  
  // Log what we received
  console.log("DestinationInfo received:", destination);
  
  const {
    name,
    country,
    images,
    description,
    slogan,
    link,
    latitude,
    longitude,
    activated,
    media
  } = destination;
  
  return (
    <section className={styles.destinationInfo}>
      <h1 className={styles.title}>
        {name}, {country?.code}
      </h1>
      
      {/* Add error boundary around SubNavMenu */}
      <div className="subNavContainer">
        <SubNavMenu activeLink="destino" />
      </div>
      
      {/* Rest of the component */}
      {images?.length > 0 && (
        <div className={styles.imageGallery}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img.original || PlaceHolderImg2}
              alt={`Image ${index + 1} of ${name}`}
              className={styles.galleryImage}
            />
          ))}
        </div>
      )}
      
      <button className={styles.viewMoreButton} onClick={handleClickViewMoreDetails}>
        {t("showMore")}
      </button>
      
      <div className={styles.infoSection}>
        <h2 className={styles.infoTitle}>{slogan || "Discover this destination"}</h2>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className={styles.websiteButton}>
            {t("visitWebsite")}
          </a>
        )}
      </div>
      
      <p
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: description?.replace(/\n/g, '<br />')
        }}
      />
      
      <div className={styles.coordinates}></div>
    </section>
  );
};

export default DestinationInfo;