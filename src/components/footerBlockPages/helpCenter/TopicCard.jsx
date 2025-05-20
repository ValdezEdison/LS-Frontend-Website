import React from "react";
import styles from "./TopicCard.module.css";

const TopicCard = ({ icon, title, isVector = false }) => {
  return (
    <div className={styles.topicCard}>
      {isVector ? (
        <div className={styles.topicIcon}>
          <div className={styles.vectorIcon} />
        </div>
      ) : icon.startsWith("URL_") ? (
        <img src={icon} className={styles.topicImage} alt={`${title} icon`} />
      ) : (
        <div className={styles[icon]} />
      )}
      <div className={styles.topicName}>{title}</div>
    </div>
  );
};

export default TopicCard;
