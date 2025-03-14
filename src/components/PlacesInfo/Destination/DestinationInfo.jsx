import React from "react";
import styles from "./DestinationInfo.module.css";
import SubNavMenu from "../../common/SubNavMenu";

const DestinationInfo = ({ destination }) => {
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
  } = destination;

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
                src={img.midsize || img.original}
                alt={`Image ${index + 1} of ${name}`}
                className={styles.galleryImage}
              />
            ))}
          </div>
        )}
    <button className={styles.viewMoreButton}>Ver más</button>
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>{slogan || "Discover this destination"}</h2>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.websiteButton}>
              Visit Website
            </a>
          )}
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.coordinates}>
          <p>
            <strong>Location:</strong> {latitude}, {longitude}
          </p>
          {/* <p>
            <strong>Status:</strong> {activated ? "Active" : "Inactive"}
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default DestinationInfo;
