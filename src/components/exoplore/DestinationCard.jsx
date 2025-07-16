// src/components/exoplore/DestinationCard.jsx

import React from "react";
import styles from "./DestinationCard.module.css";
import { useTranslation } from "react-i18next";

// 1. Import the 'Link' component from React Router
import { Link } from "react-router-dom";

// 2. Change the component to accept the full 'destination' object as a prop
const DestinationCard = ({ destination }) => {
  const { t } = useTranslation("ExplorePage");

  // Safety check in case the destination object is not available yet
  if (!destination) {
    return null; // Or a loading skeleton
  }

  // 3. Destructure all needed properties from the destination object
  const { name, number_of_sites, images, absolute_url } = destination;

  // Use the first image as the card's image, with a fallback
  const cardImage = images?.[0]?.midsize || 'https://via.placeholder.com/300';

  return (
    // 4. Replace the onClick div with the Link component.
    // The 'to' prop is now connected to the absolute_url from your API.
    <Link to={absolute_url} className={styles.destinationCard}>
 
      <img
        src={cardImage}
        alt={`Vista de ${name}`}
        className={styles.destinationImage}
      />
      <div className={styles.destinationInfo}>
        <h3 className={styles.destinationName}>{name}</h3>
        <p className={styles.destinationResults}>
          {t('results', { count: number_of_sites })}
        </p>
      </div>
    </Link>
  );
};

export default DestinationCard;