import React from "react";
import styles from "./DestinationInfo.module.css";
import SubNavMenu from "../../common/SubNavMenu";
import { useTranslation } from "react-i18next";
import { PlaceHolderImg2 } from "../../common/Images";

const DestinationInfo = ({ destination, handleClickViewMoreDetails }) => {
  if (!destination) return null;

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

  const { t } = useTranslation("Common");

  return (
    <section className={styles.destinationInfo}>
      <div className="page-center">
        <h1 className={styles.title}>{name}, {country?.name}</h1>
        <SubNavMenu activeLink="destino" />
        
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
    <button className={styles.viewMoreButton} onClick={handleClickViewMoreDetails}>{t("showMore")}</button>
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>{slogan || "Discover this destination"}</h2>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.websiteButton}>
              {t("visitWebsite")}
            </a>
          )}
        </div>

        {/* <p className={styles.description}>{description}</p> */}
        <p 
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description?.replace(/\r\n/g, '<br />') }} 
        />

        <div className={styles.coordinates}>
      
        </div>
      </div>
    </section>
  );
};

export default DestinationInfo;
